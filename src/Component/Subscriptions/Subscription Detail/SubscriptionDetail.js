import React, { useEffect, useRef, useState } from "react";
import "./SubscriptionDetail.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { Active, Deleted } from "../../Status/Status";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Helmet } from "react-helmet";
function SubscriptionDetail() {
  const access_token = localStorage.getItem("access");
  const [subDetail, setSubDetail] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const optionRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(
          `http://104.248.251.235:8000/members/memberships/${id}/`,
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
        if (response.ok) {
          setSubDetail(result.data.user_membership);
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [access_token, id]);

  const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="subscriptionDetailContainer">
      <Helmet>
        <title>تفاصيل الأشتراك الخاص بالعضو</title>
      </Helmet>
      {subDetail ? (
        <>
          <div>
            <ComponentTitle
              title={"تفاصيل الاشتراك"}
              subTitle={"يمكنك متابعة تفاصيل الاشتراك من هنا"}
              MainIcon={"/assets/image/subscriptions.png"}
            />
          </div>
          <div className="subscriptionDetailContainer__items mt-3">
            <div className="mt-4">
              <img src="/assets/image/logo(1).png" alt="" />
            </div>
            <div className="item1 me-5">
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/iconamoon_profile.png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">اسم العميل</p>
                  <p style={{ fontSize: "13px" }}>{subDetail.user.name}</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/phone.png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">رقم الجوال</p>
                  <p style={{ fontSize: "13px" }}>
                    {subDetail.user.phone_number}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/Vector (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">تاريخ الانشاء</p>
                  <p className="" style={{ fontSize: "13px" }}>
                    {subDetail.user.created_at.slice(0, 10)}
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/iconamoon_profile.png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">بواسطة</p>
                  <p style={{ fontSize: "13px" }}>{subDetail.admin.name}</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">السعر الأصلي </p>
                  <p style={{ fontSize: "13px" }}>
                    {subDetail.membership.price} ريال
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الخصم (%)</p>
                  <p style={{ fontSize: "13px" }}>{subDetail.discount}</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الضريبة (10%)</p>
                  <p style={{ fontSize: "13px" }}>15%</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الإجمالي</p>
                  <p style={{ fontSize: "13px" }}>
                    {subDetail.membership.price_after_discount} ريال
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/bx_edit (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">
                    {subDetail.notes || "لا يوجد ملاحظات"}
                  </p>
                </div>
              </div>
            </div>
            {/*subscriptions*/}
            <div>
              <p className="fw-bolder mt-5  fs-5 ">الاشتراكات</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">بيان</th>
                    <th scope="col">اجمالي</th>
                    <th scope="col">الخصم الفردي</th>
                    <th scope="col"> الأجمالي النهائي</th>
                    <th scope="col">من تاريخ</th>
                    <th scope="col">الي تاريخ</th>
                    <th scope="col">المدة</th>
                    <th scope="col">حالة الأشتراك</th>
                    <th className="text-center" scope="col">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ fontSize: "14px", textAlign: "right" }}>
                    <td>1</td>
                    <td>{subDetail.membership.name}</td>
                    <td>{subDetail.membership.price_after_discount}</td>
                    <td>{subDetail.discount}</td>
                    <td>{subDetail.actual_price}</td>
                    <td>{subDetail.start_date}</td>
                    <td>{subDetail.end_date}</td>
                    <td>{subDetail.membership.membership_duration}</td>
                    <td>
                      {subDetail.status === "active" ? <Active /> : <Deleted />}
                    </td>
                    <td
                      className="text-center"
                      style={{ position: "relative" }}
                    >
                      <MoreVertIcon
                        onClick={() => setShowOptions(!showOptions)}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="" style={{ position: "relative" }}>
                        {showOptions && (
                          <div
                            ref={optionRef}
                            className="options"
                            style={{ position: "absolute" }}
                          >
                            <div className="d-flex align-items-center pt-2 options_item">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2em"
                                height="2em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"
                                />
                              </svg>
                              <p
                                className="mb-0 me-2"
                                style={{ textAlign: "right", fontSize: "16px" }}
                              >
                                طباعة
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="loader">
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
}
export default SubscriptionDetail;
