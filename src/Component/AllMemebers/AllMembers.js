import React from "react";
import "./AllMembers.css";
import MainButton from "../../Common Components/Main Button/MainButton";
import ContentContainer from "../ContentContainer/ContentContainer";
function AllMembers() {
  return (
    <ContentContainer
      title={"جميع الإعضاء"}
      desc={"يمكنك متابعة جميع بيانات الإعضاء"}
      search={"members"}
      btn1={"إضافة عضو جديد"}
      btn2={"disabled"}
    >
      <div>
        <div className="d-flex">
          <div className="allMembereContainer">
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
                  <tr style={{ fontSize: "14px" }}>
                    <th scope="row">2</th>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}

export default AllMembers;
