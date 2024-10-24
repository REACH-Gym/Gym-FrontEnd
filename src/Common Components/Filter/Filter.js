import React, { useState } from "react";
import MainButton from "../Main Button/MainButton";
import "./filter.css";
import { useDispatch } from "react-redux";
import { searchR } from "../../features/searchSlice";

function Filter({
  filter = false,
  isDisabled = false,
  placeHolder = "ابحث هنا...",
  handleClear,
  children,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDropdown = () => {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains(`searchIcon`)) {
        setDropdownOpen(false);
        document.removeEventListener("click", handleDropdown);
      } else {
        setDropdownOpen(true);
        document.removeEventListener("click", handleDropdown);
      }
    });
  };

  return (
    <div className="filterContainer">
      <form className={`d-flex`}>
        <div className="searchInputContainer position-relative">
          <input
            type="text"
            id="search"
            placeholder={placeHolder}
            className="searchInput ms-2"
            // value={term}
            disabled={isDisabled}
            onChange={(e) => {
              setTimeout(() => {
                dispatch(searchR({ term: e.target.value }));
              }, 300);
            }}
          />
          {placeHolder !== "ابحث هنا..." && (
            <div className="clearIcon" onClick={handleClear}>
              X
            </div>
          )}
          {filter && (
            <>
              {/* Left icon */}
              <img
                src="/assets/image/Component 13.png"
                alt="search icon"
                className="searchIcon"
                onClick={handleDropdown}
              />

              {/* Dropdown list */}
              <div
                className={`dropdownList ${dropdownOpen ? "open" : "d-none"}`}
              >
                {children}
              </div>
            </>
          )}
        </div>
        <div className="btnDiv">
          <MainButton
            text={"بحث"}
            btnWidth={"100px"}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </form>
    </div>
  );
}
export default Filter;
