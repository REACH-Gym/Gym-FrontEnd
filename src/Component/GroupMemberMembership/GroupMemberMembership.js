import { useParams } from "react-router-dom";
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

  // const handleDelete = async () => {
  //   if (window.confirm("هل تريد خذف هذا الموعد؟")) {
  //     try {
  //       const response = await deleteSchedule({
  //         id: id,
  //         data: { is_active: false },
  //       });
  //       console.log(response);
  //       window.location.reload();
  //     } catch (err) {
  //       console.error(err);
  //       alert("خطأ في حذف الموعد، حاول مرة أخرى.");
  //     }
  //   } else {
  //     alert("تم إلغاء حذف هذه الموعد.");
  //   }
  // };
  // const handleActivate = async () => {
  //   if (window.confirm("هل تريد تفعيل هذه الموعد؟")) {
  //     try {
  //       const response = await deleteSchedule({
  //         id: id,
  //         data: { is_active: true },
  //       });
  //       console.log(response);
  //       window.location.reload();
  //     } catch (err) {
  //       console.error(err);
  //       alert("خطأ في تفعيل الموعد، حاول مرة أخرى.");
  //     }
  //   } else {
  //     alert("تم إلغاء تفعيل هذه الموعد.");
  //   }
  // };

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
    return (
      <div
        className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
      >
        حدث خطأ، برجاء المحاولة مرة أخرى.
      </div>
    );
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
              <div className={`col-4 text-end`}>
                <img
                  src="/assets/image/Group 1000011667.png"
                  className="w-100"
                  style={{ maxWidth: "205px" }}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="row">
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/iconamoon_profile.png"}
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
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/phone.png"}
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
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/date.png"}
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
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/iconamoon_profile.png"}
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
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.25C11.2583 3.25 10.5333 3.46993 9.91661 3.88199C9.29993 4.29404 8.81928 4.87971 8.53545 5.56494C8.25162 6.25016 8.17736 7.00416 8.32205 7.73159C8.46675 8.45902 8.8239 9.1272 9.34835 9.65165C9.8728 10.1761 10.541 10.5333 11.2684 10.6779C11.9958 10.8226 12.7498 10.7484 13.4351 10.4645C14.1203 10.1807 14.706 9.70007 15.118 9.08339C15.5301 8.4667 15.75 7.74168 15.75 7C15.75 6.00544 15.3549 5.05161 14.6517 4.34835C13.9484 3.64509 12.9946 3.25 12 3.25ZM12 9.25C11.555 9.25 11.12 9.11804 10.75 8.87081C10.38 8.62357 10.0916 8.27217 9.92127 7.86104C9.75097 7.4499 9.70642 6.9975 9.79323 6.56105C9.88005 6.12459 10.0943 5.72368 10.409 5.40901C10.7237 5.09434 11.1246 4.88005 11.561 4.79323C11.9975 4.70642 12.4499 4.75097 12.861 4.92127C13.2722 5.09157 13.6236 5.37996 13.8708 5.74997C14.118 6.11998 14.25 6.55499 14.25 7C14.25 7.59674 14.0129 8.16903 13.591 8.59099C13.169 9.01295 12.5967 9.25 12 9.25ZM22.5 0.25H1.5C1.30109 0.25 1.11032 0.329018 0.96967 0.46967C0.829018 0.610322 0.75 0.801088 0.75 1V13C0.75 13.1989 0.829018 13.3897 0.96967 13.5303C1.11032 13.671 1.30109 13.75 1.5 13.75H22.5C22.6989 13.75 22.8897 13.671 23.0303 13.5303C23.171 13.3897 23.25 13.1989 23.25 13V1C23.25 0.801088 23.171 0.610322 23.0303 0.46967C22.8897 0.329018 22.6989 0.25 22.5 0.25ZM18.1547 12.25H5.84531C5.5935 11.3984 5.13263 10.6233 4.50467 9.99533C3.87671 9.36737 3.10162 8.90649 2.25 8.65469V5.34531C3.10162 5.0935 3.87671 4.63263 4.50467 4.00467C5.13263 3.37671 5.5935 2.60162 5.84531 1.75H18.1547C18.4065 2.60162 18.8674 3.37671 19.4953 4.00467C20.1233 4.63263 20.8984 5.0935 21.75 5.34531V8.65469C20.8984 8.90649 20.1233 9.36737 19.4953 9.99533C18.8674 10.6233 18.4065 11.3984 18.1547 12.25ZM21.75 3.75344C20.8504 3.3667 20.1333 2.64964 19.7466 1.75H21.75V3.75344ZM4.25344 1.75C3.8667 2.64964 3.14964 3.3667 2.25 3.75344V1.75H4.25344ZM2.25 10.2466C3.14964 10.6333 3.8667 11.3504 4.25344 12.25H2.25V10.2466ZM19.7466 12.25C20.1333 11.3504 20.8504 10.6333 21.75 10.2466V12.25H19.7466Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">السعر الأصلي</div>
                  <div className="">
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.price
                    }
                  </div>
                </div>
              </div>
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.25C11.2583 3.25 10.5333 3.46993 9.91661 3.88199C9.29993 4.29404 8.81928 4.87971 8.53545 5.56494C8.25162 6.25016 8.17736 7.00416 8.32205 7.73159C8.46675 8.45902 8.8239 9.1272 9.34835 9.65165C9.8728 10.1761 10.541 10.5333 11.2684 10.6779C11.9958 10.8226 12.7498 10.7484 13.4351 10.4645C14.1203 10.1807 14.706 9.70007 15.118 9.08339C15.5301 8.4667 15.75 7.74168 15.75 7C15.75 6.00544 15.3549 5.05161 14.6517 4.34835C13.9484 3.64509 12.9946 3.25 12 3.25ZM12 9.25C11.555 9.25 11.12 9.11804 10.75 8.87081C10.38 8.62357 10.0916 8.27217 9.92127 7.86104C9.75097 7.4499 9.70642 6.9975 9.79323 6.56105C9.88005 6.12459 10.0943 5.72368 10.409 5.40901C10.7237 5.09434 11.1246 4.88005 11.561 4.79323C11.9975 4.70642 12.4499 4.75097 12.861 4.92127C13.2722 5.09157 13.6236 5.37996 13.8708 5.74997C14.118 6.11998 14.25 6.55499 14.25 7C14.25 7.59674 14.0129 8.16903 13.591 8.59099C13.169 9.01295 12.5967 9.25 12 9.25ZM22.5 0.25H1.5C1.30109 0.25 1.11032 0.329018 0.96967 0.46967C0.829018 0.610322 0.75 0.801088 0.75 1V13C0.75 13.1989 0.829018 13.3897 0.96967 13.5303C1.11032 13.671 1.30109 13.75 1.5 13.75H22.5C22.6989 13.75 22.8897 13.671 23.0303 13.5303C23.171 13.3897 23.25 13.1989 23.25 13V1C23.25 0.801088 23.171 0.610322 23.0303 0.46967C22.8897 0.329018 22.6989 0.25 22.5 0.25ZM18.1547 12.25H5.84531C5.5935 11.3984 5.13263 10.6233 4.50467 9.99533C3.87671 9.36737 3.10162 8.90649 2.25 8.65469V5.34531C3.10162 5.0935 3.87671 4.63263 4.50467 4.00467C5.13263 3.37671 5.5935 2.60162 5.84531 1.75H18.1547C18.4065 2.60162 18.8674 3.37671 19.4953 4.00467C20.1233 4.63263 20.8984 5.0935 21.75 5.34531V8.65469C20.8984 8.90649 20.1233 9.36737 19.4953 9.99533C18.8674 10.6233 18.4065 11.3984 18.1547 12.25ZM21.75 3.75344C20.8504 3.3667 20.1333 2.64964 19.7466 1.75H21.75V3.75344ZM4.25344 1.75C3.8667 2.64964 3.14964 3.3667 2.25 3.75344V1.75H4.25344ZM2.25 10.2466C3.14964 10.6333 3.8667 11.3504 4.25344 12.25H2.25V10.2466ZM19.7466 12.25C20.1333 11.3504 20.8504 10.6333 21.75 10.2466V12.25H19.7466Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">الخصم (%)</div>
                  <div className="">
                    {Number.parseInt(
                      memberMembership?.data?.user_session?.discount
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.25C11.2583 3.25 10.5333 3.46993 9.91661 3.88199C9.29993 4.29404 8.81928 4.87971 8.53545 5.56494C8.25162 6.25016 8.17736 7.00416 8.32205 7.73159C8.46675 8.45902 8.8239 9.1272 9.34835 9.65165C9.8728 10.1761 10.541 10.5333 11.2684 10.6779C11.9958 10.8226 12.7498 10.7484 13.4351 10.4645C14.1203 10.1807 14.706 9.70007 15.118 9.08339C15.5301 8.4667 15.75 7.74168 15.75 7C15.75 6.00544 15.3549 5.05161 14.6517 4.34835C13.9484 3.64509 12.9946 3.25 12 3.25ZM12 9.25C11.555 9.25 11.12 9.11804 10.75 8.87081C10.38 8.62357 10.0916 8.27217 9.92127 7.86104C9.75097 7.4499 9.70642 6.9975 9.79323 6.56105C9.88005 6.12459 10.0943 5.72368 10.409 5.40901C10.7237 5.09434 11.1246 4.88005 11.561 4.79323C11.9975 4.70642 12.4499 4.75097 12.861 4.92127C13.2722 5.09157 13.6236 5.37996 13.8708 5.74997C14.118 6.11998 14.25 6.55499 14.25 7C14.25 7.59674 14.0129 8.16903 13.591 8.59099C13.169 9.01295 12.5967 9.25 12 9.25ZM22.5 0.25H1.5C1.30109 0.25 1.11032 0.329018 0.96967 0.46967C0.829018 0.610322 0.75 0.801088 0.75 1V13C0.75 13.1989 0.829018 13.3897 0.96967 13.5303C1.11032 13.671 1.30109 13.75 1.5 13.75H22.5C22.6989 13.75 22.8897 13.671 23.0303 13.5303C23.171 13.3897 23.25 13.1989 23.25 13V1C23.25 0.801088 23.171 0.610322 23.0303 0.46967C22.8897 0.329018 22.6989 0.25 22.5 0.25ZM18.1547 12.25H5.84531C5.5935 11.3984 5.13263 10.6233 4.50467 9.99533C3.87671 9.36737 3.10162 8.90649 2.25 8.65469V5.34531C3.10162 5.0935 3.87671 4.63263 4.50467 4.00467C5.13263 3.37671 5.5935 2.60162 5.84531 1.75H18.1547C18.4065 2.60162 18.8674 3.37671 19.4953 4.00467C20.1233 4.63263 20.8984 5.0935 21.75 5.34531V8.65469C20.8984 8.90649 20.1233 9.36737 19.4953 9.99533C18.8674 10.6233 18.4065 11.3984 18.1547 12.25ZM21.75 3.75344C20.8504 3.3667 20.1333 2.64964 19.7466 1.75H21.75V3.75344ZM4.25344 1.75C3.8667 2.64964 3.14964 3.3667 2.25 3.75344V1.75H4.25344ZM2.25 10.2466C3.14964 10.6333 3.8667 11.3504 4.25344 12.25H2.25V10.2466ZM19.7466 12.25C20.1333 11.3504 20.8504 10.6333 21.75 10.2466V12.25H19.7466Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">الضريبة (%)</div>
                  <div className="">15%</div>
                </div>
              </div>
              <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span>
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.25C11.2583 3.25 10.5333 3.46993 9.91661 3.88199C9.29993 4.29404 8.81928 4.87971 8.53545 5.56494C8.25162 6.25016 8.17736 7.00416 8.32205 7.73159C8.46675 8.45902 8.8239 9.1272 9.34835 9.65165C9.8728 10.1761 10.541 10.5333 11.2684 10.6779C11.9958 10.8226 12.7498 10.7484 13.4351 10.4645C14.1203 10.1807 14.706 9.70007 15.118 9.08339C15.5301 8.4667 15.75 7.74168 15.75 7C15.75 6.00544 15.3549 5.05161 14.6517 4.34835C13.9484 3.64509 12.9946 3.25 12 3.25ZM12 9.25C11.555 9.25 11.12 9.11804 10.75 8.87081C10.38 8.62357 10.0916 8.27217 9.92127 7.86104C9.75097 7.4499 9.70642 6.9975 9.79323 6.56105C9.88005 6.12459 10.0943 5.72368 10.409 5.40901C10.7237 5.09434 11.1246 4.88005 11.561 4.79323C11.9975 4.70642 12.4499 4.75097 12.861 4.92127C13.2722 5.09157 13.6236 5.37996 13.8708 5.74997C14.118 6.11998 14.25 6.55499 14.25 7C14.25 7.59674 14.0129 8.16903 13.591 8.59099C13.169 9.01295 12.5967 9.25 12 9.25ZM22.5 0.25H1.5C1.30109 0.25 1.11032 0.329018 0.96967 0.46967C0.829018 0.610322 0.75 0.801088 0.75 1V13C0.75 13.1989 0.829018 13.3897 0.96967 13.5303C1.11032 13.671 1.30109 13.75 1.5 13.75H22.5C22.6989 13.75 22.8897 13.671 23.0303 13.5303C23.171 13.3897 23.25 13.1989 23.25 13V1C23.25 0.801088 23.171 0.610322 23.0303 0.46967C22.8897 0.329018 22.6989 0.25 22.5 0.25ZM18.1547 12.25H5.84531C5.5935 11.3984 5.13263 10.6233 4.50467 9.99533C3.87671 9.36737 3.10162 8.90649 2.25 8.65469V5.34531C3.10162 5.0935 3.87671 4.63263 4.50467 4.00467C5.13263 3.37671 5.5935 2.60162 5.84531 1.75H18.1547C18.4065 2.60162 18.8674 3.37671 19.4953 4.00467C20.1233 4.63263 20.8984 5.0935 21.75 5.34531V8.65469C20.8984 8.90649 20.1233 9.36737 19.4953 9.99533C18.8674 10.6233 18.4065 11.3984 18.1547 12.25ZM21.75 3.75344C20.8504 3.3667 20.1333 2.64964 19.7466 1.75H21.75V3.75344ZM4.25344 1.75C3.8667 2.64964 3.14964 3.3667 2.25 3.75344V1.75H4.25344ZM2.25 10.2466C3.14964 10.6333 3.8667 11.3504 4.25344 12.25H2.25V10.2466ZM19.7466 12.25C20.1333 11.3504 20.8504 10.6333 21.75 10.2466V12.25H19.7466Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">الإجمالي</div>
                  <div className="">
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.price_after_discount
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/date.png"}
                    width={"20px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">تاريخ التجميد</div>
                  <div className="">-</div>
                </div>
              </div> */}
              {/* <div className={`col-2 d-flex justify-content-start gap-2`}>
                <span className="">
                  <img
                    src={"/assets/image/date.png"}
                    width={"20px"}
                    alt={"Icon"}
                  />
                </span>
                <div className="me-2">
                  <div className="mb-2 fw-bold">باقي التجميد</div>
                  <div className="">-</div>
                </div>
              </div> */}
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
                  <th>اجمالي</th>
                  <th>خصم فردي</th>
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
                    {
                      memberMembership?.data?.user_session?.schedule?.session
                        ?.price_after_discount
                    }
                  </td>
                  <td>
                    {/* {(
                      memberMembership?.data?.user_session?.actual_price *
                      (1 - memberMembership?.data?.user_session?.discount / 100)
                    ).toFixed(2)} */}
                    {Number.parseInt(
                      memberMembership?.data?.user_session?.discount
                    )}
                    %
                  </td>
                  <td>{memberMembership?.data?.user_session?.actual_price}</td>
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
