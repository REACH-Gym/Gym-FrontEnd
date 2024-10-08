import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../Common Components/Modal/Modal";

function DeleteMember({ id, onDelete }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/members/deactivate/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: access_token,
          },
        }
      );
      console.log(id)

      if (response.ok) {
        onDelete(id);

      } else {
        toast.error("Failed to delete member");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the member");
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <p onClick={handleShowModal} style={{ cursor: "pointer" }} className="m-0">
        <DeleteOutlineOutlinedIcon className="dropdown__icon" /> حذف
      </p>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div>
            <p className="text-center mt-4 fs-5 text-dark fw-bolder">
              هل انت متأكد انك تريد حذف هذا العضو؟
            </p>
            <div className="text-center delete mt-5 mb-4">
              <button
                onClick={handleDelete}
                className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 delete-btn"
              >
                نعم, حذف
              </button>
              <button
                onClick={handleCloseModal}
                className="border-0 text-center fw-bolder text-dark p-2 rounded canel-delete"
              >
                الغاء
              </button>
            </div>
          </div>
          <ToastContainer/>
        </Modal>
      )}
    </>
  );
}
export default DeleteMember;