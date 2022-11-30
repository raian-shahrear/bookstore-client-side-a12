import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import paymentImg from "../../../Assets/payment/stripe_payments.svg";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../Components/Form/CheckoutForm";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import useTitle from "../../../Hooks/useTitle";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
  useTitle('Payment');
  const order = useLoaderData();
  const { bookName, bookPrice, orderDate } = order;
  const navigation = useNavigation();
  if(navigation.state === "loading"){
    return <PrimarySpinner />
  }
  return (
    <section>
      <div>
        <div className="overflow-hidden h-full mt-10 pb-10 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-24 lg:px-0 py-10 lg:py-0 mx-auto md:max-w-full lg:max-w-screen-2xl">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
              <div className="w-full text-center lg:text-start mb-12 lg:pl-16 lg:mb-0 lg:w-7/12">
                <h2 className="mb-6 text-3xl sm:text-5xl sm:leading-none lg:text-5xl font-bold tracking-tight text-primary dark:text-info">
                  Welcome to <br className="hidden md:block" />
                  payment procedure
                </h2>
                <p className="mb-4 font-medium text-base text-accent md:text-lg dark:text-base-100">
                  We offers one of the famous payment gateway which is{" "}
                  <span className="text-indigo-400">Strip</span>.{" "}
                  <br className="hidden lg:block" />
                  Anyone can pay from anywhere through International Card <br />
                </p>
                <div className="mt-10 text-accent dark:text-base-100">
                  <h3 className="text-2xl font-semibold">
                    Your order book is {bookName}
                  </h3>
                  <p className="mt-2">
                    Please pay{" "}
                    <span className="font-bold text-lg">${bookPrice}</span> for
                    your order which has been placed on {orderDate}
                  </p>
                  <div>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm order={order} />
                    </Elements>
                  </div>
                </div>
              </div>
              <div className="w-full lg::px-8 sm:w-8/12 lg:w-6/12">
                <div className="relative bg-transparent p-7 sm:p-10">
                  <img src={paymentImg} alt="strip-img" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
