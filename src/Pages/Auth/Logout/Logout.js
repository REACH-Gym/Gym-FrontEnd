import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLogOut from "./ModalLogOut";
import MainButton from "../../../Common Components/Main Button/MainButton";

function Logout() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModalLogout, setShowModalLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  async function clearData() {
    setLoading(true);
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
        console.error("Failed to log out");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleShowModal = () => {
    setShowModalLogout(true);
  };

  const handleCloseModal = () => {
    setShowModalLogout(false);
  };

  return (
    <div>
      <p onClick={handleShowModal} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 1200 1200"
        >
          <path
            fill="#FF6666"
            d="M513.94 0v693.97h172.12V0zM175.708 175.708C67.129 284.287 0 434.314 0 600c0 331.371 268.629 600 600 600s600-268.629 600-600c0-165.686-67.13-315.713-175.708-424.292l-120.85 120.85c77.66 77.658 125.684 184.952 125.684 303.442c0 236.981-192.146 429.126-429.126 429.126c-236.981 0-429.126-192.145-429.126-429.126c0-118.49 48.025-225.784 125.684-303.442z"
          />
        </svg>
        <span className="fw-bolder me-3" style={{ color: "#FF6666" }}>
          تسجيل الخروج
        </span>
      </p>

      {/* Modal */}
      {showModalLogout && (
        <ModalLogOut isOpen={showModalLogout} onClose={handleCloseModal}>
          <div>
            <button
              onClick={handleCloseModal}
              className="cancel-button fs-5 fw-bolder"
            >
              X
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
            <img src="/assets/image/logout-2-svgrepo-com.png" alt="Logout" />
          </div>
          <div>
            <p className="fw-bolder text-center mb-4">
              هل انت متأكد من انك تريد تسجيل الخروج؟
            </p>
          </div>
          <div className="text-center logOutBtn">
            <MainButton
              isLoading={loading}
              type="submit"
              onClick={clearData}
              text="تسجيل الخروج"
              className="logout-button mt-4 mb-4"
            />
          </div>
        </ModalLogOut>
      )}
    </div>
  );
}
export default Logout;