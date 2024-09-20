import React, { useEffect, useState } from "react";
import "./SubscripedMembers.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
// import { useNavigate } from "react-router-dom";
function SubscripedMembers() {
  const access_token = localStorage.getItem('access');
  const [SubscripedMembers , setSubscripedMembers] = useState([]);
  useEffect(() => {
    async function fetchSubscripedMember() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/memberships",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:access_token
            },
          }
        );
      const data = await response.json();
      console.log(data)
      setSubscripedMembers(data.data.user_memberships);
      // console.log(data.data.user_memberships)
      // console.log(data.data.user_memberships[0].user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSubscripedMember();
  },[]);
  return (
    <div className="allSubscriptionContainer mt-4">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"جميع الاعضاء المشتركين"}
          subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
        />
        <Filter
          option1={"جميع الأشتراكات"}
          option2={"الأشتراكات الفعالة"}
          option3={"أوشكت علي الأنتهاء"}
          option4={"الأشتراكات المنتهية"}
        />
        <ComponentBtns btn1={"+ إضافة اشتراك جديد "} />
      </div>
      <table className="table border-1 mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم العضو</th>
            <th scope="col">رقم العضوية</th>
            <th scope="col">الإجمالي</th>
            <th scope="col">المدفوع</th>
            <th scope="col">المتبقي</th>
            <th scope="col">الخصم</th>
            <th scope="col">تاريخ الاشتراك</th>
            <th scope="col">بواسطة</th>
            <th scope="col">خيارات</th>
          </tr>
        </thead>
        <tbody>
          {SubscripedMembers.map((SubscripedMember , index)=>(
            <tr style={{ fontSize: "14px" }} key={SubscripedMember.id}>
            <td>{index + 1}</td>
            <td>{SubscripedMember.user.name}</td>
            <td>{SubscripedMember.user.national_id}</td>
            <td>{SubscripedMember.membership.price}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>{SubscripedMember.user.created_at}</td>
            <td>{SubscripedMember.admin.name}</td>
            <td className="fw-bolder text-center fs-5">:</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SubscripedMembers;
//pagination