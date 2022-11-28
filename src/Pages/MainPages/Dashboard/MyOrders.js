import React, { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import ConfirmationModal from "../../../Components/Modal/ConfirmationModal";
import { toast } from "react-toastify";


const MyOrders = () => {
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // close delete modal
  const closeModal = () => {
    setConfirmDelete(null);
  };

  // get books by email
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/orders/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleBookDelete = (eachOrder) => {
    fetch(`${process.env.REACT_APP_HOST_LINK}/orders/${eachOrder?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedData) => {
        if (deletedData.acknowledged) {
          toast.success(
            `Your order has been removed successfully`
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
            My Orders
          </h2>
        </div>
        {orders.length === 0 ? (
          <h2 className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center text-gray-900 dark:text-gray-200">
            No Order is placed yet
          </h2>
        ) : (
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-accent uppercase bg-gray-200 dark:text-gray-200 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="py-3 px-2 w-20">
                    Ordered Date
                  </th>
                  <th scope="col" className="py-3 px-2 w-28">
                    Your Name
                  </th>
                  <th scope="col" className="py-3 px-2 w-28">
                    Your Email
                  </th>
                  <th scope="col" className="py-3 px-2 w-32">
                    Book Ordered
                  </th>
                  <th scope="col" className="py-3 px-2 text-center w-1/4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((book) => (
                  <tr
                    key={book?._id}
                    className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b"
                  >
                    <th
                      scope="row"
                      className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                    >
                      {book?.orderDate}
                    </th>
                    <td className="p-2">{book?.buyerName}</td>
                    <td className="p-2">{book?.buyerEmail}</td>
                    <td className="p-2">{book?.bookName}</td>
                    <td className="p-2 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                      {book?.bookPrice && !book?.isPaid ? (
                        <label
                          htmlFor="confirmation-modal"
                          className="btn btn-info btn-xs text-base-100 lg:btn-sm transition-all duration-300 hover:bg-primary hover:border-transparent"
                        >
                          Pay {book?.bookPrice}
                        </label>
                      ) : (
                        <div
                          className="badge badge-outline 
                              border-success text-success dark:border-base-100 dark:text-base-100"
                        >
                          Paid
                        </div>
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
    </section>
  );
};

export default MyOrders;
