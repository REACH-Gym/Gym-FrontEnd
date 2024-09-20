import React, { useEffect, useState } from "react";
import "./navbar.css";
function Navbar() {
  // get name of admin to display it
  const [adminName, setAdminName] = useState("");
  // get the first character of admin name
  const [firstChar, setFirstChar] = useState("");
  useEffect(() => {
    const storedAdminName = localStorage.getItem("adminName");
    if (storedAdminName) {
      setAdminName(storedAdminName);
      setFirstChar(storedAdminName.charAt(0));
    }
  }, [adminName]);

  return (
    <div className="navbarContainer">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div>
            <img src="/assets/image/logo(1).png" alt="" />
          </div>
          <div className="d-flex align-items-center ">
            <div className="ms-3 first-char">
              <p className="mb-5 fw-bolder text-light">{firstChar}</p>
            </div>
            <div>
              <p className="mb-0 fw-lighter fs-6 mt-4 ">Admin</p>
              <p className="admin-name text-center">{adminName}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
