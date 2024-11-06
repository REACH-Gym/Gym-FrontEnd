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
import {
  useEditMemberMembershipStartDateMutation,
  useFreezeMemberMembershipMutation,
  useUnFreezeMemberMembershipMutation,
} from "../../../features/api";
import FreezeBox from "../../FreezeBox/FreezeBox";
import Warning from "../../../Common Components/Warning/Warning";
import Error from "../../../Common Components/Error/Error";
import Success from "../../../Common Components/Success/Success";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function SubscripedMembers() {
  const access_token = localStorage.getItem("access");
  const [SubscripedMembers, setSubscripedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page] = useState(20);
  const [total_pages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const [filterType, setFilterType] = useState("user.name");
  const [showChangeDate, setShowChangeDate] = useState(false);
  const [showFreeze, setShowFreeze] = useState(false);
  const [warning, setWarning] = useState(false);
  const [editStartDate, { isLoading: isEditStartDateLoading }] =
    useEditMemberMembershipStartDateMutation();
  const [freeze, { isLoading: isFreezeLoading }] =
    useFreezeMemberMembershipMutation();
  const [unFreeze, { isLoading: isUnFreezeLoading }] =
    useUnFreezeMemberMembershipMutation();
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);

  const api = process.env.REACT_APP_DOMAIN;
  const [sendWhatsappMessage, setSendWhatsappMessage] = useState(false);
  const [failedSendWhatsappMessage, setFailedSendWhatsappMessage] =
    useState(false);
  const filter = (filter) => {
    setFilterType(filter);
  };

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);
  const term = useSelector((state) => state.search.term.term);

  const [id, setID] = useState(0);
  console.log(new Date().toISOString().split("T")[0] < "2024-11-09");

  const handleEdit = async (start_date) => {
    console.log(start_date, id);
    if (showFreeze) {
      try {
        const response = await freeze({
          id: id,
          data: { freezed_date: start_date },
        }).unwrap();
        console.log(response);
        setShowFreeze(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setSuccess(false);
        }, 2000);
      } catch (error) {
        if (
          error?.data?.error?.detail?.startsWith(
            "The period exceeds allowed freezing days."
          )
        ) {
          setShowFreeze(false);
          setError("المدة تخطت ايام التجميد المسموح بها، اختر تاريخاً أٌقرب");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (
          error?.data?.error?.detail?.startsWith(
            "You cannot update the start date"
          )
        ) {
          setShowFreeze(false);
          setError(
            "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 403) {
          setShowFreeze(false);
          setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setShowFreeze(false);
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setShowFreeze(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    } else if (showChangeDate) {
      try {
        const response = await editStartDate({
          id: id,
          data: { start_date: start_date },
        }).unwrap();
        console.log(response);
        setShowChangeDate(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setSuccess(false);
        }, 2000);
      } catch (error) {
        if (
          error?.data?.error?.detail?.startsWith(
            "The period exceeds allowed freezing days."
          )
        ) {
          setShowChangeDate(false);
          setError("المدة تخطت ايام التجميد المسموح بها، اختر تاريخاً أٌقرب");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (
          error.data.error.detail.startsWith("You cannot update the start date")
        ) {
          setShowChangeDate(false);
          setError(
            "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 403) {
          setShowChangeDate(false);
          setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setShowChangeDate(false);
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setShowChangeDate(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    } else if (warning) {
      try {
        const response = await unFreeze(id).unwrap();
        console.log(response);
        setWarning(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setSuccess(false);
        }, 2000);
      } catch (error) {
        if (
          error.data.error.detail.startsWith("You cannot update the start date")
        ) {
          setWarning(false);
          setError(
            "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 403) {
          setWarning(false);
          setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setWarning(false);
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setWarning(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    }
  };

  useEffect(() => {
    async function fetchSubscripedMember() {
      setLoading(true);
      try {
        const response = await fetch(
          `${api}/members/memberships/?page=${page}&per_page=${per_page}&filter{${filterType}.istartswith}=${
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
  }, [per_page, page, access_token, filterType, term, api]);
  const sendData = async (user_id) => {
    try {
      const response = await fetch(`${api}/whatsapp/send-details/`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("access"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ membership_id: user_id }),
      });
      if (response.ok) {
        setSendWhatsappMessage(true);
        setFailedSendWhatsappMessage(false);
      } else {
        setSendWhatsappMessage(false);
        setFailedSendWhatsappMessage(true);
      }
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
    <>
      {success && <Success text={"تمت العملية بنجاح"} show={success} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      {warning ? (
        <Warning
          text={"هل تريد إلغاء التجميد؟"}
          handleCancel={() => {
            setShowFreeze(false);
          }}
          handleConfirm={() => {
            handleEdit(date);
          }}
          isLoading={isUnFreezeLoading}
        />
      ) : null}
      {showChangeDate || showFreeze ? (
        <FreezeBox
          text={showChangeDate ? "تعديل تاريخ البداية" : "تجميد الإشتراك"}
          desc={"من فضلك قم بإدخال تاريخ البداية الجديد"}
          handleCancel={() => {
            showFreeze ? setShowFreeze(false) : setShowChangeDate(false);
          }}
          handleConfirm={() => {
            handleEdit(date);
          }}
          isLoading={
            isEditStartDateLoading || isFreezeLoading || isUnFreezeLoading
          }
          dateValue={setDate}
        />
      ) : null}
      <div className="allSubscripedMembersContainer mt-4">
        <Helmet>
          <title>الاعضاء المشتركين</title>
        </Helmet>
        (
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
          {loading ? (
            <div className="loader" style={{ backgroundColor: "#373636" }}>
              <Commet width="50px" height="50px" color="#316dcc" />
            </div>
          ) : SubscripedMembers.length > 0 ? (
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
                      اسم الإشتراك
                    </th>
                    <th scope="col" className="pb-4">
                      المدفوع
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
                      <>
                        <tr
                          style={{ fontSize: "14px" }}
                          key={SubscripedMember.id}
                        >
                          <td className="fw-bolder">
                            {index + 1 + (page - 1) * per_page}
                          </td>
                          <td>{SubscripedMember.user.name}</td>
                          <td>{SubscripedMember.membership.name}</td>
                          <td>{SubscripedMember.paid_money} ريال</td>
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
                                  onClick={() => sendData(SubscripedMember.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.2em"
                                    height="1.2em"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fill="white"
                                      d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144l-2.494.654l.666-2.433l-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931a6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646c-.182-.065-.315-.099-.445.099c-.133.197-.513.646-.627.775c-.114.133-.232.148-.43.05c-.197-.1-.836-.308-1.592-.985c-.59-.525-.985-1.175-1.103-1.372c-.114-.198-.011-.304.088-.403c.087-.088.197-.232.296-.346c.1-.114.133-.198.198-.33c.065-.134.034-.248-.015-.347c-.05-.099-.445-1.076-.612-1.47c-.16-.389-.323-.335-.445-.34c-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992c.47.205.84.326 1.129.418c.475.152.904.129 1.246.08c.38-.058 1.171-.48 1.338-.943c.164-.464.164-.86.114-.943c-.049-.084-.182-.133-.38-.232"
                                    />
                                  </svg>
                                  <span className="me-2">ارسال التفاصيل</span>
                                </li>
                                {SubscripedMember.status === "freezed" ? (
                                  <li
                                    className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                                    onClick={() => {
                                      setWarning(true);
                                      setID(SubscripedMember.id);
                                    }}
                                  >
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ alignSelf: "center" }}
                                    >
                                      <path
                                        d="M12 2.84952C17.0537 2.84952 21.1505 6.94634 21.1505 12C21.1505 17.0537 17.0537 21.1505 12 21.1505C6.94631 21.1505 2.84949 17.0537 2.84949 12C2.84949 6.94634 6.94631 2.84952 12 2.84952Z"
                                        stroke="white"
                                        stroke-width="1.69905"
                                        stroke-linecap="round"
                                      />
                                      <path
                                        d="M11.085 14.7452L9.25489 12.9151C8.74953 12.4097 8.74953 11.5903 9.25489 11.0849L11.085 9.25485C11.5904 8.74948 12.4097 8.74948 12.9151 9.25485L14.7452 11.0849C15.2506 11.5903 15.2506 12.4097 14.7452 12.9151L12.9151 14.7452C12.4097 15.2505 11.5904 15.2505 11.085 14.7452Z"
                                        stroke="white"
                                        stroke-width="1.69905"
                                        stroke-linecap="round"
                                      />
                                    </svg>

                                    <div className={`d-inline-block`}>
                                      إلغاء التجميد
                                    </div>
                                  </li>
                                ) : SubscripedMember.status === "active" ? (
                                  <li
                                    className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                                    onClick={() => {
                                      setShowFreeze(true);
                                      setID(SubscripedMember.id);
                                    }}
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ alignSelf: "center" }}
                                    >
                                      <path
                                        d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                                        fill="white"
                                      />
                                    </svg>

                                    <div className={`d-inline-block`}>
                                      تجميد
                                    </div>
                                  </li>
                                ) : null}
                                {SubscripedMember.status === "freezed" &&
                                  SubscripedMember.start_date >
                                    new Date().toISOString().split("T")[0] && (
                                    <li
                                      className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                                      onClick={() => {
                                        setShowChangeDate(true);
                                        setID(SubscripedMember.id);
                                      }}
                                    >
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ alignSelf: "center" }}
                                      >
                                        <path
                                          d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                                          fill="white"
                                        />
                                      </svg>

                                      <div className={`d-inline-block`}>
                                        تعديل تاريخ البداية
                                      </div>
                                    </li>
                                  )}
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
                                      fill="white"
                                      d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"
                                    />
                                  </svg>
                                  <span className="me-2">تفاصيل</span>
                                </li>
                              </ul>
                            )}
                          </td>
                        </tr>
                      </>
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
                  <span className="ms-3 me-3 text-light">
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
          ) : (
            <div
              className="fw-bolder error-message fs-4 d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              لا يوجد نتائج
            </div>
          )}
        </div>
        {/* modal*/}
        <SuccessModal
          isOpen={sendWhatsappMessage}
          handleClose={() => setSendWhatsappMessage(false)}
        >
          <p className="text-center fw-bolder mt-4 mb-4">
            تم ارسال التفاصيل عبر الواتساب الخاص بك بنجاح
          </p>
        </SuccessModal>
        <FailedModal
          isOpen={failedSendWhatsappMessage}
          handleClose={() => setFailedSendWhatsappMessage(false)}
        >
          <p className="text-center fw-bolder mt-4 mb-4">
            حدث خطأ ! فشل ارسال التفاصيل
          </p>
        </FailedModal>
      </div>
    </>
  );
}
export default SubscripedMembers;
