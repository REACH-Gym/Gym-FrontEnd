import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "../../../Common Components/Modal/Modal";
function DeleteSubscripedMember({ id, onDelete }) {
  const access_token = localStorage.getItem("access");
  const [showModal , setShowModal] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/members/memberships/${id}/`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: access_token,
          },
        }
      );
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (response.ok) {
        console.log("subscriped member deleted successfully");
        onDelete(id);
      } else {
        console.error("failed to delete subscriped member");
      }
    } catch (error) {
      console.error("An Error Ocurred", error);
    }
  };
  const handleOpenModal = ()=>{
    setShowModal(true);
  }
  const handleCloseModal = ()=>{
    setShowModal(false);
  }
  return (
    <div>
      <p onClick={handleOpenModal}>
        <DeleteOutlineOutlinedIcon /> حذف
      </p>
      {showModal && (
        <Modal isOpen={handleOpenModal} onClose={handleCloseModal}>
          <p className="text-center mt-5 fs-6 text-dark fw-bolder">هل أنت متأكد من حذف هذا العضو؟</p>
          <div  className="mb-4 mt-4 delete text-center">
            <button onClick={handleDelete} className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 delete-btn">نعم, حذف</button>
            <button onClick={handleCloseModal} className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 canel-delete">الغاء</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default DeleteSubscripedMember;