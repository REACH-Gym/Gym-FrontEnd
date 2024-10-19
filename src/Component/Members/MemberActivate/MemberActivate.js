import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
import MainButton from "../../../Common Components/Main Button/MainButton";
function MemberActivate({ id, onActive }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeMember = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/members/activate/${id}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            Authorization: access_token,
          },
        }
      );
      if (response.ok) {
        onActive(id);
        setShowModal(true);
      } else {
        console.error("Failed to activate member");
      }
    } catch (error) {
      console.error("An error occurred while activating the member", error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="d-flex align-items-center active-member">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12s-5.373 12-12 12C5.376 23.992.008 18.624 0 12.001zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6s-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599zm4 0a5.6 5.6 0 1 1 11.2 0a5.6 5.6 0 0 1-11.2 0"
          />
        </svg>
        <div className="activateButton me-2">
          <MainButton
            onClick={activeMember}
            isLoading={loading}
            text={"تفعيل العضو"}
          />
        </div>
      </div>
      <Modal isOpen={showModal}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              onClick={handleCloseModal}
              className="border-0 pt-4 ps-4 failed"
            >
              X
            </button>
          </div>
          <div className="text-center">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt="activate member"
              width={"100px"}
              height={"100px"}
              style={{ padding: "12px" }}
            />
          </div>
          <div>
            <p className="text-center mt-2  text-dark fw-bolder mb-5">
              تم اعادة تفعيل العضو بنجاح
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default MemberActivate;