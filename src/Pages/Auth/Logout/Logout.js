import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ModalLogOut from "./ModalLogOut";

function Logout({ onClose }) {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");

  async function clearData() {
    try {
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/auth/logout",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            Authorization: access_token,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("failed to log out");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalLogOut>
      <div>
        <div>
          <button onClick={onClose} className="cancel-button fs-5 fw-bolder">
            x
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
          <img src="/assets/image/logout-2-svgrepo-com.png" alt="Logout" />
        </div>
        <div>
          <p className="fw-bolder  text-center">
            هل انت متأكد من انك تريد تسجيل الخروج؟
          </p>
        </div>
        <div className="text-center">
          <button
            type="submit"
            onClick={clearData}
            className="logout-button mt-4 mb-4"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
      <ToastContainer />
    </ModalLogOut>
  );
}
export default Logout;
