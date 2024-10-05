import React, { useEffect, useState } from "react";
import "./SubscripedMembers.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import DeleteSubscripedMember from "./DeleteSubscripedMember";
import Filter from "../../../Common Components/Filter/Filter";

function SubscripedMembers() {
  const access_token = localStorage.getItem("access");
  const [SubscripedMembers, setSubscripedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [total_pages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubscripedMember() {
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
      }
    }
    fetchSubscripedMember();
  }, [per_page, page, access_token]);

  const handleShowDropMenu = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
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

  const handleDelete = (id) => {
    setSubscripedMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const getStatusArabicAndClass = (status) => {
    switch (status) {
      case "active":
        return { text: "فعال", className: "status-active" };
      case "almost over":
        return { text: "أوشكت علي الأنتهاء", className: "status-almostOver" };
      case "expired":
        return { text: "منتهي", className: "status-expired" };
      case "freezed":
        return { text: "متجمد", className: "status-freezed" };
      default:
        return { text: "غير معروف", className: "status-unknown" };
    }
  };

  return (
    <div className="allSubscriptionContainer mt-4">
      {SubscripedMembers.length > 0 ? (
        <div className="allSubscriptionContainer__item">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/subscriptions.png"}
              title={"جميع الاعضاء المشتركين"}
              subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
            />
            <Filter searchResults={setResults}  options={['فعال','متجمد','أوشك علي الانتهاء','منتهي']} status={false} query={'members/memberships/'}/>
            <ComponentBtns btn1={"+ إضافة اشتراك جديد "} />
          </div>
          {results?.data?.user_memberships?.length > 0 ? (
            <div
              className="p-3"
              style={{
                margin: "10px 0 0 0 10px",
                borderRadius: "10px",
                backgroundColor: "white",
                bottom: 0,
                left: 0,
              }}
            >
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
                        <td className="fw-bolder text-center fs-5">
                          <MoreVertIcon
                            onClick={() => handleShowDropMenu(item.id)}
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === item.id && (
                            <ul className="drop-menu">
                              <li>
                                <WhatsAppIcon /> اعادة ارسال
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/SubscripedMembers/${item.id}/`
                                  )
                                }
                              >
                                <InfoOutlinedIcon /> تفاصيل
                              </li>
                              <li>
                                <DriveFileRenameOutlineOutlinedIcon /> تعديل
                              </li>
                              <li></li>
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
                    <th scope="col" className="pb-4">
                      المتبقي
                    </th>
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
                    const { text, className } = getStatusArabicAndClass(
                      SubscripedMember.status
                    );
                    return (
                      <tr
                        style={{ fontSize: "14px" }}
                        key={SubscripedMember.id}
                      >
                        <td>{index + 1 + (page - 1) * per_page}</td>
                        <td>{SubscripedMember.user.name}</td>
                        <td>{SubscripedMember.user.national_id}</td>
                        <td>{SubscripedMember.membership.price}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>{SubscripedMember.start_date}</td>
                        <td className={className}>{text}</td>
                        <td className="text-center">
                          <MoreVertIcon
                            onClick={() =>
                              handleShowDropMenu(SubscripedMember.id)
                            }
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === SubscripedMember.id && (
                            <ul className="drop-menu">
                              <li>
                                <WhatsAppIcon /> اعادة ارسال
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/SubscripedMembers/${SubscripedMember.id}/`
                                  )
                                }
                              >
                                <InfoOutlinedIcon /> تفاصيل
                              </li>
                              <li>
                                <DriveFileRenameOutlineOutlinedIcon /> تعديل
                              </li>
                              <li>
                                <DeleteSubscripedMember
                                  member={SubscripedMember}
                                  onDelete={handleDelete}
                                />
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
                <div className="ms-3 me-3">
                  <span className="">
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
      ) : (
        <div className="loader">
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
}

export default SubscripedMembers;
