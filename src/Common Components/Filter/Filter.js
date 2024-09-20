import React, { useState } from "react";
import MainButton from "../Main Button/MainButton";
import "./filter.css";

function Filter({
  option1,
  option2,
  option3,
  option4,
  onClickOption1,
  onClickOption2,
  onClickOption3,
  onClickOption4,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="filterContainer">
      <form className={`d-flex`}>
        <div className="searchInputContainer">
          <input
            type="text"
            id="search"
            placeholder="ابحث هنا"
            className="searchInput ms-2"
          />
          {/* Left icon */}
          <img
            src="/assets/image/Component 13.png"
            alt="search icon"
            className="searchIcon"
            onClick={toggleDropdown}
          />

          {/* Dropdown list */}
          <div className={`dropdownList ${dropdownOpen ? "open" : ""}`}>
            <ul>
              <li
                className="fw-lighter"
                style={{ color: "#666666", fontSize: "13px" }}
                onClick={onClickOption1}
              >
                {option1}
              </li>
              <li
                className="fw-lighter"
                style={{ color: "#666666", fontSize: "13px" }}
                onClick={onClickOption2}
              >
                {option2}
              </li>
              <li
                className="fw-lighter"
                style={{ color: "#666666", fontSize: "13px" }}
                onClick={onClickOption3}
              >
                {option3}
              </li>
              <li
                className="fw-lighter"
                style={{ color: "#666666", fontSize: "13px" }}
                onClick={onClickOption4}
              >
                {option4}
              </li>
            </ul>
          </div>
        </div>
        <div className="btnDiv">
          <MainButton text={"بحث"} btnWidth={"100px"} />
        </div>
      </form>
    </div>
  );
}

export default Filter;
