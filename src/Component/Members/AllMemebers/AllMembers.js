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
import * as XLSX from "xlsx";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Image,
  Font,
} from "@react-pdf/renderer";
import {
  useLazyGetAllMembersQuery,
  useLazyGetContractQuery,
} from "../../../features/api";

const baseUrl = process.env.REACT_APP_DOMAIN;

Font.register({
  family: "MarkaziText",
  fonts: [
    {
      src: "/assets/fonts/MarkaziText-Regular.ttf",
      fontWeight: "regular",
    },
    {
      src: "/assets/fonts/MarkaziText-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
const style = StyleSheet.create({
  page: {
    minWidth: "210mm", // Set width for receipt printer paper
    minHeight: "297mm", // Set width for receipt printer paper
    padding: "15 10",
    fontFamily: "MarkaziText",
    fontSize: 14,
    textAlign: "right", // Align text to the right for RTL
    direction: "rtl", // Set text direction to RTL
  },
  section: {
    margin: 5,
    padding: 5,
  },
  title: {
    textAlign: "right",
    marginTop: 20,
    marginBottom: 4,
    fontWeight: "bold",
    textDecoration: "underline",
    padding: "2px 0",
  },
  memberInformation: {
    textAlign: "right",
    display: "flex",
    direction: "rtl",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  memberInfo: {
    width: "50%",
  },
  memberInfoS: {
    width: "100%",
    marginLeft: "auto",
  },
  memberImage: {
    maxWidth: 100,
    maxHeight: 100,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  line: {
    marginRight: 5,
  },
});
const ReceiptDocument = ({
  title,
  introduction,
  terms_and_conditions,
  member_rights,
  member_duties,
  payment_terms,
  package_prices,
  arriving_at_the_club,
  classes_and_dates,
  which_prohibits_the_member,
  cancel_membership,
  communication_mechanisms,
  member,
}) => {
  const now = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const readableDate = now.toLocaleString("en-US", options);

  return (
    <Document>
      <Page size="A4" style={style.page}>
        <View style={style.section} wrap>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            اتفاقية ولائحة عضوية نادي
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
          {introduction.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>أولاً: الأحكام والشروط:</Text>
          {terms_and_conditions.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثانياً: حقوق الأعضاء:</Text>
          {member_rights.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثالثاً: واجبات الأعضاء:</Text>
          {member_duties.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>رابعاً: شروط الدفع:</Text>
          {payment_terms.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>
            خامساً: اسعار الباقات المدرجة على برامج العضوية:
          </Text>
          {package_prices.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>سادساً: الوصول الى النادي:</Text>
          {arriving_at_the_club.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>سابعاً: الحصص والمواعيد:</Text>
          {classes_and_dates.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثامناً: يحظر على العضو:</Text>
          {which_prohibits_the_member.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>تاسعاً: إلغاء العضوية:</Text>
          {cancel_membership.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>عاشراً: آليات التواصل:</Text>
          {communication_mechanisms.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
        </View>
      </Page>
      <Page size="A4" style={style.page}>
        <Text
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            marginTop: 20,
            fontSize: 15,
          }}
        >
          بيانات المشترك
        </Text>
        <View style={style.memberInformation}>
          <Text style={style.memberInfo}>
            رقم الجوال: {member.phone_number}
          </Text>
          <Text style={style.memberInfo}>الإسم: {member.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:الصورة الشخصية</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member.profile_image
                  ? member.profile_image
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
              marginLeft: "auto",
            }}
          >
            <Text style={style.memberInfo}>:صورة البطاقة الشخصية</Text>
            <Image
              style={style.memberImage}
              src={
                member.personal_card_image
                  ? member.personal_card_image
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <Text style={style.memberInfoS}>
            رقم الهوية: {member.national_id}
          </Text>
        </View>
        <Text
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            marginTop: 20,
            fontSize: 15,
          }}
        >
          التوقيعات
        </Text>
        <View style={style.memberInformation}>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:توقيع العضو</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member.memberSignature
                  ? member.memberSignature
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:توقيع إدارة النادي</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member.gymSignature
                  ? `${baseUrl}${member.gymSignature}`
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <Text style={style.memberInfoS}>التاريخ: {readableDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

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
          `${api}/members/?page=${page}&per_page=${per_page}&filter{is_verified}=true&filter{${filterType}.istartswith}=${
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

  const exportToExcel = (data, fileName) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert your data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExcelSheet = () => {
    exportToExcel(allMembers, "Members");
  };

  const [getContract] = useLazyGetContractQuery();
  const [getMemberData] = useLazyGetAllMembersQuery();
  const handleContract = async (id) => {
    try {
      const cResponse = await getContract("").unwrap();
      console.log(cResponse);
      const mResponse = await getMemberData(`/${id}`).unwrap();
      const member = {
        name: mResponse.data.user.name,
        phone_number: mResponse.data.user.phone_number,
        national_id: mResponse.data.user.national_id,
        profile_image: mResponse.data.user.profile_image,
        personal_card_image: mResponse.data.user.personal_card_image,
        gymSignature: cResponse.data.signature_image,
        memberSignature: mResponse.data.user.electronic_signature_image,
      };
      const doc = (
        <ReceiptDocument
          title={cResponse.data.title}
          introduction={cResponse.data.introduction}
          terms_and_conditions={cResponse.data.terms_and_conditions}
          member_rights={cResponse.data.member_rights}
          member_duties={cResponse.data.member_duties}
          payment_terms={cResponse.data.payment_terms}
          package_prices={cResponse.data.package_prices}
          arriving_at_the_club={cResponse.data.arriving_at_the_club}
          classes_and_dates={cResponse.data.classes_and_dates}
          which_prohibits_the_member={cResponse.data.which_prohibits_the_member}
          cancel_membership={cResponse.data.cancel_membership}
          communication_mechanisms={cResponse.data.communication_mechanisms}
          member={member}
        />
      );
      const blob = await pdf(doc).toBlob();
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    } catch (error) {
      setError("حدث خطأ في طباعة العقد!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

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
            <ComponentBtns onclick={handleExcelSheet} disabled={false} />
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
                        <td className="text-center position-relative">
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
                      <td className="text-center position-relative">
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
                                <li
                                  onClick={() => {
                                    handleContract(item.id);
                                  }}
                                >
                                  <img
                                    src="/assets/image/contractW.png"
                                    alt="contract"
                                    width={18}
                                  />
                                  <span className="me-2">عقد الإتفاقية </span>
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
