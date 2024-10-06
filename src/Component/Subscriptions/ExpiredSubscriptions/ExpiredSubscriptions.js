import React, { useEffect, useState } from "react";
import "./ExpiredSubscriptions.css";
import { useNavigate } from "react-router-dom";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
function ExpiredSubscriptions() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [expireSub, setExpireSub] = useState([]);
  useEffect(() => {
    async function fetchExpiredSub() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/memberships/?filterexclude[]=user&=admin&filter%7Bstatus%7D=expired",
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
        setExpireSub(result.data.user_memberships);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpiredSub();
  }, []);
  return (
    <div className="allSubscriptionContainer mt-4">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"الاشتراكات المنتهيه"}
          subTitle={"يمكنك متابعة الاشتراكات المنتهيه من هنا"}
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
          {expireSub.map((expired , index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{index + 1}</td>
              <td>{expired.user.name}</td>
              <td>{expired.user.phone_number}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{expired.membership.duration}</td>
              <td>
                <p
                  className="rounded text-center p-2"
                  style={{
                    color: "#FF6666",
                    fontWeight: "bolder",
                    backgroundColor: "rgba(255, 102, 102,0.2)",
                  }}
                >{expired.status}</p>
              </td>
              <td>
                <p
                  className="rounded text-center p-2"
                  style={{
                    color: "#8280FF",
                    fontWeight: "bolder",
                    backgroundColor: "rgb(130, 128, 255,0.2)",
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
export default ExpiredSubscriptions;
