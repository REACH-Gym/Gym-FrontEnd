import React, { useEffect, useState } from "react";
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
function AllSubScriptions() {
  const [allSubscription, setAllSubscriptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const access_token = localStorage.getItem("access");
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    async function fetchAllSubscriptionS() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/memberships/?page=${page}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setAllSubscriptions(result.data.memberships);
          setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error("an error ocurred");
      }
    }
    fetchAllSubscriptionS();
  }, [access_token, page, per_page]);
  const navigate = useNavigate();
  const handleShowDropMenu = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className="allSubscriptionContainer">
      {allSubscription.length > 0 ? (
        <div className="allSubscriptionContainer__item">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3 mt-3">
            <ComponentTitle
              MainIcon={"/assets/image/subscriptions.png"}
              title={"جميع الاشتراكات"}
              subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
            />
            <ComponentBtns
              btn1={"+ إضافة اشتراك جديد "}
              onclick={() => navigate("/Home/AddNewSubscription")}
            />
          </div>
          <div className="tableContainer mt-2">
            <table className="table mt-3">
              <thead>
                <tr className="text-right">
                  <th scope="col">#</th>
                  <th scope="col">اسم الأشتراك</th>
                  <th scope="col">السعر</th>
                  <th scope="col">المدة</th>
                  <th scope="col">أقصي فترة تجميد</th>
                  <th scope="col">ملاحظات</th>
                  <th scope="col" className="text-center">
                    خيارات
                  </th>
                </tr>
              </thead>
              <tbody>
                {allSubscription.map((subscription, index) => (
                  <tr
                    style={{ fontSize: "14px", textAlign: "right" }}
                    key={subscription.id}
                  >
                    {/* <td>{index + 1}</td> */}
                    <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                    <td>{subscription.name}</td>
                    <td>{subscription.price}</td>
                    <td>{subscription.duration}</td>
                    <td>{subscription.freeze_duration}</td>
                    <td>{subscription.description}</td>
                    <td className="fw-bolder text-center fs-5">
                      <MoreVertIcon
                        onClick={() => handleShowDropMenu(subscription.id)}
                        style={{ cursor: "pointer" }}
                      />
                      {showDropdown === subscription.id && (
                        <ul className="">
                          <li>
                            <WhatsAppIcon className="dropdown__icon" /> اعادة
                            ارسال
                          </li>{" "}
                          <li
                            onClick={() => navigate("/Home/SubscriptionDetail")}
                          >
                            <InfoOutlinedIcon className="dropdown__icon" />{" "}
                            تفاصيل
                          </li>{" "}
                          <li>
                            <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />{" "}
                            تعديل
                          </li>
                          <li>
                            <LocalPrintshopOutlinedIcon className="dropdown__icon" />{" "}
                            طباعة
                          </li>
                          <li>
                            <DeleteOutlineOutlinedIcon className="dropdown__icon" />{" "}
                            حذف
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
              <div>
                <span className="ms-3 me-3">
                   الصفحة {totalPages} من {page} 
                </span>
              </div>
              <div
                className="next-btn"
              >
                <MainButton text={"<<"} onClick={handleNextPage}
                disabled={page >= totalPages} />
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
export default AllSubScriptions;