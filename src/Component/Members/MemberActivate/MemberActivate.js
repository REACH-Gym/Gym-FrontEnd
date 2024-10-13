import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
function MemberActivate({ id, onActive }) {
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const activeMember = async () => {
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
        console.log("Member activated successfully");
        onActive(id);
        setShowModal(true)

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
        <img
          src="/assets/image/active_member.png"
          alt="activate member"
          width={"20px"}
          height={"20px"}
        />
        <li onClick={activeMember}>تفعيل العضو</li>
      </div>

      <Modal isOpen={showModal}>
        <div>
          <div className="d-flex justify-content-end">
            <button onClick={handleCloseModal} className="border-0 pt-4 ps-4 failed">X</button>
          </div>
          <div className="text-center">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt="activate member"
              width={'100px'}
              height={'100px'}
              style={{padding:"12px"}}
            />
          </div>
          <div>
            <p className="text-center mt-2  text-dark fw-bolder mb-5">تم اعادة تفعيل العضو بنجاح</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default MemberActivate;