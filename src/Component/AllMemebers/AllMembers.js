import React, { useEffect } from "react";
import "./AllMembers.css";
import SidebarBox from "../Sidebar/Sidebar";
import MainButton from "../../Common Components/Main Button/MainButton";
import Navbar from "../Navbar/Navbar";

function AllMembers() {
  useEffect(() => {
    async function fetchAllMembers() {
      const data = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members?page_size=20",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const response = await data.json();
    }
    fetchAllMembers();
  });
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <SidebarBox />
        <div className="allMembereContainer">
          <div className="row g-4 mb-5">
            {/*all members */}
            <section className=" col-4 col-lg-4 d-flex align-items-center">
              <div className="ms-3 mb-3 bg-light p-2 rounded">
                <img
                  src="/assets/image/Vector.png"
                  alt="users logo"
                  width={"21.08px"}
                  height={"13.42"}
                />
              </div>
              <div>
                <p className="mb-0 text-dark"> جميع الأعضاء </p>
                <p className="fw-lighter text-secondary">
                  يمكنك متابعة جميع بيانات الأعضاء
                </p>
              </div>
            </section>
            {/*end of all members */}

            {/* serach for a member */}
            <section className="col-4 col-lg-4">
              <form className="row">
                <input
                  placeholder={`ابحث هنا`}
                  className="search-input ms-3 col "
                />
                <div className="search-btn col">
                  <MainButton text={"بحث"} />
                </div>
              </form>
            </section>
            {/* end of serach for a member */}

            <section className="col-4 col-lg-4">
              <form>
                <div className="addmember-btn">
                  <MainButton text={"+ اضافة عضو جديد"} />
                </div>
              </form>
            </section>
          </div>

          {/* all members list table */}
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الأسم</th>
                  <th scope="col">الجوال</th>
                  <th scope="col">رقم العضوية</th>
                  <th scope="col">تاريخ التسجيل</th>
                  <th scope="col">الرصيد</th>
                  <th scope="col">تاريخ الميلاد</th>
                  <th scope="col">ملاحظات</th>
                  <th scope="col">الحالة</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">1</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p
                      className="rounded text-center p-2"
                      style={{
                        color: "#4AD991",
                        fontWeight: "bolder",
                        backgroundColor: "rgba(74, 217, 145,0.2",
                      }}
                    >
                      مؤكد
                    </p>
                  </td>
                </tr>
                {/*  */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMembers;

{
  /* <tr style={{ fontSize: "14px" }}>
                  <th scope="row">2</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">1</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">4</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">5</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">6</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">7</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">8</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">9</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr>
                <tr style={{ fontSize: "14px" }}>
                  <th scope="row">10</th>
                  <td>أحمد محمد علي الدوسري</td>
                  <td>966541995585</td>
                  <td>30308901923</td>
                  <td>PM 9:55:23 9/1/2024</td>
                  <td className="text-center">0</td>
                  <td></td>
                  <td></td>
                  <td>
                    <p  className="rounded text-center p-2"
                    style={{
                      color: "#4AD991",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(74, 217, 145,0.2",
                    }}>
                    مؤكد
                    </p>
                   
                  </td>
                </tr> */
}
