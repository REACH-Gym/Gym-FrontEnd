import React from "react";
import "./ActiveSubcriptions.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
function ActiveSubscriptions() {
  const navigate = useNavigate();
  const handleAllSub = () => {
    navigate('AllSubScriptions')
  };

  const handleActiveSub = () => {
    navigate('ActiveSubScription')
  };

  const handleEndingSoonSub = () => {
    navigate('AlmostFinished')
  };

  const handleExpiredSub = () => {
    navigate('ExpiredSubScription')
  };
  return (
    <div className="allSubscriptionContainer mt-4">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"الاشتراكات الفعالة"}
          subTitle={"يمكنك متابعة  الاشتراكات الفعالة من هنا"}
        />
        <Filter
          option1={"جميع الأشتراكات"}
          option2={"الأشتراكات الفعالة"}
          option3={"أوشكت علي الأنتهاء"}
          option4={"الأشتراكات المنتهية"}
          onClickOption1={handleAllSub}
          onClickOption2={handleActiveSub}
          onClickOption3={handleEndingSoonSub}
          onClickOption4={handleExpiredSub}
        />
        <ComponentBtns btn1={"+ إضافة اشتراك جديد "} />
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم العضو</th>
            <th scope="col"> رقم الجوال</th>
            <th scope="col">البيان</th>
            <th scope="col">من تاريخ</th>
            <th scope="col">إلى تاريخ</th>
            <th scope="col">المدة</th>
            <th scope="col">الحالة</th>
            <th scope="col">تفاصيل</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ fontSize: "14px" }}>
            <td>1</td>
            <td>أحمد محمد علي الدوسري</td>
            <td>966541995585</td>
            <td>عضوية اشتراك 6 اشهر</td>
            <td>20/11/2024</td>
            <td>20/11/2024</td>
            <td>400</td>
            <td>
              <p
                className="rounded text-center p-2"
                style={{
                  color: "#4AD991",
                  fontWeight: "bolder",
                  backgroundColor: "rgba(74, 217, 145,0.2)",
                }}
              >
                فعال
              </p>
            </td>
            <td>
              <p
                className="rounded text-center p-2"
                style={{
                  color: "#8280FF",
                  fontWeight: "bolder",
                  backgroundColor: "rgba(130, 128, 255,0.2)",
                }}
              >
                تفاصيل
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ActiveSubscriptions;
