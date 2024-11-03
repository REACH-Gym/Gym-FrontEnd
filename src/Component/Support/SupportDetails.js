import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Helmet } from "react-helmet";
function SupportDetails() {
  const { id } = useParams();
  const [supportDetail, setSupportDetail] = useState([]);
  useEffect(() => {
    async function fetchSupportDetails() {
      try {
        const response = await fetch(
          `http://104.248.251.235:8000/support/${id}/`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("access"),
            },
          }
        );
        const successGetDetails = await response.json();
        console.log(successGetDetails);
        if (response.ok) {
          console.log("success get details");
          setSupportDetail(successGetDetails.data);
        } else {
          console.log("failed get details");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSupportDetails();
  }, [id]);
  return (
    <div className="supportDetailContainer">
      <Helmet>
        <title>تفاصيل رسالة الدعم</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          title={"التفاصيل الخاصة برسالة الدعم"}
          MainIcon={
            "/assets/image/support-music-listen-headphone-earphone-headset-svgrepo-com.png"
          }
        />
      </div>
      <div className="supportDetailContainer__item mt-3">
        <div>
          <img src="/assets/image/Group 1000011864.png" alt="gym logo" />
        </div>
        <div className="mt-5 text-light">
          <div>
            <div className="d-flex align-items-center">
              <img src="/assets/image/img1.png" alt="phone number" />
              <p className="mt-2 me-3 fw-bolder">رقم الجوال</p>
            </div>
            <p className="me-4" style={{ fontSize: "14px" }}>
              {supportDetail.phone_number}
            </p>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <img src="/assets/image/img2.png" alt="date" />
              <p className="mt-2 me-3 fw-bolder">التاريخ</p>
            </div>
            <p className="me-4" style={{ fontSize: "14px" }}>
              {supportDetail.created_at}
            </p>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <img src="/assets/image/img.png" alt="message" />
              <p className="mt-2 me-3 fw-bolder">الأستفسار</p>
            </div>
            <p className="me-4" style={{ fontSize: "14px" }}>
              {supportDetail.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportDetails;
