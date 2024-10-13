import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "../../../Common Components/Modal/Modal";
function DeleteMember({ id, onDelete }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [openFailedDeletModal, setOpenFailedDeletModal] = useState(false);
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
      console.log(id);

      if (response.ok) {
        onDelete(id);
      } else {
        console.log("failed to deactive this member!");
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
        <DeleteOutlineOutlinedIcon className="dropdown__icon" /> حذف
      </p>
      {showModal && (
        <Modal isOpen={showModal}>
          <div>
            <div className="text-center mt-4">
              <img
                src="/assets/image/ph_warning-bold.png"
                alt="delete-img"
                width={"`100px"}
                height={"100px"}
                style={{padding:"12px"}}
              />
            </div>
            <p className="text-center mt-2  text-dark fw-bolder">
              هل انت متأكد انك تريد حذف هذا العضو؟
            </p>
            <div className="text-center delete mt-3 mb-4 ">
              <button
                onClick={handleDelete}
                className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 delete-btn"
              >
                تأكيد
              </button>
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
              width={"100px"}
              height={"100px"}
              style={{padding:"12px"}}
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