import React, { useContext, useState } from "react";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Components/Modal/ConfirmationModal";
import { toast } from "react-toastify";
import { UserContext } from "../../../Contexts/AuthContext";


const DisplayBooks = ({ book, setAddBook, refetch }) => {
  const [confirmReport, setConfirmReport] = useState(null);
  const {user} = useContext(UserContext);

  // close delete modal
  const closeModal = () => {
    setConfirmReport(null);
  };

  const {
    _id,
    bookCoverPhoto,
    bookName,
    writerName,
    originalPrice,
    resalePrice,
    bookCondition,
    sellerName,
    sellerLocation,
    dateOfPost,
    monthOfUse,
    isVerified
  } = book;

  const navigate = useNavigate();
  const handleDetails = (singleBook, bookId) => {
    navigate(`/books-details/${bookId}`, { state: singleBook });
  };

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
        refetch()
        navigate('/')
      }
      
    })
    .catch(err => console.error(err))
  }

  return (
    <div>
      <div className="card w-full h-full bg-gray-100 dark:bg-gray-800 shadow-md">
        <figure>
          <img src={bookCoverPhoto} alt="book-cover" className="h-96 w-full" />
        </figure>
        <div className="card-body">
          <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-base-100">
            <FaRegClock /> {dateOfPost}
          </p>
          <h3 className="card-title text-accent dark:text-gray-300">
            {bookName}
          </h3>
          <p className="text-sm text-gray-900 dark:text-base-100 -mt-2">
            by <span className="font-medium">{writerName}</span>
          </p>
          <p className="text-sm text-gray-900 dark:text-base-100">Added by{isVerified &&  <span> a <span className="font-medium text-primary dark:text-info">verified seller</span></span> },</p>
          <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-base-100 -mt-2 font-medium">
            {isVerified && <FaCheckCircle className="text-primary dark:text-info" />}
            {sellerName} | {sellerLocation}
          </p>
          <div className="flex items-center justify-between flex-wrap">
            <p className="flex flex-col text-sm text-gray-900 dark:text-base-100 font-medium">
              <span>Month of used: {monthOfUse}</span>{" "}
              <span>Book's condition: {bookCondition} </span>
            </p>
            <button onClick={() => handleDetails(book, _id)}>
              <MdOutlineMenuBook
                title="See details"
                className="text-3xl text-gray-900 dark:text-base-100 transition-all duration-300 hover:text-primary dark:hover:text-info"
              />
            </button>
          </div>
          <p className="text-sm text-gray-900 dark:text-base-100"></p>
          <p className="text-xl font-medium text-gray-900 dark:text-base-100">
            Price:{" "}
            <span className="font-bold text-primary dark:text-info">
              ${resalePrice}
            </span>{" "}
            <span className="text-base line-through">${originalPrice}</span>
          </p>
          <div className="card-actions justify-between mt-4">
            <label
              onClick={() => setAddBook(book)}
              htmlFor="addProduct-modal"
              className="btn btn-sm btn-primary text-base-100"
            >
              Add to order
            </label>
            <label
              onClick={() => setConfirmReport(book)}
              htmlFor="confirmation-modal"
              className="btn btn-sm btn-secondary text-base-100"
            >
              Report to admin
            </label>
          </div>
        </div>
      </div>
      {confirmReport && (
        <ConfirmationModal
          title={`Are you want to Report for "${confirmReport?.bookName}"?`}
          message={user?.uid ? `If you will report the book, it can't be Undo!` : <span className="text-red-500">Please login to apply this action</span>}
          closeModal={closeModal}
          successData={confirmReport}
          successAction={handleReportProduct}
          successClass={`btn btn-sm btn-secondary text-base-100`}
          btnDisable={!user?.uid && true}
        />
      )}
    </div>
  );
};

export default DisplayBooks;
