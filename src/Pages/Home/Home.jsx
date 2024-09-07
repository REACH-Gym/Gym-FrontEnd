import React from "react";
import "./home.css";
import SidebarBox from "../../Component/Sidebar/Sidebar";
import Container from "../../Component/Container/Container";
import Navbar from "../../Component/Navbar/Navbar";
function Home() {
  return (
    <div className="homePage d-flex">
      <Navbar/>
      <SidebarBox />
      <Container />
    </div>
  );
}

export default Home;
