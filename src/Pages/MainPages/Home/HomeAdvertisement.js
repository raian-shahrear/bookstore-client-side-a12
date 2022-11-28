import React from "react";
import { useNavigate } from "react-router-dom";

const HomeAdvertisement = ({ books }) => {

  const navigate = useNavigate();
  const handleDetails = (singleBook) => {
    navigate(`/books-details/${singleBook._id}`, { state: singleBook })
  }
  return (
    <div>
      <h2 className="text-4xl font-bold text-accent dark:text-info text-center mb-8">
        Top Collections
      </h2>
      <div
        className={`relative w-full flex gap-6 py-6 overflow-x-auto ${
          books.length < 4 && "justify-center"}`}
      >
        {books?.map((book) => (
          <>
            <button>
              <img
              onClick={() => handleDetails(book)}
                key={book?._id}
                title={`click to view details`}
                className="h-48 aspect-video rounded-md object-cover object-center bg-gray-500 transition-all duration-300 hover:opacity-70"
                src={book?.bookCoverPhoto}
                alt="product-img"
              />
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default HomeAdvertisement;
