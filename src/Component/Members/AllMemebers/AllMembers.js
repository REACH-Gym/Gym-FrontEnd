import React, { useEffect, useState } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";
import DeleteMember from "../DeleteMember/DeleteMember";
import MemberActivate from "../MemberActivate/MemberActivate";

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
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllMembers() {
      setLoading(true);
      setError(null);
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
        console.log("Response status:", response.status);
        const result = await response.json();
        console.log("Fetched result:", result);

        if (response.ok && result.status === "success") {
          if (result.data && result.data.users.length > 0) {
            setAllMembers(result.data.users);
            setTotalPages(result.data.meta.total_pages);
          } else {
            setError("لا يوجد أعضاء");
          }
        } else {
          setError(result.message || "حدث خطأ غير متوقع أثناء جلب الأعضاء.");
        }
      } catch (networkError) {
        setError("خطأ في الشبكة: فشل في جلب الأعضاء.");
        console.error("Network error:", networkError);
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

  return (
    <div className="allMembereContainer">
      {loading ? (
        <div className="loader">
          <Commet width="50px" height="50px" color="#316dcc" />
        </div>
      ) : error ? (
        <div className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center" style={{height:"50vh" }}>
          لا يوجد اعضاء
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
                        <tr
                          key={item.id}
                          className={
                            item.is_active ? "member-active" : "member-inactive"
                          }
                        >
                          <th
                            scope="row"
                            style={{
                              fontSize: "13px",
                              fontWeight: "lighter",
                            }}
                          >
                            {index + 1}
                          </th>
                          <td>{item.name}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.national_id}</td>
                          <td>{item.created_at.slice(0, 10)}</td>
                          <td>0</td>
                          <td>{item.date_of_birth}</td>
                          <td>{item.is_active === false ? "محذوف" : "فعال"}</td>
                          <td className="text-center">
                            <MoreVertIcon
                              onClick={() => toggleDropdown(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                            {showDropdown === item.id && (
                              <ul className="drop-menu">
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
                                      <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />
                                      تعديل
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
                        الأسم
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
                        الرصيد
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
                    {allMembers.map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          item.is_active ? "member-active" : "member-inactive"
                        }
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.national_id}</td>
                        <td>{item.created_at.slice(0, 10)}</td>
                        <td>0</td>
                        <td>{item.date_of_birth}</td>
                        <td>{item.is_active === false ? "محذوف" : "فعال"}</td>
                        <td className="text-center">
                          <MoreVertIcon
                            onClick={() => toggleDropdown(item.id)}
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === item.id && (
                            <ul className="drop-menu">
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
                                    <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />
                                    تعديل
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
                {/* <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="btn btn-primary"
                  >
                    السابق
                  </button>
                  <span className="page-number">{`صفحة ${page} من ${totalPages}`}</span>
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="btn btn-primary"
                  >
                    التالي
                  </button>
                </div> */}
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
                      الصفحة {totalPages} من {page}
                    </span>
                  </div>
                  <div className="next-btn">
                    <MainButton
                      text={"<<"}
                      onClick={handleNextPage}
                      disabled={page >= totalPages}
                    />
                  </div>
                </div>
              </div>

              // </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllMembers;
