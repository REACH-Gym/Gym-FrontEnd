import React, { useEffect, useState } from "react";
import "./container.css";
import "react-circular-progressbar/dist/styles.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Helmet } from "react-helmet";
function Container() {
  const [status, setStatus] = useState([]);
  const api = process.env.REACT_APP_DOMAIN;
  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(`${api}/dashboard-stats/`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("access"),
            accept: "*/*",
          },
        });
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
  }, [api]);
  return (
    <div className="contentContainer">
      <div className="container__item container">
        <Helmet>
          <title>الصفحة الريئسية</title>
        </Helmet>
        <div className="d-flex pe-3">
          <ComponentTitle
            isSVG={true}
            MainIcon="M3.83936 9.65698V21.7556C3.83936 21.9731 3.9259 22.1817 4.07995 22.3356C4.23399 22.4894 4.44293 22.5758 4.66078 22.5758H9.58936V15.6037C9.58936 15.2774 9.71917 14.9645 9.95024 14.7337C10.1813 14.503 10.4947 14.3734 10.8215 14.3734H14.9286C15.2554 14.3734 15.5688 14.503 15.7999 14.7337C16.031 14.9645 16.1608 15.2774 16.1608 15.6037V22.5758H21.0894C21.3072 22.5758 21.5161 22.4894 21.6702 22.3356C21.8242 22.1817 21.9108 21.9731 21.9108 21.7556V9.65698 ,
          M24.375 11.8973L13.4341 1.42323C13.1774 1.15213 12.5772 1.14905 12.3159 1.42323L1.375 11.8973M20.2679 7.94386V2.03935H17.8036V5.58206"
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
                <p style={{ color: "#fff" }} className="mb-0">
                  جميع الاعضاء
                </p>
                <p className="fw-bolder fs-2 text-light">
                  {status.all_members}
                </p>
              </div>
            </div>
            <p className="fw-bolder mt-4" style={{ color: "#fff" }}>
              جميع اعضاء النادي
            </p>
          </div>
          <div className="item ">
            <div className="d-flex justify-content-between">
              <div>
                <img src="/assets/image/Icon (5).png" alt="" />
              </div>
              <div className="d-flex flex-column align-items-end">
                <p style={{ color: "#fff" }} className="mb-0">
                  حجوزات اليوم
                </p>
                <p className="fw-bolder fs-2 text-light">
                  {status.today_memberships_and_sessions}
                </p>
              </div>
            </div>
            <p className="fw-bolder mt-4" style={{ color: "#fff" }}>
              الحجوزات منذ بداية اليوم
            </p>
          </div>
          <div className="item">
            <div className="d-flex justify-content-between">
              <div>
                <img src="/assets/image/Icon (2).png" alt="" />
              </div>
              <div className="d-flex flex-column align-items-end">
                <p style={{ color: "#fff" }} className="mb-0">
                  الاشتراكات الفعالة
                </p>
                <p className="fw-bolder fs-2 text-light">
                  {status.active_memberships_and_sessions}
                </p>
              </div>
            </div>
            <p className="fw-bolder mt-4" style={{ color: "#fff" }}>
              جميع الاشتراكات الفعالة
            </p>
          </div>
          <div className="item">
            <div className="d-flex justify-content-between">
              <div>
                <img src="/assets/image/Icon.png" alt="" />
              </div>
              <div className="d-flex flex-column align-items-end">
                <p style={{ color: "#fff" }} className="mb-0">
                  أوشكت علي الأنتهاء
                </p>
                <p className="fw-bolder fs-2 text-light">
                  {status.almost_over_memberships_and_sessions}
                </p>
              </div>
            </div>
            <p className="fw-bolder mt-4" style={{ color: "#fff" }}>
              جميع الاشتراكات المنتهية
            </p>
          </div>
          <div className="item">
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src="/assets/image/request-sent-svgrepo-com 1.png"
                  alt=""
                />
              </div>
              <div className="d-flex flex-column align-items-end">
                <p style={{ color: "#fff" }} className="mb-0">
                  حجوزات عضوية جديدة
                </p>
                <p className="fw-bolder fs-2 text-light">
                  {status.almost_over_memberships_and_sessions}
                </p>
              </div>
            </div>
            <p className="fw-bolder mt-4" style={{ color: "#fff" }}>
              طلبات الإشتراك الجديدة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Container;
