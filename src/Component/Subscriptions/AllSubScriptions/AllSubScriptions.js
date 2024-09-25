import React, { useEffect, useState } from "react";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useNavigate } from "react-router-dom";
function AllSubScriptions() {
  const [allSubscription, setAllSubscriptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const access_token = localStorage.getItem("access");

  useEffect(() => {
    async function fetchAllSubscriptionS() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/memberships",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const data = await response.json();
        setAllSubscriptions(data.data.memberships);
        console.log(data);
      } catch (error) {
        console.error("an error ocurred");
      }
    }
    fetchAllSubscriptionS();
  }, []);
  const navigate = useNavigate();
  const handleShowDropMenu = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };
  return (
    <div className="allSubscriptionContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3 mt-3">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"جميع الاشتراكات"}
          subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
        />
        <Filter
          option1={"جميع الأشتراكات"}
          option2={"الأشتراكات الفعالة"}
          option3={"أوشكت علي الأنتهاء"}
          option4={"الأشتراكات المنتهية"}
          onClickOption1={() => navigate("/Home/AllSubScriptions")}
          onClickOption2={() => navigate("/Home/ActiveSubScription")}
          onClickOption3={() => navigate("/Home/AlmostFinished")}
          onClickOption4={() => navigate("/Home/ExpiredSubscriptions")}
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
            {allSubscription.length > 0 ? (
              allSubscription.map((subscription, index) => (
                <tr
                  style={{ fontSize: "14px", textAlign: "right" }}
                  key={subscription.id}
                >
                  <td>{index + 1}</td>
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
                      <ul className="dropdown">
                        <li><WhatsAppIcon className="dropdown__icon" /> اعادة ارسال</li>
                        {/* <li onClick={()=>navigate('/Home/SubscriptionDetail')}><InfoOutlinedIcon className="dropdown__icon" /> تفاصيل</li> */}
                        <li><DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" /> تعديل</li>
                        <li><LocalPrintshopOutlinedIcon className="dropdown__icon" /> طباعة</li>
                        <li><DeleteOutlineOutlinedIcon className="dropdown__icon" /> حذف</li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllSubScriptions;
//pagination
//filters --> Done
//search
//خيارات
//delete, update, details
