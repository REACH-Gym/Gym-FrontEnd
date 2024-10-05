import React, { useEffect, useState } from "react";
import "./MemberSubscriptionDetail.css";
import { useParams } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function MemberSubscriptionDetail() {
  const access_token = localStorage.getItem("access");
  const { id } = useParams();
  const [memberSubDetail, setMemberSubDetail] = useState([]);
  useEffect(() => {
    async function fetchMemberSubDetails() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/members/memberships/?filter{user}=${id}`,{
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        console.log(response)
        console.log(id)
        console.log(result);
        if (response.ok) {
          setMemberSubDetail(result.data.user_memberships);
          console.log('membershippppppppppps',result.data.user_memberships);
          console.log(result.data.user_memberships[0].membership);
          console.log(result.data.user_memberships[0].user.name);
          // console.log('ooooooooooooooooooooooooooooooooooooo',memberSubDetail[0].user.phone_number)
          // console.log(id)
          console.log("get details successful");
        } else {
          setMemberSubDetail(null);
          console.error("faild to get details");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMemberSubDetails();
  }, [id, access_token]);
  return (
    <div className="membersubscriptionDetailContainer">
      {memberSubDetail ? (
        <div className="membersubscriptionDetailContainer__item">
          <div>
            <ComponentTitle
              title={"تفاصيل الأشتراك الخاص بالعضو"}
              subTitle={"يمكنك متابعة تفاصيل الأشتراك الخاص بالعضو من هنا"}
              MainIcon={"/assets/image/subscriptions.png"}
            />
          </div>
          <div className="subscriptionDetailContainer__items">
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
                  <p style={{ fontSize: "13px" }}>{memberSubDetail[0].user.name}</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/phone.png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">رقم الجوال</p>
                  <p style={{ fontSize: "13px" }}>
                    {memberSubDetail[0].user.phone_number}
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
                    {memberSubDetail[0].user.created_at.slice(0, 10)}
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/iconamoon_profile.png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">بواسطة</p>
                  <p style={{ fontSize: "13px" }}>{memberSubDetail[0].admin.name}</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الاجمالي الفرعي</p>
                  <p style={{ fontSize: "13px" }}>
                    {memberSubDetail[0].actual_price} ريال
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الخصم (%)</p>
                  <p style={{ fontSize: "13px" }}>{memberSubDetail[0].discount} ريال</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الضريبة (10%)</p>
                  <p style={{ fontSize: "13px" }}>0 ريال</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">الإجمالي النهائي</p>
                  <p style={{ fontSize: "13px" }}>0 ريال</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/ph_money (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">مدى</p>
                  <p style={{ fontSize: "13px" }}>0 ريال</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <img src="/assets/image/bx_edit (1).png" alt="" />
                </div>
                <div>
                  <p className="mb-1 fw-bolder">{memberSubDetail[0].notes}</p>
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
                    <th scope="col" className="text-center">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ fontSize: "14px", textAlign: "right" }}>
                    <td>1</td>
                    <td>200</td>
                    <td>0</td>
                    <td className="text-center">
                      <MoreVertIcon />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
}

export default MemberSubscriptionDetail;
