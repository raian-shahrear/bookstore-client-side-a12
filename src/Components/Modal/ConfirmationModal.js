import React from "react";

const ConfirmationModal = ({title, message, closeModal, successData, successAction }) => {
  return (
    <div className="">
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded-md bg-gray-100 text-accent dark:text-base-100 dark:bg-gray-800">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label onClick={() => successAction(successData)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-500 text-base-100 transition-all duration-300 hover:bg-red-700 border-transparent hover:border-transparent mr-6">
              Ok
            </label>
            <label onClick={closeModal} htmlFor="confirmation-modal" className="btn btn-sm text-base-100">
              close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
