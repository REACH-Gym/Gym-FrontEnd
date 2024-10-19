import React, { useEffect, useState } from "react";
import "./container.css";
import "react-circular-progressbar/dist/styles.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Helmet } from "react-helmet";
function Container() {
  const [status, setStatus] = useState([]);
  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/dashboard-stats/`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              accept: "*/*",
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setStatus(result.data);
          console.log("success");
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStatus();
  });
  return (
    <div className="container">
      <Helmet>
        <title>
          الصفحة الريئسية
        </title>
      </Helmet>
      <div className="d-flex pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/homePage.png"}
          title={"لوحة التحكم"}
          date={true}
          subTitle={"أهلا بك في يوم إبداعي جديد"}
        />
      </div>
      <div className="items mt-4">
        <div className="item">
          <div className="d-flex justify-content-between">
            <div>
              <img src="/assets/image/Icon (3).png" alt="" />
            </div>
            <div className="d-flex flex-column align-items-end">
              <p style={{ color: "#666666" }} className="mb-0">
                جميع الاعضاء
              </p>
              <p className="fw-bolder fs-2">{status.all_members}</p>
            </div>
          </div>
          <p className="fw-bolder mt-4" style={{ color: "#666666" }}>
            جميع اعضاء النادي
          </p>
        </div>
        <div className="item ">
          <div className="d-flex justify-content-between">
            <div>
              <img src="/assets/image/Icon (5).png" alt="" />
            </div>
            <div className="d-flex flex-column align-items-end">
              <p style={{ color: "#666666" }} className="mb-0">
                حجوزات اليوم
              </p>
              <p className="fw-bolder fs-2">
                {status.today_memberships_and_sessions}
              </p>
            </div>
          </div>
          <p className="fw-bolder mt-4" style={{ color: "#666666" }}>
            الحجوزات منذ بداية اليوم
          </p>
        </div>
        <div className="item">
          <div className="d-flex justify-content-between">
            <div>
              <img src="/assets/image/Icon (2).png" alt="" />
            </div>
            <div className="d-flex flex-column align-items-end">
              <p style={{ color: "#666666" }} className="mb-0">
                الاشتراكات الفعالة
              </p>
              <p className="fw-bolder fs-2">
                {status.active_memberships_and_sessions}
              </p>
            </div>
          </div>
          <p className="fw-bolder mt-4" style={{ color: "#666666" }}>
            جميع الاشتراكات الفعالة
          </p>
        </div>
        <div className="item">
          <div className="d-flex justify-content-between">
            <div>
              <img src="/assets/image/Icon.png" alt="" />
            </div>
            <div className="d-flex flex-column align-items-end">
              <p style={{ color: "#666666" }} className="mb-0">
                  أوشكت علي الأنتهاء
              </p>
              <p className="fw-bolder fs-2">
                {status.almost_over_memberships_and_sessions}
              </p>
            </div>
          </div>
          <p className="fw-bolder mt-4" style={{ color: "#666666" }}>
            جميع الاشتراكات المنتهية
          </p>
        </div>
      </div>
    </div>
  );
}
export default Container;
