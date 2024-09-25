import React, { useEffect, useState } from "react";
import "./SubscriptionDetail.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
function SubscriptionDetail() {
  const access_token = localStorage.getItem("access");
  const [subDetail, setSubDetail] = useState();
  const {id} = useParams();
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
        if(response.ok){
          console.log('success');
          setSubDetail(result.data)
        }else{
          console.log('failed')
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  },[access_token, id]);
  return (
    <div className="subscriptionDetailContainer">
      <div>
        <ComponentTitle
          title={"تفاصيل الاشتراك"}
          subTitle={"يمكنك متابعة  تفاصيل الاشتراك من هنا"}
          MainIcon={"/assets/image/subscriptions.png"}
        />
      </div>
      {/* subscription detail */}
      <div className="subscriptionDetailContainer__items">
        <div className=" mt-4">
          <img src="/assets/image/logo(1).png" alt="" />
        </div>
        <div className="item1 me-5">
          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/iconamoon_profile.png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">اسم العميل</p>
              <p style={{ fontSize: "12px" }}>أحمد محمد علي</p>
            </div>
          </div>

          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/phone.png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">رقم الجوال</p>
              <p style={{ fontSize: "12px" }}>966541995585</p>
            </div>
          </div>

          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/Vector (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">تاريخ الانشاء</p>
              <p style={{ fontSize: "12px" }}>20/11/2024</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/iconamoon_profile.png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">بواسطة</p>
              <p style={{ fontSize: "12px" }}>محمد الغيث</p>
            </div>
          </div>

          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/ph_money (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">الاجمالي الفرعي</p>
              <p style={{ fontSize: "12px" }}>200 ريال</p>
            </div>
          </div>

          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/ph_money (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">الخصم (%)</p>
              <p style={{ fontSize: "12px" }}>0 ريال</p>
            </div>
          </div>

          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/ph_money (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">الضريبة (10%)</p>
              <p style={{ fontSize: "12px" }}>30 ريال</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/ph_money (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">الإجمالي النهائي</p>
              <p style={{ fontSize: "12px" }}>300 ريال</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/ph_money (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">مدى</p>
              <p style={{ fontSize: "12px" }}>260 ريال</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="ms-3">
              <img src="/assets/image/bx_edit (1).png" alt="" />
            </div>
            <div>
              <p className="mb-1 fw-bolder">ملاحظة</p>
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
                <th scope="col">عدد</th>
                <th scope="col">سعر</th>
                <th scope="col">إجمالي</th>
                <th scope="col">من تاريخ</th>
                <th scope="col">إلى تاريخ</th>
                <th scope="col">المدة</th>
                <th scope="col">المتبقي</th>
                <th scope="col">عدد مرات الحجز</th>
                <th scope="col">خيارات</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ fontSize: "14px", textAlign: "right" }}>
                <td>1</td>
                <td>جلسة تأهيل علاجي</td>
                <td>1</td>
                <td>200</td>
                <td>200</td>
                <td>15/11/2025</td>
                <td>15/11/2025</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td className="">
                  <MoreVertIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default SubscriptionDetail;
