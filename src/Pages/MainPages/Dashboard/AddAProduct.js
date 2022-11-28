import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../../Components/Button/ButtonPrimary";
import { UserContext } from "../../../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import SmallSpinner from "../../../Components/Spinners/SmallSpinner";
import {useNavigate} from 'react-router-dom';


const AddAProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_LINK}/categories`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, []);

  const date = new Date();
  const dateOfPost = format(date, "PP");
  const postInMilliseconds = format(date, "T");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const sellerName = form.name.value;
    const sellerPhone = form.phone.value;
    const sellerLocation = form.location.value;
    const bookName = form.bookName.value;
    const writerName = form.writerName.value;

    const category = form.category.value;
    const bookCategory = category.split("-")[0];
    const categoryId = category.split("-")[1];

    const bookCover = form.bookPhoto.files[0];
    const bookCondition = form.condition.value;
    const dateOfPurchase = form.datePurchase.value;
    const monthOfUse = form.monthUse.value;
    const originalPrice = form.originalPrice.value;
    const resalePrice = form.resalePrice.value;
    const description = form.description.value;

    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;
    const formData = new FormData();
    formData.append("image", bookCover);
    setUploading(true);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          const newProduct = {
            sellerName,
            sellerPhone,
            sellerEmail: user?.email,
            sellerLocation,
            bookName,
            writerName,
            bookCategory,
            categoryId,
            bookCoverPhoto: imgData?.data?.url,
            bookCondition,
            dateOfPurchase,
            monthOfUse,
            dateOfPost,
            postInMs: postInMilliseconds,
            originalPrice,
            resalePrice,
            description,
          };

          fetch(`${process.env.REACT_APP_HOST_LINK}/books`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          })
            .then((res) => res.json())
            .then((bookData) => {
              if (bookData.acknowledged) {
                toast.success("Book added successfully!");
                form.reset();
                setUploading(false);
                navigate('/dashboard/my-product');
              }
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section>
      <div className="lg:w-1/2 mx-auto">
        <h2 className="text-4xl font-bold text-accent dark:text-info text-center lg:mt-10 mb-10 pb-3 border-b dark:border-gray-700">
          Add Your Book
        </h2>
      </div>
      <div className="p-6 bg-gray-200 dark:bg-gray-800 text-accent dark:text-gray-100 w-11/12 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md bg-base-100 dark:bg-gray-900">
            <div className="grid grid-cols-8 gap-4 col-span-full lg:col-span-4">
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="name" className="font-medium">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  readOnly
                  required
                  placeholder="your full name"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="phone" className="font-medium">
                  Your contact number
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  required
                  placeholder="your phone number"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="location" className="font-medium">
                  Your location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  required
                  placeholder="city, country"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="book-name" className="font-medium">
                  Book's name
                </label>
                <input
                  id="book-name"
                  type="text"
                  name="bookName"
                  required
                  placeholder="your book's name"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-4 col-span-full lg:col-span-4">
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="writer-name" className="font-medium">
                  Book's writer name
                </label>
                <input
                  id="writer-name"
                  type="text"
                  name="writerName"
                  required
                  placeholder="book's writer name"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="category" className="font-medium">
                  Book's category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                >
                  {categories?.map((category) => (
                    <option key={category?._id} value={`${category?.categoryName}-${category._id}`}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="book-photo" className="font-medium">
                  Book's cover photo
                </label>
                <input
                  id="book-photo"
                  type="file"
                  name="bookPhoto"
                  required
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="condition" className="font-medium">
                  Set book's condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-4 col-span-full lg:col-span-4">
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="date-purchase" className="font-medium">
                  Date of purchase
                </label>
                <input
                  id="date-purchase"
                  type="date"
                  name="datePurchase"
                  required
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="month-use" className="font-medium">
                  Month of use
                </label>
                <input
                  id="month-use"
                  type="number"
                  name="monthUse"
                  required
                  placeholder="month of use in number"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="original-price" className="font-medium">
                  Original Price
                </label>
                <input
                  id="original-price"
                  type="text"
                  name="originalPrice"
                  defaultValue="$"
                  required
                  placeholder="product's original price"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="resale-price" className="font-medium">
                  Resale price
                </label>
                <input
                  id="resale-price"
                  type="text"
                  name="resalePrice"
                  defaultValue="$"
                  required
                  placeholder="product's resale price"
                  className="w-full px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                type="text"
                required
                placeholder="product description..."
                className="w-full h-28 px-2 py-2 bg-gray-200 dark:bg-gray-800 rounded-md focus:ring focus:ring-transparent text-accent dark:text-gray-200 placeholder:text-sm"
              />
            </div>
            <ButtonPrimary type={`submit`}>
            {uploading && <SmallSpinner />} Add Product
            </ButtonPrimary>
            
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default AddAProduct;
