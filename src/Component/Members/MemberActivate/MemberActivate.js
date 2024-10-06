import React from "react";
import { toast ,ToastContainer } from "react-toastify";
function MemberActivate({ id, onActive }) {
  const access_token = localStorage.getItem("access");

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
        toast.success('تم اعادة تفعيل العضو بنجاح');
      } else {
        console.error("Failed to activate member");
      }
    } catch (error) {
      console.error("An error occurred while activating the member", error);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center active-member">
        <img
          src="/assets/image/active_member.png"
          alt=""
          width={"20px"}
          height={"20px"}
        />
        <li onClick={activeMember}>تفعيل العضو</li>
      </div>
      <ToastContainer/>
    </>
  );
}
export default MemberActivate;