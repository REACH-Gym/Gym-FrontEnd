import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
import MainButton from "../../../Common Components/Main Button/MainButton";
function DeleteSub({ id, onDelete }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8000/memberships/${id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify({ is_active: false }),
        }
      );
      if (response.ok) {
        onDelete(id);
      } else {
        console.error("Failed to delete Subscription");
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
  return (
    <div>
      <p onClick={handleShowModal} className="m-0">
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
        <span className="me-2">حذف</span>
      </p>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div className="text-center mt-4">
            <img
              src="/assets/image/ph_warning-bold.png"
              alt="delete subscription"
              width={"110px"}
              height={"110px"}
              style={{ padding: "6px" }}
            />
          </div>
          <p className="text-center mt-3 fs-6 text-dark fw-bolder ">
            هل أنت متأكد من انك تريد حذف هذا الأشتراك؟
          </p>
          <div className="mb-4 delete d-flex justify-content-center">
            <div className="confirmDeactive ms-3">
              <MainButton
                text={"تأكيد"}
                onClick={handleDelete}
                isLoading={loading}
                className="border-0 text-center fw-bolder text-dark p-2 rounded ms-3 delete-btn"
              ></MainButton>
            </div>
            <button
              onClick={handleCloseModal}
              className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 canel-delete"
            >
              الغاء
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default DeleteSub;
