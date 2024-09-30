import React, { useEffect, useState } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";

function AllMembers() {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [per_page] = useState(10);
  const access_token = localStorage.getItem("access");
  const [results , setResults] = useState([]);
console.log(results)
  useEffect(() => {
    async function fetchAllMembers() {
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
        const result = await response.json();
        console.log(result)
        if (response.ok) {
          setAllMembers(result.data.users);
          setTotalPages(result.data.meta.total_pages)

        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
    fetchAllMembers();
  }, [access_token, page, per_page]);

  const handleAddNewMember = () => {
    navigate("/Home/AddNewMember");
  };

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

  return (
    <div className="allMembereContainer">
      {allMembers.length > 0 ? (
        <div className="allMembereContainer__items">
          <div>
            <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
              <ComponentTitle
                MainIcon={"/assets/image/Vector.png"}
                title={" جميع الأعضاء"}
                subTitle={"يمكنك متابعة جميع بيانات الأعضاء  من هنا"}
              />
              <ComponentBtns
                btn1={"+ إضافة عضو جديد "}
                onclick={handleAddNewMember}
              />
              <Filter options={['الاسم','رقم الجوال','رقم العضوية']}
              query={'members/'}
              searchResults={setResults}
              status={false}/>
              
            </div>
            <div className="tableContainer mt-2">
              <table className="table mt-3">
                <thead>
                  <tr className="">
                    <th scope="col" className="pb-4">#</th>
                    <th scope="col" className="pb-4">الأسم</th>
                    <th scope="col" className="pb-4">الجوال</th>
                    <th scope="col" className="pb-4">رقم العضوية</th>
                    <th scope="col" className="pb-4">تاريخ التسجيل</th>
                    <th scope="col" className="pb-4">الرصيد</th>
                    <th scope="col" className="pb-4">تاريخ الميلاد</th>
                    <th scope="col" className="pb-4">خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {allMembers.map((member, index) => (
                    <tr key={member.id} style={{ fontSize: "14px", textAlign: "right" }}>
                      <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                      <td>{member.name}</td>
                      <td>{member.phone_number}</td>
                      <td>{member.national_id}</td>
                      <td>{member.created_at.slice(0,10)}</td>
                      <td>{0}</td>
                      <td>{member.date_of_birth}</td>
                      <td className="fs-5 fw-bolder text-center">
                        <MoreVertIcon onClick={() => toggleDropdown(member.id)} style={{ cursor: "pointer" }} />
                        {showDropdown === member.id && (
                          <ul className="drop-menu">
                            <li><WhatsAppIcon className="dropdown__icon" /> اعادة ارسال</li>
                            <li><SubscriptionsOutlinedIcon className="dropdown__icon" /> الأشتراكات</li>
                            <li><ArticleOutlinedIcon className="dropdown__icon" /> السندات</li>
                            <li><RestoreOutlinedIcon className="dropdown__icon" /> كشف حساب</li>
                            <li><SpeedIcon className="dropdown__icon" /> القياسات</li>
                            <li onClick={() => navigate(`/Home/EditMember/${member.id}/`)}><DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" /> تعديل</li>
                            <li><DeleteOutlineOutlinedIcon className="dropdown__icon" /> حذف</li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="preivous-btn">
                  <MainButton
                    text={">>"}
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  />
                </div>
                <div className="ms-3 me-3">
                  <span>
                    الصفحة {totalPages} من {page}
                  </span>
                </div>
                <div className="next-btn">
                  <MainButton
                    text={"<<"}
                    disabled={page >= totalPages}
                    onClick={handleNextPage}
                  />
                </div>
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
export default AllMembers;