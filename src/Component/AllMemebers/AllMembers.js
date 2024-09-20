import React, { useEffect, useState } from "react";
import "./AllMembers.css";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
function AllMembers() {
  const [allMembers, setAllMembers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pageSize, setPageSize] = useState(20);
  const access_token = localStorage.getItem('access');

  useEffect(() => {
    async function fetchAllMembers() {
      try {
        const data = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members?page_size=40`,
          {
            method: "GET",
            headers: {
              Authorization:access_token,
              accept: "application/json",
            },
          }
        );
        const response = await data.json();
        console.log("API Response:", response);

        if (response && response.data) {
          setAllMembers(response.data);
         // setPageSize(response.page_size || 20); // Set page size dynamically if available, default to 20
          //setTotalPages(response.total_pages || 1); // Update total pages
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    fetchAllMembers();
  }, []);

  // Handle page navigation
  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

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
          option4={"الحالة"}
        />
        <ComponentBtns btn1={"+ إضافة عضو جديد "} />
      </div>
      <div>
        <table className="table mt-3">
          <thead>
            <tr className="text-right">
              <th scope="col">#</th>
              <th scope="col">الأسم</th>
              <th scope="col">الجوال</th>
              <th scope="col">رقم العضوية</th>
              <th scope="col">تاريخ التسجيل</th>
              <th scope="col">الرصيد</th>
              <th scope="col">تاريخ الميلاد</th>
              {/* <th scope="col">ملاحظات</th> */}
              <th scope="col">الحالة</th>
              <th scope="col">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {allMembers.length > 0 ? ( //if condittion true
              allMembers.map((member, index) => (
                <tr style={{ fontSize: "14px" , textAlign:"right" }} key={member.id}>
                  <th scope="row">
                    { index + 1}
                  </th>
                  <td>{member.name}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.national_id}</td>
                  <td>{member.created_at}</td>
                  <td className="text-center">{""}</td>
                  <td>{member.date_of_birth}</td>
                  {/* <td>{""}</td> */}
                  <td className="">
                    {/* <p
                      className="rounded text-center p-2"
                      style={{
                        color: "#4AD991",
                        fontWeight: "bolder",
                        backgroundColor: "rgba(74, 217, 145,0.2",
                      }}
                    >
                      مؤكد
                    </p> */}
                  </td>
                  <td className="fs-5 fw-bolder text-center">:</td>
                </tr>
              ))
            ) : (
              //if condition false
              <tr>
                <td colSpan="9" className="text-center">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {/* <div className="pagination-controls mt-5">
          <button
            className="previousBtn text-light"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>
          <span className="ms-4 me-4 text-dark">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="nextBtn text-light"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default AllMembers;
