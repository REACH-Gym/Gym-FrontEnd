import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
import MainButton from "../../../Common Components/Main Button/MainButton";
function DeleteMember({ id, onDelete }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [openFailedDeletModal, setOpenFailedDeletModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/members/deactivate/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: access_token,
        },
      });
      console.log(id);

      if (response.ok) {
        onDelete(id);
      } else {
        setShowModal(false);
        setOpenFailedDeletModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowFailedModal = () => {
    setOpenFailedDeletModal(false);
  };
  return (
    <>
      <p
        onClick={handleShowModal}
        style={{ cursor: "pointer" }}
        className="m-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
        <span className="me-2">حذف</span>
      </p>
      {showModal && (
        <Modal isOpen={showModal}>
          <div className="fw-bolder">
            <div className="text-center mt-4">
              <img
                src="/assets/image/ph_warning-bold.png"
                alt="delete-img"
                width={"`110px"}
                height={"110px"}
                style={{ padding: "12px" }}
              />
            </div>
            <p
              className="text-center mt-2  text-dark"
              style={{ fontWeight: "bolder" }}
            >
              هل انت متأكد انك تريد حذف هذا العضو؟
            </p>
            <div className="d-flex justify-content-center delete mt-3 mb-4 fw-bolder ">
              <div className="confirmDeactive ms-3">
                <MainButton
                  text={"تأكيد"}
                  onClick={handleDelete}
                  isLoading={loading}
                  // className="border-0 text-center fw-bolder text-dark p-2 rounded ms-3 delete-btn"
                />
              </div>
              <button
                onClick={handleCloseModal}
                className="border-0 text-center fw-bolder text-dark p-2 rounded canel-delete"
              >
                الغاء
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Modal isOpen={openFailedDeletModal}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleShowFailedModal}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt="delete-img"
              width={"110px"}
              height={"110px"}
              style={{ padding: "12px" }}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خظأ أثناء حذف هذا العضو
          </p>
        </div>
      </Modal>
    </>
  );
}
export default DeleteMember;
