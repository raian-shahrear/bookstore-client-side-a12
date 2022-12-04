import React from "react";
import { useNavigate } from "react-router-dom";

const HomeAdvertisement = ({ books }) => {
  const navigate = useNavigate();
  const handleDetails = (singleBook, id) => {
    navigate(`/books-details/${id}`, { state: singleBook });
  };
  return (
    <section>
      <div>
        <h2 className="text-4xl font-bold text-accent dark:text-info text-center mb-8">
          Top Collections
        </h2>
        <div className={`relative w-full flex gap-6 py-6 overflow-x-auto`}>
          {books?.map(
            (book) =>
              !book?.isSold && (
                <img
                  onClick={() => handleDetails(book, book?._id)}
                  key={book?._id}
                  title={`click to view details`}
                  className="h-48 w-full aspect-video rounded-md object-cover object-center bg-gray-500 transition-all duration-300 hover:opacity-70 cursor-pointer"
                  src={book?.bookCoverPhoto}
                  alt="product-img"
                />
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeAdvertisement;
