import React, { useEffect, useState } from "react";
import "./SubscriptionDetail.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
import { useParams } from "react-router-dom";

function SubscriptionDetail() {
  const access_token = localStorage.getItem("access");
  const [subDetail, setSubDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members/memberships/${id}/`,
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
          console.log("success");
          setSubDetail(result.data.user_membership);
          console.log(result.data.user_membership.user.name);
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [access_token, id]);

  return (
    <div className="subscriptionDetailContainer">
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
                  <p style={{ fontSize: "13px" }}>{subDetail.user.phone_number}</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/Vector (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">تاريخ الانشاء</p>
                  <p className="" style={{ fontSize: "13px" }}>
                    {subDetail.user.created_at.slice(0,10)}
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
                  <p style={{ fontSize: "13px" }}>{subDetail.actual_price} ريال</p>
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
                  <p className="mb-1 fw-bolder">الإجمالي النهائي  </p>
                  <p style={{ fontSize: "13px" }}>0 ريال</p>
                </div>
              </div>
              {/* <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">مدى</p>
                  <p style={{ fontSize: "13px" }}>0 ريال</p>
                </div>
              </div> */}
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/bx_edit (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">{subDetail.notes || "لا يوجد ملاحظات"}</p>
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
                    <th scope="col">سعر</th>
                    <th scope="col">إجمالي</th>
                    <th scope="col">من تاريخ</th>
                    <th scope="col">إلى تاريخ</th>
                    <th scope="col">المدة</th>
                    <th scope="col">المتبقي</th>
                    {/* <th scope="col" className="text-center">خيارات</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ fontSize: "14px", textAlign: "right" }}>
                    <td>1</td>
                    <td>{subDetail.membership.name}</td>
                    <td>{subDetail.membership.price}</td>
                    <td>200</td>
                    <td>{subDetail.start_date}</td>
                    <td>{subDetail.end_date}</td>
                    <td>{subDetail.membership.membership_duration}</td>
                    <td>0</td>
                    {/* <td className="text-center">
                      <MoreVertIcon />
                    </td> */}
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