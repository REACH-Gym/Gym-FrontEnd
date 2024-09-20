import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

async function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function handleLogout() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/auth/logout",
          {
            method: "POST",
            headers: {
              accept: "*/*",
              Authorization: localStorage.getItem("access"),
            },
          }
        );
        localStorage.clear();
        if (response.ok) {
          navigate("Login");
        } else {
          console.error("Logout falied");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
    handleLogout();
  }, [navigate]);
  return null;
}

export default Logout;
