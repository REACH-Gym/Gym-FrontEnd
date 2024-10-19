import React, { useState, useEffect } from "react";
import MainButton from "../Main Button/MainButton";
import "./filter.css";
import { useLazySearchQuery } from "../../features/api";
const filters = {
  name: "الاسم",
  action: "العملية",
  "user.name": "اسم المستخدم",
  phone_number: "رقم الجوال",
  national_id: "رقم العضوية",
  "schedule.session.name": "المجموعة",
  "membership.name": "الباقة",
  "schedule.trainer.name": "اسم المدرب",
  is_active: "محذوف",
};

function Filter({
  options = [],
  query,
  status = true,
  eStatus = true,
  searchResults,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [debounce, setDebounce] = useState(term);
  const [search, { isLoading }] = useLazySearchQuery();

  const [activeFilter, setActiveFilter] = useState(
    Object.keys(filters).find((value) => filters[value] === options[0])
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    console.log(term);
    const timeout = setTimeout(() => {
      setDebounce(term);
    }, 200);
    return () => clearTimeout(timeout);
  }, [term]);

  const searchInput = React.useRef(null);

  useEffect(() => {
    console.log(activeFilter);
    console.log(debounce.length);
    if (debounce.length > 0 && debounce) {
      (async () => {
        const response = await search(
          `${query}?filter{${activeFilter}.istartswith}=${debounce}`
        );
        searchResults(response.data);
        console.log(response.data);
      })();
    } else {
      searchResults([]);
    }
  }, [activeFilter, debounce, query, search, searchResults]);

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
        <div className="searchInputContainer">
          <input
            type="text"
            id="search"
            placeholder="ابحث هنا"
            className="searchInput ms-2"
            ref={searchInput}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={activeFilter === "status" || activeFilter === "is_active"}
          />
          {/* Left icon */}
          <img
            src="/assets/image/Component 13.png"
            alt="search icon"
            className="searchIcon"
            onClick={handleDropdown}
          />

          {/* Dropdown list */}
          <div className={`dropdownList ${dropdownOpen ? "open" : "d-none"}`}>
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
                          term === "active"
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
                          term === "expired"
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
                          term === "almost over"
                            ? "bg-primary text-white rounded-2"
                            : null
                        }`}
                        onClick={() => {
                          setTerm("almost over");
                          setActiveFilter("status");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        أوشك علي الأنتهاء
                      </li>

                      <li
                        style={{ borderBottom: "1px solid #ccc" }}
                        className={`${
                          term === "freezed"
                            ? "bg-primary text-white rounded-2"
                            : null
                        }`}
                        onClick={() => {
                          setTerm("freezed");
                          setActiveFilter("status");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        متجمد
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {eStatus && (
                <li
                  className={`fw-lighter mt-2`}
                  style={{
                    fontSize: "13px",
                    padding: 0,
                  }}
                >
                  <div>
                    <ul className="p-0">
                      <li
                        className={`${
                          term === "true"
                            ? "bg-primary text-white rounded-2"
                            : null
                        } `}
                        onClick={() => {
                          setTerm("true");
                          setActiveFilter("is_active");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        الإشتراكات الفعالة
                      </li>
                      <li
                        className={`${
                          term === "false"
                            ? "bg-primary text-white rounded-2"
                            : null
                        } `}
                        onClick={() => {
                          setTerm("false");
                          setActiveFilter("is_active");
                          setTimeout(() => {
                            toggleDropdown();
                            clearTimeout();
                          }, 300);
                        }}
                      >
                        الإشتراكات المحذوفة
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
