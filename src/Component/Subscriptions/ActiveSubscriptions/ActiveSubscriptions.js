import React, { useEffect, useState } from "react";
import "./ActiveSubcriptions.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
function ActiveSubscriptions() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [activeSub, setActiveSub] = useState([]);
  useEffect(() => {
    async function fetchActiveSubscriptions() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/memberships/?filterexclude[]=user&=admin&filter%7Bstatus%7D=active",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        console.log(result.data);
        setActiveSub(result.data.user_memberships);
      } catch (error) {
        console.error(error);
      }
    }
    fetchActiveSubscriptions();
  }, []);
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
          onClickOption1={()=>navigate('/Home/AllSubScriptions')}
          onClickOption2={()=>navigate('/Home/ActiveSubScription')}
          onClickOption3={()=>navigate('/Home/AlmostFinished')}
          onClickOption4={()=>navigate('/Home/ExpiredSubscriptions')}
        />
        <ComponentBtns btn1={"+ إضافة اشتراك جديد "} onclick={()=>navigate('/Home/AddNewSubscription')}/>
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
          {activeSub.map((subscription,index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{index + 1}</td>
              <td>{subscription.user.name}</td>
              <td>{subscription.user.phone_number}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{subscription.membership.duration}</td>
              <td>
                <p
                  className="rounded text-center p-2"
                  style={{
                    color: "#4AD991",
                    fontWeight: "bolder",
                    backgroundColor: "rgba(74, 217, 145,0.2)",
                  }}
                >{subscription.status}</p>
              </td>
              <td>
                <p
                  className="rounded text-center p-2"
                  style={{
                    color: "#8280FF",
                    fontWeight: "bolder",
                    backgroundColor: "rgba(130, 128, 255,0.2)",
                  }}
                ></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ActiveSubscriptions;
