import { useNavigate, useParams } from "react-router-dom";
import styles from "./GroupMemberMembership.module.css";
import { useGetGroupsMembersQuery } from "../../features/api";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Active, AlmostOver, Expired, Freezed } from "../Status/Status";
import { Commet } from "react-loading-indicators";

const GroupMemberMembership = () => {
  const { memberMembershipID } = useParams();

  const {
    data: memberMembership,
    isLoading: isMemberMembershipLoading,
    error: memberMembershipError,
  } = useGetGroupsMembersQuery(`${memberMembershipID}`);

  console.log(memberMembership);

  const navigate = useNavigate();

  function final_price(originalPrice, coupon_value, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    let couponDiscount = 0;
    if (coupon_value > 0) {
      couponDiscount = (originalPrice * coupon_value) / 100;
    } else {
      couponDiscount = (originalPrice * 0) / 100;
    }
    const priceAfterDiscount = originalPrice - discountAmount;
    const finalPrice = priceAfterDiscount - couponDiscount;
    return finalPrice;
  }

  function taxes(originalPrice, coupon_value, coupon_type, discountPercentage) {
    if (coupon_type === "price") {
      const couponValue = (coupon_value / originalPrice) * 100;
      const finalPrice = final_price(
        originalPrice,
        couponValue,
        discountPercentage
      );
      const taxRate = 0.15; // 15%
      const taxAmount = finalPrice * taxRate;
      console.log(taxAmount);
      return taxAmount;
    } else if (coupon_type === "percentage") {
      const finalPrice = final_price(
        originalPrice,
        coupon_value,
        discountPercentage
      );
      const taxRate = 0.15; // 15%
      const taxAmount = finalPrice * taxRate;
      console.log(taxAmount);
      return taxAmount;
    } else {
      const finalPrice = final_price(originalPrice, 0, discountPercentage);
      const taxRate = 0.15; // 15%
      const taxAmount = finalPrice * taxRate;
      console.log(taxAmount);
      return taxAmount;
    }
  }

  if (isMemberMembershipLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (memberMembershipError) {
    if (memberMembershipError?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (memberMembershipError?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      <div className={`${styles.GroupMemberMembership}`}>
        <ComponentTitle
          title={"تفصيل اشتراك عضو في مجموعة"}
          subTitle={"يمكنك متابعة تفصيل اشتراك من هنا"}
          MainIcon={"/assets/image/groups.png"}
        />
        <div className={`${styles.trainer}`}>
          <div className={`d-grid gap-4`}>
            <div className="row mb-4">
              <div className={`col-3 text-end`}>
                <img
                  src="/assets/image/Group 1000011864.png"
                  className="w-100"
                  style={{ padding: "6px" }}
                  width={"50px"}
                  height={"60px"}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="row">
              <div className={`col-3 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/Group.png"}
                    width={"24px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">اسم العميل</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.user?.name}
                  </div>
                </div>
              </div>
              <div className={`col-3 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/img1.png"}
                    width={"24px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">رقم الجوال</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.user?.phone_number}
                  </div>
                </div>
              </div>
              <div className={`col-3 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/img2.png"}
                    width={"20px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">تاريخ الإنشاء</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.start_date}
                  </div>
                </div>
              </div>
              <div className={`col-3 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/Group.png"}
                    width={"24px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">بواسطة</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.admin?.name
                      ? memberMembership?.data?.user_session?.admin?.name
                      : "المستخدم"}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className={`col-3 d-flex justify-content-start align-items-start gap-2`}
              >
                <img src="/assets/image/ph_money.png" alt="" width={"25px"} />
                <div className="me-2">
                  <div className="mb-2 fw-bold">السعر الأصلي</div>
                  <div className="">
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.price
                    }{" "}
                    ريال
                  </div>
                </div>
              </div>
              <div
                className={`col-3 d-flex justify-content-start align-items-start gap-2`}
              >
                <img src="/assets/image/ph_money.png" alt="" width={"25px"} />
                <div className="me-2">
                  <div className="mb-2 fw-bold">
                    الخصم (%
                    {Number.parseInt(
                      memberMembership?.data?.user_session?.discount
                    )}
                    )
                  </div>
                  <div className="">
                    {memberMembership?.data?.user_session?.schedule?.session
                      ?.price *
                      (memberMembership?.data?.user_session?.discount /
                        100)}{" "}
                    ريال
                  </div>
                </div>
              </div>
              <div
                className={`col-3 d-flex justify-content-start align-items-start gap-2`}
              >
                <img src="/assets/image/ph_money.png" alt="" width={"25px"} />
                <div className="me-2">
                  <div className="mb-2 fw-bold">الضريبة (%15)</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.coupon
                      ? taxes(
                          memberMembership?.data?.user_session?.schedule
                            ?.session?.price,
                          memberMembership?.data?.user_session?.coupon
                            ?.discount_value,
                          memberMembership?.data?.user_session?.coupon
                            ?.discount_type,
                          memberMembership?.data?.user_session?.discount
                        )
                      : taxes(
                          memberMembership?.data?.user_session?.schedule
                            ?.session?.price,
                          0,
                          "",
                          memberMembership?.data?.user_session?.discount
                        )}{" "}
                    ريال
                  </div>
                </div>
              </div>
              {memberMembership?.data?.user_session?.coupon && (
                <div className={`col-3 d-flex justify-content-start gap-2`}>
                  <div className="ms-3">
                    <img
                      src="/assets/image/ph_money.png"
                      alt=""
                      width={"25px"}
                    />
                  </div>
                  <div>
                    <p className="mb-1 fw-bolder">
                      الكوبون (
                      {memberMembership?.data?.user_session?.coupon?.code})
                    </p>
                    <p style={{ fontSize: "13px" }}>
                      {memberMembership?.data?.user_session?.coupon
                        .discount_type === "price"
                        ? `${memberMembership?.data?.user_session?.coupon?.discount_value}`
                        : `${(
                            memberMembership?.data?.user_session?.schedule
                              ?.session?.price *
                            (+memberMembership?.data?.user_session?.coupon
                              .discount_value /
                              100)
                          ).toFixed(2)}`}{" "}
                      ريال
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              <div
                className={`col-3 d-flex justify-content-start align-items-start gap-2`}
              >
                <img src="/assets/image/ph_money.png" alt="" width={"25px"} />

                <div className="me-2">
                  <div className="mb-2 fw-bold">الإجمالي قبل الضريبة</div>
                  <div className="">
                    {final_price(
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.price,
                      memberMembership?.data?.user_session?.coupon
                        ?.discount_value,
                      memberMembership?.data?.user_session?.discount
                    )}{" "}
                    ريال
                  </div>
                </div>
              </div>
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/bx_edit.png"}
                    width={"24px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">ملاحظات</div>
                  <div className="">
                    {memberMembership?.data?.user_session?.notes
                      ? memberMembership?.data?.user_session?.notes
                      : "لا شئ"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`fs-4 fw-bold mt-4 mb-4 me-4`}>المجموعات</div>
          <div className="mb-5">
            <table className="w-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>بيان</th>
                  <th>اجمالي نهائي</th>
                  <th>من تاريخ</th>
                  <th>إلى تاريخ</th>
                  <th>المدة</th>
                  <th>حالة الإشتراك</th>
                  {/* <th className="text-center">خيارات</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className={`${styles.scheduleRow}`}>
                  <td>{1}</td>
                  <td>
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.name
                    }
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.paid_money} ريال
                  </td>
                  <td>{memberMembership?.data?.user_session?.start_date}</td>
                  <td>{memberMembership?.data?.user_session?.end_date}</td>
                  <td>
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.duration
                    }
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.status ===
                    "active" ? (
                      <Active />
                    ) : null}
                    {memberMembership?.data?.user_session?.status ===
                    "freezed" ? (
                      <Freezed />
                    ) : null}
                    {memberMembership?.data?.user_session?.status ===
                    "expired" ? (
                      <Expired />
                    ) : null}
                    {memberMembership?.data?.user_session?.status ===
                    "almost over" ? (
                      <AlmostOver />
                    ) : null}
                  </td>
                  {/* <td
                    className={`${styles.tableColumn} position-relative p-2 p-2`}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className={`${styles.subMenu}`}>
                      {memberMembership?.data?.user_session?.is_active ? (
                        <>
                          <div
                            className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                            onClick={() => {
                              navigate(`/Home/EditSchedule/${id}/`);
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ alignSelf: "center" }}
                            >
                              <path
                                d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                                fill="#4F4F4F"
                              />
                            </svg>

                            <div className={`d-inline-block`}>تعديل</div>
                          </div>
                        </>
                      ) : null}
                      {memberMembership?.data?.user_session?.is_active ? (
                        <div
                          className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                          onClick={handleDelete}
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ alignSelf: "center" }}
                          >
                            <path
                              d="M3 9.5C3 9.76522 3.10536 10.0196 3.29289 10.2071C3.48043 10.3946 3.73478 10.5 4 10.5H8C8.26522 10.5 8.51957 10.3946 8.70711 10.2071C8.89464 10.0196 9 9.76522 9 9.5V3.5H3V9.5ZM4 4.5H8V9.5H4V4.5ZM7.75 2L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75Z"
                              fill="#4F4F4F"
                            />
                          </svg>
                          <div className={`d-inline-block`}>حذف</div>
                        </div>
                      ) : (
                        <div
                          className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                          onClick={handleActivate}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ alignSelf: "center" }}
                          >
                            <path
                              d="M12 2.84952C17.0537 2.84952 21.1505 6.94634 21.1505 12C21.1505 17.0537 17.0537 21.1505 12 21.1505C6.94631 21.1505 2.84949 17.0537 2.84949 12C2.84949 6.94634 6.94631 2.84952 12 2.84952Z"
                              stroke="#1C1C1C"
                              stroke-width="1.69905"
                              stroke-linecap="round"
                            />
                            <path
                              d="M11.085 14.7452L9.25489 12.9151C8.74953 12.4097 8.74953 11.5903 9.25489 11.0849L11.085 9.25485C11.5904 8.74948 12.4097 8.74948 12.9151 9.25485L14.7452 11.0849C15.2506 11.5903 15.2506 12.4097 14.7452 12.9151L12.9151 14.7452C12.4097 15.2505 11.5904 15.2505 11.085 14.7452Z"
                              stroke="#1C1C1C"
                              stroke-width="1.69905"
                              stroke-linecap="round"
                            />
                          </svg>
                          <div className={`d-inline-block`}>تفعيل</div>
                        </div>
                      )}
                    </div>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`fs-4 fw-bold mt-4 mb-4 me-4`}>المواعيد</div>
          <div className="">
            <table className="w-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المجموعة</th>
                  <th>السبت</th>
                  <th>الأحد</th>
                  <th>الإثنين</th>
                  <th>الثلاثاء</th>
                  <th>الأربعاء</th>
                  <th>الخميس</th>
                  <th>الجمعة</th>
                  <th>اسم المدرب</th>
                  {/* <th className="text-center">خيارات</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className={`${styles.scheduleRow}`}>
                  <td>{1}</td>
                  <td>
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.name
                    }
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.saturday ??
                      "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.sunday ??
                      "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.monday ??
                      "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.tuesday ??
                      "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule
                      ?.wednesday ?? "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.thursday ??
                      "-"}
                  </td>
                  <td>
                    {memberMembership?.data?.user_session?.schedule?.friday ??
                      "-"}
                  </td>
                  <td>
                    {
                      memberMembership?.data?.user_session?.schedule?.trainer
                        ?.name
                    }
                  </td>
                  {/* <td
                    className={`${styles.tableColumn} position-relative p-2 p-2`}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className={`${styles.subMenu}`}>
                      {schedule.is_active ? (
                        <>
                          <div
                            className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                            onClick={() => {
                              navigate(`/Home/EditSchedule/${id}/`);
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ alignSelf: "center" }}
                            >
                              <path
                                d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                                fill="#4F4F4F"
                              />
                            </svg>

                            <div className={`d-inline-block`}>تعديل</div>
                          </div>
                        </>
                      ) : null}
                      {schedule.is_active ? (
                        <div
                          className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                          onClick={handleDelete}
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ alignSelf: "center" }}
                          >
                            <path
                              d="M3 9.5C3 9.76522 3.10536 10.0196 3.29289 10.2071C3.48043 10.3946 3.73478 10.5 4 10.5H8C8.26522 10.5 8.51957 10.3946 8.70711 10.2071C8.89464 10.0196 9 9.76522 9 9.5V3.5H3V9.5ZM4 4.5H8V9.5H4V4.5ZM7.75 2L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75Z"
                              fill="#4F4F4F"
                            />
                          </svg>
                          <div className={`d-inline-block`}>حذف</div>
                        </div>
                      ) : (
                        <div
                          className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
                          onClick={handleActivate}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ alignSelf: "center" }}
                          >
                            <path
                              d="M12 2.84952C17.0537 2.84952 21.1505 6.94634 21.1505 12C21.1505 17.0537 17.0537 21.1505 12 21.1505C6.94631 21.1505 2.84949 17.0537 2.84949 12C2.84949 6.94634 6.94631 2.84952 12 2.84952Z"
                              stroke="#1C1C1C"
                              stroke-width="1.69905"
                              stroke-linecap="round"
                            />
                            <path
                              d="M11.085 14.7452L9.25489 12.9151C8.74953 12.4097 8.74953 11.5903 9.25489 11.0849L11.085 9.25485C11.5904 8.74948 12.4097 8.74948 12.9151 9.25485L14.7452 11.0849C15.2506 11.5903 15.2506 12.4097 14.7452 12.9151L12.9151 14.7452C12.4097 15.2505 11.5904 15.2505 11.085 14.7452Z"
                              stroke="#1C1C1C"
                              stroke-width="1.69905"
                              stroke-linecap="round"
                            />
                          </svg>
                          <div className={`d-inline-block`}>تفعيل</div>
                        </div>
                      )}
                    </div>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupMemberMembership;
