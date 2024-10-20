import React, { useEffect, useRef, useState } from "react";
import Logout from "../../Pages/Auth/Logout/Logout";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [adminName, setAdminName] = useState("");
  const [employee, setEmployee] = useState(null);

  // get the first character of admin name
  const [firstChar, setFirstChar] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settingOptions, setSettingOptions] = useState(false);

  const optionRef = useRef(); // ref for settings options
  const settingsRef = useRef(); // ref for settings panel

  useEffect(() => {
    const storedAdminName = localStorage.getItem("name of user");
    if (storedAdminName) {
      setAdminName(storedAdminName);
      setFirstChar(storedAdminName.charAt(0).toLocaleUpperCase());
    }
  }, [adminName]);

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleShowSettingOptions = () => {
    setSettingOptions(!settingOptions);
  };

  const handleClickOutside = (event) => {
    // Close settings if click is outside the settingsRef and optionRef
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target) &&
      !optionRef.current?.contains(event.target)
    ) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/employee/41",
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("access"),
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setEmployee(data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return (
    <div className="navbarContainer">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className="mt-3">
            <img src="/assets/image/logo(1).png" alt="" />
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleShowSettings}>
            <div className="d-flex align-items-center ">
              <div>
                <p className="mb-0 fw-bolder ms-3 fs-6">
                  {localStorage.getItem("name of user")}
                </p>
              </div>
              <div className="first-char">
                <p className="mb-5 fw-bolder text-light">{firstChar}</p>
              </div>
            </div>
          </div>
        </div>
        {showSettings && (
          <div className="settings" ref={settingsRef}>
            <div className="settings__outline">
              <div className="firstchar">
                <p className="mb-5 fw-bolder text-light mt-1">{firstChar}</p>
              </div>
            </div>
            <p className="mt-4 mb-0 text-center">
              {/* <span className="fw-bolder me-2">Name:</span> */}
              {localStorage.getItem("name of user")}
            </p>
            <p className="text-center">
              {/* <span className="fw-bolder me-2">Phone number:</span> */}
              {localStorage.getItem("phone number of user")}
            </p>
            <p className="pe-4 mt-5 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  className=""
                  fill="currentColor"
                  d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
                />
              </svg>
              <span
                className="me-3"
                style={{ cursor: "pointer" }}
                onClick={handleShowSettingOptions}
              >
                الأعدادات
              </span>
              {settingOptions && (
                <div className="settingsOtions" ref={optionRef}>
                  <Link
                    className="text-decoration-none text-dark"
                    to={"ChangePassword"}
                  >
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M13.35 16H2.65C1.74 16 1 15.26 1 14.35v-7.7C1 5.74 1.74 5 2.65 5h10.7c.91 0 1.65.74 1.65 1.65v7.69c0 .91-.74 1.65-1.65 1.65ZM2.65 6c-.36 0-.65.29-.65.65v7.69c0 .36.29.65.65.65h10.7c.36 0 .65-.29.65-.65V6.65c0-.36-.29-.65-.65-.65z"
                        />
                        <path
                          fill="currentColor"
                          d="M12.54 6H3.46V4.54C3.46 2.04 5.5 0 8 0s4.54 2.04 4.54 4.54zM4.46 5h7.08v-.46C11.54 2.59 9.95 1 8 1S4.46 2.59 4.46 4.54z"
                        />
                        <circle cx="12" cy="10.5" r="1" fill="currentColor" />
                        <circle cx="8" cy="10.5" r="1" fill="currentColor" />
                        <circle cx="4" cy="10.5" r="1" fill="currentColor" />
                      </svg>
                      <span className="me-2">تعديل كلمة السر</span>
                    </p>
                  </Link>
                  <Link
                    className="text-decoration-none text-dark"
                    to={"ChagePhoneNumber"}
                  >
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5"
                        />
                      </svg>
                      <span className="me-3">تعديل رقم الجوال</span>
                    </p>
                  </Link>
                  <Link
                    className="text-decoration-none text-dark"
                    to={{ pathname: "PersonalSettings", state: { employee } }}
                    onClick={fetchEmployeeData}
                  >
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
                        />
                      </svg>
                      <span className="me-2">تعديل البيانات</span>
                    </p>
                  </Link>
                </div>
              )}
            </p>
            <hr />
            <p className="pe-4">
              <Logout />
            </p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
