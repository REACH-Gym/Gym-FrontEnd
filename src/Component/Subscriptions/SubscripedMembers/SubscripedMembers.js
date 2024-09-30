import React, { useEffect, useState } from "react";
import "./SubscripedMembers.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
function SubscripedMembers() {
  const access_token = localStorage.getItem("access");
  const [SubscripedMembers, setSubscripedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [total_pages, setTotalPages] = useState(1);
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
          console.log(result);
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
            <ComponentBtns btn1={"+ إضافة اشتراك جديد "} />
          </div>
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
                    بواسطة
                  </th>
                  <th scope="col" className="pb-4">
                    خيارات
                  </th>
                </tr>
              </thead>
              <tbody>
                {SubscripedMembers.map((SubscripedMember, index) => (
                  <tr style={{ fontSize: "14px" }} key={SubscripedMember.id}>
                    <td>{index + 1}</td>
                    <td>{SubscripedMember.user.name}</td>
                    <td>{SubscripedMember.user.national_id}</td>
                    <td>{SubscripedMember.membership.price}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{SubscripedMember.user.created_at}</td>
                    <td>{}</td>
                    <td className="fw-bolder text-center fs-5">
                      <MoreVertIcon
                        onClick={() => handleShowDropMenu(SubscripedMember.id)}
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
                            <LocalPrintshopOutlinedIcon /> طباعة
                          </li>
                          <li>
                            <DeleteOutlineOutlinedIcon /> حذف
                          </li>
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
