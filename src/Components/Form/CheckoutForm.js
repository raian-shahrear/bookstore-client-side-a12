import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";


const CheckoutForm = ({order}) => {
  const {_id, buyerName, buyerEmail, buyerPhone, bookName, bookPrice, orderDate} = order;
  const [paymentError, setPaymentError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_LINK}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ bookPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [bookPrice]);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setPaymentError(error.message);
      // console.error('[error]', error);
    } else {
      setPaymentError("");
      // console.log('[PaymentMethod]', paymentMethod);
    }

    setSuccessMessage("");
    setPaymentError("");

    // confirm payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail
          },
        },
      },
    );
    if (confirmError) {
      setPaymentError(confirmError.message);
      console.error(confirmError)
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info to database
      const payment = {
        bookName,
        orderedId: _id,
        bookPrice,
        buyerName,
        buyerEmail,
        transactionId: paymentIntent.id
      };
      fetch(`${process.env.REACT_APP_HOST_LINK}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccessMessage("Congrats! your payment is successful.");
            setTransactionID(paymentIntent.id);
            navigate('/dashboard/my-orders');
            toast.success("Congrats! your payment is successful.")
          }
        });
    }
    
  }
   
  return (
    <div className="mt-10 w-96">
      {paymentError && (
        <p className="text-red-500 text-center">Error: {paymentError}</p>
      )}
      {successMessage && (
        <div>
          <p className="text-green-500 text-center">{successMessage}</p>
          <p className="text-center">
            Transaction Id: <span className="font-bold">{transactionID}</span>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className="btn btn-sm text-base-100 mt-4">
        Pay
      </button>
    </form>
    </div>
  );
};

export default CheckoutForm;