import React, { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import ConfirmationModal from "../../../Components/Modal/ConfirmationModal";
import { toast } from "react-toastify";

const MyProducts = () => {
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // close delete modal
  const closeModal = () => {
    setConfirmDelete(null);
  };

  // get books by email
  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/books/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // delete book by id
  const handleBookDelete = (eachBook) => {
    fetch(`${process.env.REACT_APP_HOST_LINK}/books/${eachBook?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedData) => {
        if (deletedData.acknowledged) {
          toast.success(
            `Your book, ${eachBook?.bookName} has been removed successfully`
          );
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <section className="bg-base-100 dark:bg-gray-900">
      {!isLoading && (
        <div className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
          <div className="lg:w-1/2 mx-auto">
            <h2 className="text-4xl font-bold text-accent dark:text-info text-center lg:mt-10 mb-10 pb-3 border-b">
              My Products
            </h2>
          </div>
          <div className="mt-4">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-accent uppercase bg-gray-200 dark:text-gray-200 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3 px-2 w-10"></th>
                    <th scope="col" className="py-3 px-2 w-40">
                      Book's Name
                    </th>
                    <th scope="col" className="py-3 px-2 w-40 hidden lg:block">
                      Book's Category
                    </th>
                    <th scope="col" className="py-3 px-2 w-36">
                      Resale Price
                    </th>
                    <th scope="col" className="py-3 px-2 w-36">
                      Sell Status
                    </th>
                    <th scope="col" className="py-3 px-2 text-center w-1/4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book._id}
                      className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b"
                    >
                      <th
                        scope="row"
                        className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                      >
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img src={book?.bookCoverPhoto} alt="book-cover" />
                          </div>
                        </div>
                      </th>
                      <td className="p-2">{book?.bookName}</td>
                      <td className="p-2 hidden lg:block">
                        {book?.bookCategory}
                      </td>
                      <td className="p-2">{book?.resalePrice}</td>
                      <td className="p-2">
                        <div
                          className={`badge badge-outline ${
                            book?.sellStatus
                              ? "border-success text-success"
                              : "border-accent text-accent dark:border-base-100 dark:text-base-100"
                          }`}
                        >
                          {book?.sellStatus ? "Sold" : "available"}
                        </div>
                      </td>
                      <td className="p-2 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                        <button
                          className="btn btn-info btn-xs text-base-100 lg:btn-sm transition-all duration-300 hover:bg-primary hover:border-transparent disabled:bg-gray-200 disabled:text-gray-500"
                          disabled={book?.sellStatus && true}
                        >
                          Advertise
                        </button>
                        <label
                          onClick={() => setConfirmDelete(book)}
                          htmlFor="confirmation-modal"
                          className="btn btn-error btn-xs text-base-100 lg:btn-sm transition-all duration-300 hover:bg-red-700 hover:border-transparent"
                        >
                          Delete
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {confirmDelete && (
        <ConfirmationModal
          title={`Are you want to delete "${confirmDelete?.bookName}"?`}
          message={`If you will remove the book, it can't be Undo!`}
          closeModal={closeModal}
          successData={confirmDelete}
          successAction={handleBookDelete}
        />
      )}
    </section>
  );
};

export default MyProducts;
