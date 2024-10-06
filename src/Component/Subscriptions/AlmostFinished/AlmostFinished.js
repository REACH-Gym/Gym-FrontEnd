import React, { useEffect, useState } from "react";
import "./AlmostFinished.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../../Common Components/Filter/Filter";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
function AlmostFinished() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [almostFinishSub, setAlmostFinishSub] = useState([]);
  useEffect(() => {
    async function fetchAlmostFinishSub() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/memberships/?filterexclude[]=user&=admin&filter%7Bstatus%7D=",
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
        setAlmostFinishSub(result.data.user_memberships);
        console.log(result.data.user_memberships);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAlmostFinishSub();
  }, []);
  return (
    <div className="allSubscriptionContainer mt-4">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"اشتراكات اوشكت على الانتهاء"}
          subTitle={"يمكنك تجديد الاشتراكات  من هنا"}
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
          {almostFinishSub.length > 0 ? (
            almostFinishSub.map((almost_expired, index) => (
              <tr style={{ fontSize: "14px" }} key={index}>
                <td>{index + 1}</td>
                <td>{almost_expired.user.name}</td>
                <td>{almost_expired.user.phone_number}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{almost_expired.membership.duration}</td>
                <td>
                  <p
                    className="rounded text-center p-2"
                    style={{
                      color: "#EDC70A",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(237, 199, 10,0.2)",
                    }}
                  >
                    {almost_expired.status}
                  </p>
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
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AlmostFinished;
