import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
import MainButton from "../../../Common Components/Main Button/MainButton";
function ActiveSub({ id, onActive }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [loading , setLoading] =  useState(false);
  const handleActive = async () => {
    setLoading(true);
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
          body: JSON.stringify({ is_active: true }),
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12s-5.373 12-12 12C5.376 23.992.008 18.624 0 12.001zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6s-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599zm4 0a5.6 5.6 0 1 1 11.2 0a5.6 5.6 0 0 1-11.2 0"
          />
        </svg>
        <div className="activateButton me-2">
        <MainButton onClick={handleActive} text={'تفعيل الأشتراك'} isLoading={loading}/>
        </div>
      </div>
      {showModal && (
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
      )}
    </div>
  );
}
export default ActiveSub;