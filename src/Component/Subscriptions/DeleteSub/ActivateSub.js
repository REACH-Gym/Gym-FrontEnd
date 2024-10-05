import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../../Common Components/Modal/Modal";
function ActiveSub({ id, onActive }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const handleActive = async () => {
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
        toast.success("Subscription Activated successfully");
        console.log("Subscription Activated successfully");
        onActive(id);
      } else {
        toast.error("Failed to Activated Subscription");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while Activating the Subscription");
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
      <div className="d-flex align-items-center active-member">
        <img
          src="/assets/image/active_member.png"
          alt=""
          width={"20px"}
          height={"20px"}
        />
        <li onClick={handleActive}>تفعيل الاشتراك</li>
      </div>
    </div>
  );
}
export default ActiveSub;
