import React, { useState } from "react";
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
          body:JSON.stringify({is_active:true}),
        }
      );
      if (response.ok) {
        setShowModal(true);
        console.log("Subscription Activated successfully");
        onActive(id);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
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

      <Modal isOpen={showModal}>
        <div>
          <button onClick={handleCloseModal}>X</button>
        </div>
        <div>
          <img src="/assets/image/weui_done2-outlined.png" alt="" />
        </div>
        <div>
          <p>تم اعادة تفعيل هذا الأشتراك بنجاح</p>
        </div>
      </Modal>
    </div>
  );
}
export default ActiveSub;