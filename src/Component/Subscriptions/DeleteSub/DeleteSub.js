import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast , ToastContainer } from "react-toastify";
import Modal from "../../../Common Components/Modal/Modal";
function DeleteSub({id , onDelete}) {
  const access_token = localStorage.getItem("access");
  const [showModal,setShowModal] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/memberships/${id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        }
      );
      if (response.ok) {
        toast.success("Subscription deleted successfully");
        console.log("Subscription deleted successfully");
        onDelete(id);
      } else {
        toast.error("Failed to delete Subscription");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the Subscription");
    }
  };
  const handleShowModal = ()=>{
    setShowModal(true);
  }
  const handleCloseModal = ()=>{
    setShowModal(false);
  }
  return (
    <div>
      <p onClick={handleShowModal} >
        <DeleteOutlineOutlinedIcon className="dropdown__icon" /> حذف
      </p>
      <ToastContainer/>
     {showModal && (
      <Modal isOpen={showModal} onClose={handleCloseModal}>
         <p className="text-center mt-5 fs-6 text-dark ">هل أنت متأكد من انك تريد حذف هذا الأشتراك؟</p>
         <div className="mb-4 mt-4 delete text-center">
          <button onClick={handleDelete} className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 delete-btn">نعم, حذف</button>
          <button onClick={handleCloseModal} className="border-0 text-center fw-bolder tetx-dark p-2 rounded ms-3 canel-delete">الغاء</button>
         </div>
      </Modal>
     )}
    </div>
  );
}
export default DeleteSub;