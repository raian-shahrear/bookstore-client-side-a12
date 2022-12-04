import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Components/Modal/ConfirmationModal";
import AddProductModal from "./AddProductModal";
import { toast } from "react-toastify";
import useTitle from "../../../Hooks/useTitle";


const BookDetails = () => {
  useTitle('Book Details');
  const { state: singleBook } = useLocation();
  const [addBook, setAddBook] = useState(null);
  const [confirmReport, setConfirmReport] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setConfirmReport(null);
  }

  const {
    bookName,
    writerName,
    bookCoverPhoto,
    originalPrice,
    resalePrice,
    bookCondition,
    bookCategory,
    sellerName,
    sellerPhone,
    sellerEmail,
    sellerLocation,
    dateOfPost,
    monthOfUse,
    description,
  } = singleBook;


  const handleReportProduct = (eachBook) => {
    const reported = {
      isReported: true
    }
    fetch(`${process.env.REACT_APP_HOST_LINK}/books-isReported/${eachBook?._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(reported),
    })
    .then(res => res.json())
    .then(reportData => {
      if(reportData.acknowledged){
        toast.success(`Your report for "${eachBook?.bookName}", has been accepted `);
        navigate('/');
      }
      
    })
    .catch(err => console.error(err))
  }
  return (
    <div>
      <div className="overflow-hidden bg-base-100 dark:bg-gray-900 py-10">
        <div className="px-4 md:px-24 lg:px-0 py-10 lg:py-0 mx-auto md:max-w-full lg:max-w-screen-2xl">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
            <div className="w-full text-center lg:text-start mb-12 lg:pl-16 lg:mb-0 lg:w-7/12">
              <h2 className="text-3xl sm:leading-none font-medium tracking-tight text-accent dark:text-info">
                {bookName}
              </h2>
              <p className="mb-4 mt-1 text-accent dark:text-base-100 border-b pb-3 dark:border-gray-700">
                by <span className="font-medium">{writerName}</span>
              </p>
              <div className="mb-4">
                <p className="text-2xl text-gray-900 dark:text-base-100">
                  Price:{" "}
                  <span className="font-bold text-primary dark:text-info">
                    ${resalePrice}
                  </span>{" "}
                  <span className="text-base line-through ml-1">
                    ${originalPrice}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-accent dark:text-base-100">
                  Genre: <span className="font-medium">{bookCategory}</span>
                </p>
                <p className="text-accent dark:text-base-100">
                  Month of use:{" "}
                  <span className="font-medium">{monthOfUse} months</span>
                </p>
                <p className="text-accent dark:text-base-100">
                  Condition:{" "}
                  <span className="font-medium">{bookCondition}</span>
                </p>
                <p className="text-accent dark:text-base-100">
                  Date of Post:{" "}
                  <span className="font-medium">{dateOfPost}</span>
                </p>
              </div>
              <div className="mt-4 text-sm">
                <p className="text-accent dark:text-base-100">
                  Seller Name:{" "}
                  <span className="font-medium mr-2">{sellerName}</span> |{" "}
                  <span className="font-medium ml-2">{sellerLocation}</span>
                </p>
                <p className="text-accent dark:text-base-100">
                  Seller contact:{" "}
                  <span className="font-medium mr-2">{sellerPhone}</span> |{" "}
                  <span className="font-medium ml-2">{sellerEmail}</span>
                </p>
              </div>
              <p className="mt-8 text-accent dark:text-base-100 border-t pt-3 dark:border-gray-700">
                {description}
              </p>
              <div className="card-actions justify-center lg:justify-start mt-10 gap-5">
                <label
                  onClick={() => setAddBook(singleBook)}
                  htmlFor="addProduct-modal"
                  className="btn btn-sm btn-primary text-base-100"
                >
                  Add to order
                </label>
                <label
                  onClick={() => setConfirmReport(singleBook)}
                  htmlFor="confirmation-modal"
                  className="btn btn-sm btn-secondary text-base-100"
                >
                  Report to admin
                </label>
              </div>
            </div>
            <div className="w-full lg::px-8 sm:w-8/12 lg:w-6/12">
              <div>
                <div className="relative bg-transparent p-7 sm:p-10">
                  <img src={bookCoverPhoto} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addBook && <AddProductModal book={addBook} setAddBook={setAddBook} />}
      {confirmReport && (
        <ConfirmationModal
          title={`Are you want to Report for "${confirmReport?.bookName}"?`}
          message={`If you will report the book, it can't be Undo!`}
          closeModal={closeModal}
          successData={confirmReport}
          successAction={handleReportProduct}
          successClass={`btn btn-sm btn-secondary text-base-100`}
        />
      )}
    </div>
  );
};

export default BookDetails;
