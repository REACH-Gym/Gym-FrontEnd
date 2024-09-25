import React, { useEffect, useState } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import { useNavigate } from "react-router-dom";
//import icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
function AllMembers() {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null); // Track the opened dropdown
  const access_token = localStorage.getItem("access");

  useEffect(() => {
    async function fetchAllMembers() {
      try {
        const data = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members?page_size=40`,
          {
            method: "GET",
            headers: {
              Authorization: access_token,
              accept: "application/json",
            },
          }
        );
        const response = await data.json();
        if (response && response.data) {
          setAllMembers(response.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    fetchAllMembers();
  }, []);

  const handleAddNewMember = () => {
    navigate("/Home/AddNewMember");
  };

  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null); // Close the dropdown if already open
    } else {
      setShowDropdown(id); // Open the dropdown for the clicked item
    }
  };

  return (
    <div className="allMembereContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={" جميع الأعضاء"}
          subTitle={"يمكنك متابعة جميع بيانات الأعضاء  من هنا"}
        />
        <Filter
          option1={"الأسم"}
          option2={"الجوال"}
          option3={"رقم العضوية"}
          // option4={"الحالة"}
        />
        <ComponentBtns
          btn1={"+ إضافة عضو جديد "}
          onclick={handleAddNewMember}
        />
      </div>
      <div className="tableContainer mt-2">
        <table className="table mt-3">
          <thead>
            <tr className="">
              <th scope="col" className="pb-4">
                #
              </th>
              <th scope="col" className="pb-4">
                الأسم
              </th>
              <th scope="col" className="pb-4">
                الجوال
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
              {/* <th scope="col" className="pb-4">
                الحالة
              </th> */}
              <th scope="col" className="pb-4">
                خيارات
              </th>
            </tr>
          </thead>
          <tbody>
            {allMembers.length > 0 ? (
              allMembers.map((member, index) => (
                <tr
                  style={{ fontSize: "14px", textAlign: "right" }}
                  key={member.id}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{member.name}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.national_id}</td>
                  <td>{member.created_at}</td>
                  <td className="text-center">{""}</td>
                  <td>{member.date_of_birth}</td>
                  {/* <td className="">
                    <p
                      className="rounded text-center p-2"
                      style={{
                        color: "#4AD991",
                        fontWeight: "bolder",
                        fontSize: "11px",
                        backgroundColor: "rgba(74, 217, 145,0.2",
                      }}
                    >
                      مؤكد
                    </p>
                  </td> */}
                  <td className="fs-5 fw-bolder text-center">
                    <MoreVertIcon
                      onClick={() => toggleDropdown(member.id)}
                      style={{ cursor: "pointer" }}
                    />
                    {showDropdown === member.id && (
                      <ul className="dropdown">
                        <li>
                          <WhatsAppIcon className="dropdown__icon" /> اعادة
                          ارسال{" "}
                        </li>
                        <li>
                          <SubscriptionsOutlinedIcon className="dropdown__icon" />{" "}
                          الأشتراكات
                        </li>
                        <li>
                          <ArticleOutlinedIcon className="dropdown__icon" />{" "}
                          السندات
                        </li>
                        <li>
                          <RestoreOutlinedIcon className="dropdown__icon" /> كشف
                          حساب
                        </li>
                        <li>
                          <SpeedIcon className="dropdown__icon" /> القياسات
                        </li>
                        <li>
                          <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />{" "}
                          تعديل
                        </li>
                        <li>
                          <DeleteOutlineOutlinedIcon className="dropdown__icon" />{" "}
                          حذف
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllMembers;
