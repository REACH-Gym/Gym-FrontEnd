import React, { useState, useEffect } from "react";
import MainButton from "../Main Button/MainButton";
import "./filter.css";
import { useLazySearchQuery } from "../../features/api";
const filters = {
  name: "الاسم",
  "user.name": "اسم المستخدم",
  "user.phone_number": "رقم الجوال",
  "user.national_id": "رقم العضوية",
  "schedule.session.name": "المجموعة",
  "membership.name": "الباقة",
  "schedule.trainer.name": "اسم المدرب",
};

function Filter({ options = [], query, status = true, searchResults }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [term, setTerm] = useState("");
  const [debounce, setDebounce] = useState(term);
  const [search, { isLoading }] = useLazySearchQuery();

  const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[0]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    console.log(term);
    const timeout = setTimeout(() => {
      setDebounce(term);
    }, 300);
    return () => clearTimeout(timeout);
  }, [term]);

  const searchInput = React.useRef(null);

  useEffect(() => {
    console.log(activeFilter);
    if (debounce.length > 0) {
      (async () => {
        const response = await search(
          `${query}?filter{${activeFilter}.istartswith}=${debounce}`
        );
        searchResults(response.data.data);
        console.log(response.data.data);
      })();
    } else {
      searchResults([]);
    }
  }, [query, debounce, search, activeFilter]);

  return (
    <div className="filterContainer">
      <form className={`d-flex`}>
        <div className="searchInputContainer">
          <input
            type="text"
            id="search"
            placeholder="ابحث هنا"
            className="searchInput ms-2"
            ref={searchInput}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={activeFilter === "status"}
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
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`fw-lighter ${
                    filters[activeFilter] === option
                      ? "bg-primary text-white rounded-2"
                      : null
                  }`}
                  style={{ color: "#666666", fontSize: "13px" }}
                  onClick={() => {
                    setActiveFilter(
                      Object.keys(filters).find(
                        (key) => filters[key] === option
                      )
                    );
                    setTimeout(() => {
                      toggleDropdown();
                      clearTimeout();
                    }, 300);
                    console.log(activeFilter);
                  }}
                >
                  {option}
                </li>
              ))}
              {status && (
                <li
                  className={`fw-lighter`}
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <div>
                    <span className="fw-bold">الحالة</span>
                    <ul>
                      <li
                        style={{ borderBottom: "1px solid #ccc" }}
                        className={`${
                          term === "فعال"
                            ? "bg-primary text-white rounded-2"
                            : null
                        }`}
                        onClick={() => {
                          setActiveFilter("status");
                          setTerm("active");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        فعال
                      </li>
                      <li
                        style={{ borderBottom: "1px solid #ccc" }}
                        className={`${
                          term === "منتهي"
                            ? "bg-primary text-white rounded-2"
                            : null
                        }`}
                        onClick={() => {
                          setTerm("expired");
                          setActiveFilter("status");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        منتهي
                      </li>
                      <li
                        style={{ borderBottom: "1px solid #ccc" }}
                        className={`${
                          term === "ملغي"
                            ? "bg-primary text-white rounded-2"
                            : null
                        }`}
                        onClick={() => {
                          setTerm("cancelled");
                          setActiveFilter("status");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        ملغي
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
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
