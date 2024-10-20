import React, { useEffect, useRef, useState } from "react";
import "./SubscripedMembers.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";
import { Active, AlmostOver, Expired, Freezed } from "../../Status/Status";
import { Helmet } from "react-helmet";
function SubscripedMembers() {
  const access_token = localStorage.getItem("access");
  const [SubscripedMembers, setSubscripedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [total_pages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSubscripedMember() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members/memberships?page=${page}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
            setSubscripedMembers(result.data.user_memberships);
            setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscripedMember();
  }, [per_page, page, access_token]);

  const handleShowDropMenu = (id) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  const handleNextPage = () => {
    if (page < total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
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
    <div className="allSubscriptionContainer mt-4">
      <Helmet>
        <title>
          الاعضاء المشتركين
        </title>
      </Helmet>
      {loading ? (
        <div className="loader">
          <Commet width="50px" height="50px" color="#316dcc" />
        </div>
      ) : SubscripedMembers.length === 0 ? (
        <div
          className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          لا يوجد أعضاء مشتركين
        </div>
      ) : (
        <div className="allSubscriptionContainer__item">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/subscriptions.png"}
              title={"جميع الاعضاء المشتركين"}
              subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
            />
            <Filter searchResults={setResults} query={"members/memberships"} eStatus={false}/>
            <ComponentBtns btn1={"+ إضافة اشتراك جديد "} />
          </div>

          {results?.data?.user_memberships?.length === 0 ? (
            
            <div
              className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
              style={{ color: "red", height: "60vh" }}
            >
              لم يتم العثور علي نتائج مطابقة
            </div>
          ) : results?.data?.user_memberships?.length > 0 ? (
            <div className="p-3">
              <div className="tableContainer">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="pb-4">#</th>
                      <th scope="col" className="pb-4">اسم العضو</th>
                      <th scope="col" className="pb-4">رقم العضوية</th>
                      <th scope="col" className="pb-4">الإجمالي</th>
                      <th scope="col" className="pb-4">المدفوع</th>
                      <th scope="col" className="pb-4">المتبقي</th>
                      <th scope="col" className="pb-4">الخصم</th>
                      <th scope="col" className="pb-4">تاريخ الاشتراك</th>
                      <th scope="col" className="pb-4 text-center">الحالة</th>
                      <th scope="col" className="pb-4 text-center">خيارات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.data?.user_memberships?.map((item, index) => (
                      <tr style={{ fontSize: "14px" }} key={item.id}>
                        <td>{index + 1 + (page - 1) * per_page}</td>
                        <td>{item.user.name}</td>
                        <td>{item.user.national_id}</td>
                        <td>{item.membership.price}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>{item.start_date}</td>
                        <td className={''}>
                          {item.status === "active" ? <Active /> : null}
                          {item.status === "freezed" ? <Freezed /> : null}
                          {item.status === "almost over" ? <AlmostOver /> : null}
                          {item.status === "expired" ? <Expired /> : null}
                        </td>
                        <td className="fw-bolder text-center fs-5">
                          <MoreVertIcon
                            onClick={() => handleShowDropMenu(item.id)}
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === item.id && (
                            <ul className="drop-menu" ref={dropdownRef}>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/SubscripedMembers/${item.id}/`
                                  )
                                }
                              >
                      
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"/></svg>
                                <span className="me-2">
                                 تفاصيل
                                 </span>
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="tableContainer mt-4">
              <table className="table border-1 mt-3">
                <thead>
                  <tr>
                    <th scope="col" className="pb-4">#</th>
                    <th scope="col" className="pb-4">اسم العضو</th>
                    <th scope="col" className="pb-4">رقم العضوية</th>
                    <th scope="col" className="pb-4">الإجمالي</th>
                    <th scope="col" className="pb-4">المدفوع</th>
                    <th scope="col" className="pb-4">المتبقي</th>
                    <th scope="col" className="pb-4">الخصم</th>
                    <th scope="col" className="pb-4">تاريخ الاشتراك</th>
                    <th scope="col" className="pb-4">الحالة</th>
                    <th scope="col" className="pb-4 text-center">خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {SubscripedMembers.map((SubscripedMember, index) => {
                    return (
                      <tr
                        style={{ fontSize: "14px" }}
                        key={SubscripedMember.id}
                      >
                        <td className="fw-bolder">
                          {index + 1 + (page - 1) * per_page}
                        </td>
                        <td>{SubscripedMember.user.name}</td>
                        <td>{SubscripedMember.user.national_id}</td>
                        <td>{SubscripedMember.membership.price}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>{SubscripedMember.start_date}</td>
                        <td className={""}>
                          {SubscripedMember.status === "active" ? (
                            <Active />
                          ) : null}
                          {SubscripedMember.status === "freezed" ? (
                            <Freezed />
                          ) : null}
                          {SubscripedMember.status === "almost over" ? (
                            <AlmostOver />
                          ) : null}
                          {SubscripedMember.status === "expired" ? (
                            <Expired />
                          ) : null}
                        </td>
                        <td className="text-center">
                          <MoreVertIcon
                            onClick={() =>
                              handleShowDropMenu(SubscripedMember.id)
                            }
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === SubscripedMember.id && (
                            <ul className="drop-menu" ref={dropdownRef}>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/SubscripedMembers/${SubscripedMember.id}/`
                                  )
                                }
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"/></svg>
                                <span className="me-2">
                                تفاصيل
                                </span>
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="preivous-btn">
                  <MainButton
                    text={">>"}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  />
                </div>
                <div>
                  <span className="ms-3 me-3">
                    الصفحة {total_pages} من {page}
                  </span>
                </div>
                <div className="next-btn">
                  <MainButton
                    text={"<<"}
                    onClick={handleNextPage}
                    disabled={page >= total_pages}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default SubscripedMembers;