import React, { useState } from "react";
import Modal from "../../Common Components/Modal/Modal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MainButton from "../../Common Components/Main Button/MainButton";

function DeleteSupport({ id, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDeleteSupport = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8000/support/${id}/`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: localStorage.getItem("access"),
          },
        }
      );
      if (response.ok) {
        console.log("Success");
        onDelete(id);
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div
        className="d-flex align-items-center delete-support"
        onClick={handleShowModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
        <span className="me-2" style={{ fontSize: "15px" }}>
          حذف
        </span>
      </div>
      <Modal isOpen={showModal}>
        <div className="text-center mt-4">
          <img
            src="/assets/image/ph_warning-bold.png"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{ padding: "12px" }}
          />
        </div>
        <div>
          <p
            className="text-center  mt-2  text-dark fw-bolder"
            style={{ fontSize: "16px" }}
          >
            هل أنت متأكد من حذف رسالة الدعم؟
          </p>
          <div className="d-flex justify-content-center delete align-items-center mt-3 mb-4 ">
            <div className="delete-button ms-3  ">
              <MainButton
                text={"تأكيد"}
                onClick={handleDeleteSupport}
                isLoading={loading}
              />
            </div>
            <div className="cancel-delete ">
              <MainButton
                text={"الغاء"}
                onClick={handleCloseModal}
                className="border-0 text-center fw-bolder text-dark p-2 rounded "
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default DeleteSupport;
