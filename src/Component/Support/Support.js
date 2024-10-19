import React, { useEffect, useState, useRef } from "react";
import "./Support.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteSupport from "./DeleteSupport";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
function Support() {
 
  const [support, setSupport] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [loading, setLoading] = useState(true); 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function supportData() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/support/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("access"),
            },
          }
        );
        const fetchedData = await response.json();
        if (response.ok) {
          setSupport(fetchedData.data);
        }
      } catch (error) {
        console.error("Error fetching support data:", error);
      } finally {
        setLoading(false); 
      }
    }
    supportData();
  }, []);

  const handleToggleDropMenu = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };

  const handleDeleteSupport = (id) => {
    setSupport((prevSupport) => prevSupport.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (

    <div className="supportContainer">
       <Helmet>
    <title>
      رسائل الدعم
    </title>
  </Helmet>
      {loading ? (
        <div className="loader">
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      ) : support.length > 0 ? (
        <>
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              title={"جميع رسائل الدعم"}
              MainIcon={
                "/assets/image/support-music-listen-headphone-earphone-headset-svgrepo-com.png"
              }
            />
          </div>
          <div className="tableContainer mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col">رقم الجوال</th>
                  <th scope="col">الملاحظات</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col" className="text-center">
                    خيارات
                  </th>
                </tr>
              </thead>
              <tbody>
                {support.map((support, index) => (
                  <tr className="tr" key={support.id}>
                    <td className="fw-bolder">{index + 1}</td>
                    <td>{support.phone_number}</td>
                    <td
                      onClick={() => navigate(`/Home/Support/${support.id}`)}
                    >
                      {support.message.slice(0, 50)}
                    </td>
                    <td>{support.created_at.slice(0, 10)}</td>
                    <td className="text-center">
                      <MoreVertIcon
                        onClick={() => handleToggleDropMenu(support.id)}
                        style={{ cursor: "pointer" }}
                      />
                      {showDropdown === support.id && (
                        <ul className="dropmenu" ref={dropdownRef}>
                          <li>
                            <DeleteSupport
                              id={support.id}
                              onDelete={handleDeleteSupport}
                            />
                          </li>
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}>لا يوجد رسائل دعم</div>
      )}
    </div>
  );
}
export default Support;