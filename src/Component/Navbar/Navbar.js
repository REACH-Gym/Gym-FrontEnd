import React from "react";
import "./navbar.css";
function Navbar() {
  return (
    <div className="navbarContainer">
      <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <div>
            <img src="/assets/image/logo(1).png" alt=""/>
          </div>
          <div className="d-flex align-items-center">
            <div className="ms-3">
              <img src="/assets/image/admin image.png" alt="admin img" width={"40px"} height={"40px"} />
            </div>
            <div>
              <p className="mb-0 fw-lighter fs-6 mt-3">Admin</p>
              <p className="admin-name">محمد</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
