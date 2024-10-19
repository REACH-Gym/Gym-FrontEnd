import React, { useEffect, useState, useRef } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";
import DeleteMember from "../DeleteMember/DeleteMember";
import MemberActivate from "../MemberActivate/MemberActivate";
import { Active, Deleted } from "../../Status/Status";
import { Helmet } from "react-helmet";
function AllMembers() {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [per_page] = useState(10);
  const access_token = localStorage.getItem("access");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchAllMembers() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members/?page=${page}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              Authorization: access_token,
              accept: "application/json",
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setAllMembers(result.data.users);
          setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error("error Occurred:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllMembers();
  }, [access_token, page, per_page]);

  const toggleDropdown = (id) => {
    setShowDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeleteMember = (id) => {
    setAllMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, is_active: false } : member
      )
    );
  };

  const handleActiveMember = (id) => {
    setAllMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, is_active: true } : member
      )
    );
  };

  const handleDeleteMemberInFilter = (id) => {
    setAllMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, is_active: false } : member
      )
    );
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleActiveMemberInFilter = (id) => {
    setAllMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, is_active: true } : member
      )
    );
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
    <div className="allMembereContainer">
      <Helmet>
        <title>
          جميع الأعضاء
        </title>
      </Helmet>
      {loading ? (
        <div className="loader">
          <Commet width="50px" height="50px" color="#316dcc" />
        </div>
      ) : allMembers.length === 0 ? (
        <div
          className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          لا يوجد أعضاء
        </div>
      ) : (
        <div className="allMembereContainer__items">
          <div>
            <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
              <ComponentTitle
                MainIcon={"/assets/image/Vector.png"}
                title={" جميع الأعضاء"}
                subTitle={"يمكنك متابعة جميع بيانات الأعضاء  من هنا"}
              />
              <Filter
                options={["الاسم", "رقم الجوال", "رقم العضوية"]}
                query={"members/"}
                searchResults={setResults}
                status={false}
              />
              <ComponentBtns />
            </div>
            {results?.data?.users?.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
                style={{ color: "red", height: "60vh" }}
              >
                لم يتم العثور علي نتائج مطابقة
              </div>
            ) : results?.data?.users?.length > 0 ? (
              <div className="p-3">
                <div className="tableContainer">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="p-2 pt-3 pb-3">#</th>
                        <th className="p-2 pt-3 pb-3">الإسم</th>
                        <th className="p-2 pt-3 pb-3">رقم الجوال</th>
                        <th className="p-2 pt-3 pb-3">رقم العضوية</th>
                        <th className="p-2 pt-3 pb-3">تاريخ التسجيل</th>
                        <th className="p-2 pt-3 pb-3">الرصيد</th>
                        <th className="p-2 pt-3 pb-3">تاريخ الميلاد</th>
                        <th className="p-2 pt-3 pb-3">حالة العضو</th>
                        <th className="p-2 pt-3 pb-3">خيارات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results?.data?.users?.map((item, index) => (
                        <tr key={item.id}>
                          <th
                            scope="row"
                            style={{
                              fontSize: "13px",
                              fontWeight: "lighter",
                            }}
                          >
                            {index + 1 + (page - 1) * per_page}
                          </th>
                          <td>{item.name}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.national_id}</td>
                          <td>{item.created_at.slice(0, 10)}</td>
                          <td>0</td>
                          <td>{item.date_of_birth}</td>
                          <td>
                            {item.is_active === false ? (
                              <Deleted />
                            ) : (
                              <Active />
                            )}
                          </td>
                          <td>
                            {item.is_active === false ? (
                              <Deleted />
                            ) : (
                              <Active />
                            )}
                          </td>
                          <td className="text-center">
                            <MoreVertIcon
                              onClick={() => toggleDropdown(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                            {showDropdown === item.id && (
                              <ul className="drop-menu" ref={dropdownRef}>
                                {item.is_active ? (
                                  <>
                                    <li
                                      onClick={() =>
                                        navigate(
                                          `/Home/AllMembers/${item.id}/edit`,
                                          {
                                            state: { member: item },
                                          }
                                        )
                                      }
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"/></svg>
                                        <span className="me-2">تعديل البيانات</span>
                                    </li>
                                    {/* <Link to={`AllMembers/${item.id}`} className="text-decoration-none">
                                    <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5"/></svg>
                                    <span className="me-2">تعديل رقم الهاتف</span>
                                    </li>
                                    </Link> */}
                                    <li>
                                      <DeleteMember
                                        id={item.id}
                                        onDelete={handleDeleteMemberInFilter}
                                      />
                                    </li>
                                  </>
                                ) : (
                                  <MemberActivate
                                    id={item.id}
                                    onActive={handleActiveMemberInFilter}
                                  />
                                )}
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
              <div className="tableContainer mt-2">
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col" className="pb-4">#</th>
                      <th scope="col" className="pb-4">الإسم</th>
                      <th scope="col" className="pb-4">رقم الجوال</th>
                      <th scope="col" className="pb-4">رقم العضوية</th>
                      <th scope="col" className="pb-4">تاريخ التسجيل</th>
                      <th scope="col" className="pb-4">الرصيد</th>
                      <th scope="col" className="pb-4">تاريخ الميلاد</th>
                      <th scope="col" className="pb-4">حالة العضو</th>
                      <th scope="col" className="pb-4">خيارات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMembers?.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.national_id}</td>
                        <td>{item.created_at.slice(0, 10)}</td>
                        <td>0</td>
                        <td>{item.date_of_birth}</td>
                        <td>
                          {item.is_active === false ? <Deleted /> : <Active />}
                        </td>
                        <td className="text-center">
                          <MoreVertIcon onClick={() => toggleDropdown(item.id)} style={{ cursor: "pointer" }}/>
                          {showDropdown === item.id && (
                            <ul className="drop-menu" ref={dropdownRef}>
                              {item.is_active ? (
                                <>
                                  <li onClick={() => navigate(`/Home/AllMembers/${item.id}/edit`,
                                        {state: { member: item },})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"/></svg>
                                    <span className="me-2"> تعديل البيانات </span>
                                  </li>
                                  {/* <Link to={`/Home/AllMembers/${item.id}/editPhoneNumber`} className="text-decoration-none">
                                  <li>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5"/></svg>
                                    <spna className="me-2">تعديل رقم الهاتف</spna>
                                    </li>
                                    </Link> */}
                                  <li>
                                    <DeleteMember
                                      id={item.id}
                                      onDelete={handleDeleteMember}
                                    />
                                  </li>
                                </>
                              ) : (
                                <MemberActivate
                                  id={item.id}
                                  onActive={handleActiveMember}
                                />
                              )}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <div className="preivous-btn">
                    <MainButton
                      text={"السابق"}
                      onClick={handlePrevPage}
                      disabled={page === 1}
                    />
                  </div>
                  <div>
                    <span className="ms-3 me-3">
                      الصفحة {totalPages} من {page}
                    </span>
                  </div>
                  <div className="next-btn">
                    <MainButton
                      text={"التالي"}
                      onClick={handleNextPage}
                      disabled={page >= totalPages}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default AllMembers;