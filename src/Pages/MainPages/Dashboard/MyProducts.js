import React, { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import ConfirmationModal from "../../../Components/Modal/ConfirmationModal";
import { toast } from "react-toastify";
import useTitle from "../../../Hooks/useTitle";

const MyProducts = () => {
  useTitle('My Products');
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmAdvertise, setConfirmAdvertise] = useState(null);

  // close delete modal
  const closeModal = () => {
    setConfirmDelete(null);
    setConfirmAdvertise(null);
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
        `${process.env.REACT_APP_HOST_LINK}/books/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // delete book by id
  const handleBookDelete = (eachBook) => {
    fetch(`${process.env.REACT_APP_HOST_LINK}/books/${eachBook?._id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
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

  // update Advertisement status
  const handleBookAdvertisement = (singleBook) => {
    const updateBook = {
      isAdvertised: true,
    };
    fetch(
      `${process.env.REACT_APP_HOST_LINK}/books-isAdvertised/${singleBook?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(updateBook),
      }
    )
      .then((res) => res.json())
      .then((updateData) => {
        if (updateData.acknowledged) {
          toast.success(
            `Your book, "${singleBook?.bookName}" has been advertised successfully! Please check the Advertisement section of Home page to see the update.`
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
      <div className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
        <div className="lg:w-1/2 mx-auto">
          <h2 className="text-4xl font-bold text-accent dark:text-info text-center lg:mt-10 mb-10 pb-3 border-b dark:border-gray-700">
            My Products
          </h2>
        </div>
        {books?.length === 0 ? (
          <h2 className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center text-gray-900 dark:text-gray-200">
            No Product is added yet
          </h2>
        ) : (
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
                {books?.map((book) => (
                  <tr
                    key={book?._id}
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
                    <td className="p-2">${book?.resalePrice}</td>
                    <td className="p-2">
                      <div
                        className={`badge badge-outline ${
                          book?.isSold
                            ? "border-secondary text-secondary"
                            : "border text-accent dark:border-base-100 dark:text-base-100"
                        }`}
                      >
                        {book?.isSold ? "Sold" : "Available"}
                      </div>
                    </td>
                    <td className="p-2 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                      {book?.isAdvertised || book?.isSold ? (
                        <label className="badge badge-outline rounded-lg font-medium uppercase border-success text-success lg:py-3.5 lg:px-3">
                          {book?.isSold ? "N/A" : "Advertised"}
                        </label>
                      ) : (
                        <label
                          onClick={() => setConfirmAdvertise(book)}
                          htmlFor="confirmation-modal"
                          className="btn btn-info btn-xs text-base-100 lg:btn-sm transition-all duration-300 hover:bg-primary hover:border-transparent disabled:bg-gray-200 disabled:text-gray-500"
                        >
                          Advertise
                        </label>
                      )}
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
        )}
      </div>

      {confirmDelete && (
        <ConfirmationModal
          title={`Are you want to delete "${confirmDelete?.bookName}"?`}
          message={`If you will remove the book, it can't be Undo!`}
          closeModal={closeModal}
          successData={confirmDelete}
          successAction={handleBookDelete}
          successClass={`btn btn-sm bg-red-500 text-base-100 transition-all duration-300 hover:bg-red-700 border-transparent hover:border-transparent mr-6`}
        />
      )}
      {confirmAdvertise && (
        <ConfirmationModal
          title={`Are you want to advertise your book?`}
          message={
            <>
              <p className="font-medium">{`Book: ${confirmAdvertise?.bookName}`}</p>
              <p className="text-sm ml-3">{`by ${confirmAdvertise?.writerName}`}</p>
            </>
          }
          closeModal={closeModal}
          successData={confirmAdvertise}
          successAction={handleBookAdvertisement}
          successClass={`btn btn-sm bg-green-500 text-base-100 transition-all duration-300 hover:bg-green-700 border-transparent hover:border-transparent mr-6`}
        />
      )}
    </section>
  );
};

export default MyProducts;
