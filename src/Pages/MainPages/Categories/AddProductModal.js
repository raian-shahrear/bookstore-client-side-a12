import { format } from "date-fns";
import React, { useContext, useState } from "react";
import ButtonPrimary from "../../../Components/Button/ButtonPrimary";
import SmallSpinner from "../../../Components/Spinners/SmallSpinner";
import { UserContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";


const AddProductModal = ({book, setAddBook, refetch}) => {
  const {user} = useContext(UserContext);
  const [uploading, setUploading] = useState(false);

  const date = new Date();
  const orderDate = format(date, "PP");
  const orderInMilliseconds = format(date, "T");

  const handleOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;

    const ordered = {
      bookName: book?.bookName,
      bookId: book?._id,
      bookPrice: book?.resalePrice,
      orderDate,
      orderMs: orderInMilliseconds,
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
      buyerLocation: location
    };
    setUploading(true);
    fetch(`${process.env.REACT_APP_HOST_LINK}/orders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(ordered),
    })
    .then(res => res.json())
    .then(orderData => {
      if(orderData.acknowledged){
        setAddBook(null);
        toast.success("Your order has been successfully added!");
        setUploading(false);
        refetch();
      }
    })
  }
  
  return (
    <div>
      <input type="checkbox" id="addProduct-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-base-100 dark:bg-gray-900 text-accent dark:text-gray-100">
          <label
            htmlFor="addProduct-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="mt-6">
            <h3  className="text-xl font-semibold">{book?.bookName}</h3>
            <p className="text-sm">by <span className="font-medium">{book?.writerName}</span></p>
            <p className="text-xl font-medium mt-2 text-primary dark:text-info">{book?.resalePrice}</p>
          </div>
          <form onSubmit={handleOrder} className="flex flex-col gap-6 mt-12">
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              readOnly
              placeholder="Full Name"
              className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Email"
              className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
            />
            <input
              type="text"
              name="phone"
              required
              placeholder="Phone Number *"
              className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
            />
            <input
              type="text"
              name="location"
              required
              placeholder="Meeting Location *"
              className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
            />
            <ButtonPrimary type={`submit`} cls={`w-full`}>
            {uploading && <SmallSpinner />} Submit Order
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
