import React, { useEffect, useState } from "react";
import "./home.css";
import SidebarBox from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Commet } from "react-loading-indicators";
function Home() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/current-employee`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        console.log(result);
        setUserData(result);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="homePage ">
      <Navbar userData={userData} />
      <div className="homepage__item d-flex">
        <SidebarBox />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
