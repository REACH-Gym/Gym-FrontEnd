import React from "react";
import "./home.css";
import SidebarBox from "../../Component/Sidebar/Sidebar";
import Container from "../../Component/Container/Container";
import ContentContainer from "../../Component/ContentContainer/ContentContainer";
import Navbar from "../../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div className="homePage ">
      <Navbar />
      <div className="homepage__item d-flex">
        <SidebarBox />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
