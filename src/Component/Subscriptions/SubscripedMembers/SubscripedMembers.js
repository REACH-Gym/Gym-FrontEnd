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
import { useDispatch, useSelector } from "react-redux";
import { clear, searchR } from "../../../features/searchSlice";
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
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const [filterType, setFilterType] = useState("user.name");
  const filter = (filter) => {
    setFilterType(filter);
  };

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);
  const term = useSelector((state) => state.search.term.term);

  useEffect(() => {
    async function fetchSubscripedMember() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members/memberships/?page=${page}&per_page=${per_page}&filter{${filterType}.istartswith}=${
            term ? term : ""
          }`,
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
          console.log(result.data.user_memberships);
          setTotalPages(result.data.meta.total_pages);
        } else if (response.status === 403) {
          setError("ليس لديك صلاحية لعرض هذه المعلومات");
        } else if (response.status === 401) {
          setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscripedMember();
  }, [per_page, page, access_token, filterType, term]);
  const sendData = async (user_id) => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/whatsapp/send-details/`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("access"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ membership_id: user_id }),
        }
      );
      console.log(response);
    } catch (error) {}
  };
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
        <title>الاعضاء المشتركين</title>
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
            <Filter
              filter={true}
              isDisabled={isDisabled}
              placeHolder={placeHolder}
              handleClear={() => {
                dispatch(searchR({ term: "" }));
                filter("user.name");
                setIsDisabled(false);
                setPlaceHolder("ابحث هنا...");
              }}
            >
              <div className={`p-2 rounded-2 bg-white`}>
                <div
                  className={`p-2 filter rounded-2`}
                  onClick={() => {
                    dispatch(searchR({ term: "" }));
                    filter("user.name");
                    setIsDisabled(false);
                    setPlaceHolder("ابحث هنا...");
                  }}
                >
                  اسم العضو
                </div>
                <div
                  className={`p-2 filter rounded-2`}
                  onClick={() => {
                    dispatch(searchR({ term: "" }));
                    filter("user.national_id");
                    setIsDisabled(false);
                    setPlaceHolder("ابحث هنا...");
                  }}
                >
                  رقم العضوية
                </div>
                <div className={`p-2 rounded-2`}>
                  <div>الحالة</div>
                  <div className={`pe-3`}>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: "active" }));
                        filter("status");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ الحالة");
                      }}
                    >
                      فعال
                    </div>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: "freezed" }));
                        filter("status");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ الحالة");
                      }}
                    >
                      متجمد
                    </div>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: "almost over" }));
                        filter("status");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ الحالة");
                      }}
                    >
                      قارب على الإنتهاء
                    </div>
                    <div
                      className={`p-2 rounded-2 filter`}
                      onClick={() => {
                        dispatch(searchR({ term: "expired" }));
                        filter("status");
                        setIsDisabled(true);
                        setPlaceHolder("انت الآن تبحث بـ الحالة");
                      }}
                    >
                      منتهي
                    </div>
                  </div>
                </div>
              </div>
            </Filter>
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
                      <th scope="col" className="pb-4">
                        #
                      </th>
                      <th scope="col" className="pb-4">
                        اسم العضو
                      </th>
                      <th scope="col" className="pb-4">
                        رقم العضوية
                      </th>
                      <th scope="col" className="pb-4">
                        الإجمالي
                      </th>
                      <th scope="col" className="pb-4">
                        المدفوع
                      </th>
                      <th scope="col" className="pb-4">
                        المتبقي
                      </th>
                      <th scope="col" className="pb-4">
                        الخصم
                      </th>
                      <th scope="col" className="pb-4">
                        تاريخ الاشتراك
                      </th>
                      <th scope="col" className="pb-4 text-center">
                        الحالة
                      </th>
                      <th scope="col" className="pb-4 text-center">
                        خيارات
                      </th>
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
                        <td className={""}>
                          {item.status === "active" ? <Active /> : null}
                          {item.status === "freezed" ? <Freezed /> : null}
                          {item.status === "almost over" ? (
                            <AlmostOver />
                          ) : null}
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2em"
                                  height="1.2em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"
                                  />
                                </svg>
                                <span className="me-2">تفاصيل</span>
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
                    <th scope="col" className="pb-4">
                      #
                    </th>
                    <th scope="col" className="pb-4">
                      اسم العضو
                    </th>
                    <th scope="col" className="pb-4">
                      رقم العضوية
                    </th>
                    <th scope="col" className="pb-4">
                      الإجمالي
                    </th>
                    <th scope="col" className="pb-4">
                      المدفوع
                    </th>
                    {/* <th scope="col" className="pb-4">المتبقي</th> */}
                    <th scope="col" className="pb-4">
                      الخصم
                    </th>
                    <th scope="col" className="pb-4">
                      تاريخ الاشتراك
                    </th>
                    <th scope="col" className="pb-4">
                      الحالة
                    </th>
                    <th scope="col" className="pb-4 text-center">
                      خيارات
                    </th>
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
                        {/* <td>0</td> */}
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
                              <li onClick={() => sendData(SubscripedMember.id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2em"
                                  height="1.2em"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144l-2.494.654l.666-2.433l-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931a6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646c-.182-.065-.315-.099-.445.099c-.133.197-.513.646-.627.775c-.114.133-.232.148-.43.05c-.197-.1-.836-.308-1.592-.985c-.59-.525-.985-1.175-1.103-1.372c-.114-.198-.011-.304.088-.403c.087-.088.197-.232.296-.346c.1-.114.133-.198.198-.33c.065-.134.034-.248-.015-.347c-.05-.099-.445-1.076-.612-1.47c-.16-.389-.323-.335-.445-.34c-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992c.47.205.84.326 1.129.418c.475.152.904.129 1.246.08c.38-.058 1.171-.48 1.338-.943c.164-.464.164-.86.114-.943c-.049-.084-.182-.133-.38-.232"
                                  />
                                </svg>
                                <span className="me-2">ارسال التفاصيل</span>
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/SubscripedMembers/${SubscripedMember.id}/`
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
                                    fill="currentColor"
                                    d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"
                                  />
                                </svg>
                                <span className="me-2">تفاصيل</span>
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
                    text={"السابق"}
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
                    text={"التالي"}
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
