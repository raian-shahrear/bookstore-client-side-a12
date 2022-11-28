import React from "react";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import {useNavigate} from 'react-router-dom'


const DisplayBooks = ({ book }) => {
  const {bookCoverPhoto, bookName, writerName, originalPrice, resalePrice, bookCondition, sellerName, sellerLocation, dateOfPost, monthOfUse} = book;

  const navigate = useNavigate();
  const handleDetails = (singleBook) => {
    navigate(`/books-details/${singleBook._id}`, { state: singleBook })
  }
  return (
    <div>
      <div className="card w-full h-full bg-gray-100 dark:bg-gray-800 shadow-md">
        <figure>
          <img src={bookCoverPhoto} alt="book-cover" className="h-96 w-full" />
        </figure>
        <div className="card-body">
          <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-base-100"><FaRegClock/> {dateOfPost}</p>
          <h3 className="card-title text-accent dark:text-gray-300">{bookName}</h3>
          <p className="text-sm text-gray-900 dark:text-base-100 -mt-2 font-medium">{writerName}</p>
          <p className="text-sm text-gray-900 dark:text-base-100">Owned by,</p>
          <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-base-100 -mt-2 font-medium"><FaCheckCircle className="text-primary dark:text-info"/> {sellerName} | {sellerLocation}</p>
          <div className="flex items-center justify-between flex-wrap">
          <p className="flex flex-col text-sm text-gray-900 dark:text-base-100 font-medium"><span>Month of used: {monthOfUse}</span> <span>Book's condition: {bookCondition} </span></p>
          <button onClick={() => handleDetails(book)}>
          <MdOutlineMenuBook title="See details" className="text-3xl text-gray-900 dark:text-base-100 transition-all duration-300 hover:text-primary dark:hover:text-info"/>
          </button>
          </div>
          <p className="text-sm text-gray-900 dark:text-base-100"></p>
          <p className="text-xl font-medium text-gray-900 dark:text-base-100">Price: <span className="font-bold text-primary dark:text-info">{resalePrice}</span> <span className="text-base line-through">{originalPrice}</span></p>
          <div className="card-actions justify-between mt-4">
            <button className="btn btn-sm btn-primary text-base-100">Add to order</button>
            <button className="btn btn-sm btn-secondary text-base-100">Report to admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBooks;
