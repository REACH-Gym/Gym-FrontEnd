import React, { useEffect, useState, useRef } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";
import DeleteMember from "../DeleteMember/DeleteMember";
import MemberActivate from "../MemberActivate/MemberActivate";
import { Active, Deleted } from "../../Status/Status";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { clear, searchR } from "../../../features/searchSlice";

function AllMembers() {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [per_page] = useState(20);
  const access_token = localStorage.getItem("access");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const term = useSelector((state) => state.search.term.term);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("name");
  const filter = (filter) => {
    setFilterType(filter);
  };
  useEffect(() => {
    async function fetchAllMembers() {
      setLoading(true);
      try {
        const response = await fetch(
          `${api}/members/?page=${page}&per_page=${per_page}&filter{${filterType}.istartswith}=${
            term ? term : ""
          }`,
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
        } else if (response.status === 403) {
          console.log("permission");
          setError("ليس لديك صلاحية لعرض هذه المعلومات");
        } else if (response.status === 401) {
          setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
        }
      } catch (error) {
        console.error("error Occurred:", error);
        setError("حدث خطأ ما يرجي المحاولة لاحقا");
      } finally {
        setLoading(false);
      }
    }
    fetchAllMembers();
  }, [access_token, api, filterType, page, per_page, term]);

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

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
        <title>جميع الأعضاء</title>
      </Helmet>
      <div className="allMembereContainer__items">
        <div>
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/Vector.png"}
              title={" جميع الأعضاء"}
              subTitle={"يمكنك متابعة جميع بيانات الأعضاء  من هنا"}
            />
            <Filter
              filter={true}
              isDisabled={isDisabled}
              placeHolder={placeHolder}
              handleClear={() => {
                dispatch(searchR({ term: "" }));
                filter("name");
                setIsDisabled(false);
                setPlaceHolder("ابحث هنا...");
              }}
            >
              <div className={`p-2 rounded-2 bg-white`}>
                <div
                  className={`p-2 filter rounded-2`}
                  onClick={() => {
                    dispatch(searchR({ term: "" }));
                    filter("name");
                    setIsDisabled(false);
                    setPlaceHolder("ابحث هنا...");
                  }}
                >
                  الإسم
                </div>
                <div
                  className={`p-2 filter rounded-2`}
                  onClick={() => {
                    dispatch(searchR({ term: "" }));
                    filter("phone_number");
                    setIsDisabled(false);
                    setPlaceHolder("ابحث هنا...");
                  }}
                >
                  رقم الجوال
                </div>
                <div
                  className={`p-2 filter rounded-2`}
                  onClick={() => {
                    dispatch(searchR({ term: "" }));
                    filter("national_id");
                    setIsDisabled(false);
                    setPlaceHolder("ابحث هنا...");
                  }}
                >
                  رقم العضوية
                </div>
                <div className={`p-2 rounded-2`}>
                  <div>حالة العضو</div>
                  <div className={`pe-3`}>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: true }));
                        filter("is_active");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ الحالة");
                      }}
                    >
                      فعال
                    </div>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: false }));
                        filter("is_active");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ حالة العضو");
                      }}
                    >
                      محذوف
                    </div>
                  </div>
                </div>
              </div>
            </Filter>
            <ComponentBtns />
          </div>
          {loading ? (
            <div
              className="loader"
              style={{ height: "200vh", backgroundColor: "#373636" }}
            >
              <Commet width="50px" height="50px" color="#316dcc" />
            </div>
          ) : error ? (
            <div style={{ paddingTop: "200px" }}>
              <h4 className="error-message text-center fw-bolder">{error}</h4>
            </div>
          ) : allMembers.length === 0 ? (
            <div
              className="noResults fw-bolder text-light fs-4 d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              لا يوجد نتائج
            </div>
          ) : results?.data?.users?.length === 0 ? (
            <div
              className="noResults d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
              style={{ color: "#fff", height: "100vh" }}
            >
              لا يوجد نتائج
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
                        <td>{item.date_of_birth}</td>
                        <td>
                          {item.is_active === false ? <Deleted /> : <Active />}
                        </td>
                        <td>
                          {item.is_active === false ? <Deleted /> : <Active />}
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
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1.2em"
                                      height="1.2em"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="white"
                                        d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
                                      />
                                      <path
                                        fill="white"
                                        d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
                                      />
                                    </svg>
                                    <span className="me-2">تعديل البيانات</span>
                                  </li>
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
                    <th scope="col" className="pb-4">
                      #
                    </th>
                    <th scope="col" className="pb-4">
                      الإسم
                    </th>
                    <th scope="col" className="pb-4">
                      رقم الجوال
                    </th>
                    <th scope="col" className="pb-4">
                      رقم العضوية
                    </th>
                    <th scope="col" className="pb-4">
                      تاريخ التسجيل
                    </th>
                    <th scope="col" className="pb-4">
                      تاريخ الميلاد
                    </th>
                    <th scope="col" className="pb-4">
                      حالة العضو
                    </th>
                    <th scope="col" className="pb-4">
                      خيارات
                    </th>
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
                      <td>{item.date_of_birth}</td>
                      <td>
                        {item.is_active === false ? <Deleted /> : <Active />}
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
                                      { state: { member: item } }
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.2em"
                                    height="1.2em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="white"
                                      d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
                                    />
                                    <path
                                      fill="white"
                                      d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
                                    />
                                  </svg>
                                  <span className="me-2"> تعديل البيانات </span>
                                </li>
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
                <div className="preivous-btn text-light">
                  <MainButton
                    text={"السابق"}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  />
                </div>
                <div>
                  <span className="ms-3 me-3 text-light">
                    الصفحة {totalPages} من {page}
                  </span>
                </div>
                <div className="next-btn text-light">
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
    </div>
  );
}
export default AllMembers;
