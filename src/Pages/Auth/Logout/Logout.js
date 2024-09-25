import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

function Logout() {
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
        toast.success("you logged out successfully");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }else{
        toast.error('failed to log out')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button type="submit" onClick={clearData} className="logout-button">
        <PowerSettingsNewOutlinedIcon /> تسجيل الخروج
      </button>
      <ToastContainer />
    </div>
  );
}
export default Logout;
