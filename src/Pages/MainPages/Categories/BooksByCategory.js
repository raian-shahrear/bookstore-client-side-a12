import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import AddProductModal from "./AddProductModal";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import DisplayBooks from "./DisplayBooks";

const BooksByCategory = () => {
  const { state: category } = useLocation();
  const [addBook, setAddBook] = useState(null);

  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", category?._id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/books?id=${category?._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <section className="bg-base-100 dark:bg-gray-900">
      {!isLoading && (
        <div className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl py-20">
          <div className="lg:w-1/2 mx-auto">
            <h2 className="text-4xl font-bold text-accent dark:text-info text-center lg:mt-10 mb-10 pb-3 border-b">
              {category?.categoryName}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {books?.map((book) => (
              <DisplayBooks
                key={book?._id}
                book={book}
                setAddBook={setAddBook}
              />
            ))}
          </div>
        </div>
      )}
      {addBook && (
        <AddProductModal
          book={addBook}
          setAddBook={setAddBook}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default BooksByCategory;
