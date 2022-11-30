import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import DisplayBooks from "./DisplayBooks";
import AddProductModal from "./AddProductModal";
import { UserContext } from "../../../Contexts/AuthContext";
import useTitle from "../../../Hooks/useTitle";

const AllCategories = () => {
  useTitle('Our Library');
  const { user } = useContext(UserContext);
  const [addBook, setAddBook] = useState(null);

  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_HOST_LINK}/books`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <section className="bg-base-100 dark:bg-gray-900">
      <div className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl py-20">
        <div className="lg:w-1/2 mx-auto">
          <h2 className="text-4xl font-bold text-accent dark:text-info text-center lg:mt-10 mb-10 pb-3 border-b">
            Our Library
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {!user?.uid ? (
            <h2 className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center text-gray-900 dark:text-gray-200">
              Please login to see the Book Library
            </h2>
          ) : (
            books?.map((book) => (
              !book?.isSold &&
              <DisplayBooks
                key={book?._id}
                book={book}
                setAddBook={setAddBook}
                refetch={refetch}
              />
            ))
          )}
        </div>
      </div>

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

export default AllCategories;
