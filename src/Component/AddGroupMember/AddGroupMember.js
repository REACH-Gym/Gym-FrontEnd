import InputField from "../../Common Components/InputField/InputField";
import styles from "./AddGroupMember.module.css";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useGetAllMembersQuery,
  usePostSessionMemberMutation,
  useGetSessionsWithSchedulesQuery,
  useGetCouponsQuery,
} from "../../features/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceipt,
  setReceiptId,
  setReceiptPaid,
} from "../../features/receiptSlice";
import QRCode from "qrcode";

// Define styles
Font.register({
  family: "Almarai",
  src: "/assets/fonts/Almarai-Regular.ttf",
});
const style = StyleSheet.create({
  page: {
    width: "80mm", // Set width for receipt printer paper
    padding: "0.5 0.5 0",
    fontFamily: "Almarai",
    fontSize: 4.5,
    textAlign: "right", // Align text to the right for RTL
    direction: "rtl", // Set text direction to RTL
  },
  section: {
    margin: 1,
    padding: 1,
  },
  logo: {
    width: 30, // Set the width of the image
    height: 30, // Set the height of the image
    marginBottom: 4, // Add spacing below the image
    marginRight: "auto", // Add spacing to the right of the image
    marginLeft: "auto", // Add spacing to the right of the image
  },
  title: {
    textAlign: "center",
    marginBottom: 2,
    fontSize: 4,
    padding: "2px 0",
    borderBottom: "0.5px dashed #000",
  },
  text: {
    fontSize: 3.5,
    marginBottom: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 2,
    marginBottom: 3,
    borderStyle: "solid",
    borderWidth: 0.2,
    borderColor: "#000",
    fontSize: 3.5,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%", // Adjust the width as needed
    borderStyle: "solid",
    borderWidth: 0.2,
    borderColor: "#000",
    padding: 1,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  footer: {
    fontSize: 3.5,
    padding: 2,
    borderTop: "0.5px solid #000",
    width: "100%",
    marginTop: 1,
    textAlign: "center",
  },
});
const arabicRegex = /[\u0600-\u06FF]/;
const englishRegex = /[A-Za-z]/;
const ReceiptDocument = ({
  customerName,
  phone_number,
  group,
  discount,
  totalBT,
  taxes,
  fTotal,
  total,
  startDate,
  national_id,
  promo,
  promoValue,
  url,
  admin,
}) => {
  const [hasArabicC, setHasArabicC] = useState(arabicRegex.test(customerName));
  const [hasEnglishC, setHasEnglishC] = useState(
    englishRegex.test(customerName)
  );
  function addMonthToDate(startDate) {
    const date = new Date(startDate); // Create a new Date object from the starting date
    date.setMonth(date.getMonth() + 1); // Add one month to the current month
    return date; // Return the new date
  }

  useEffect(() => {
    setHasArabicC(arabicRegex.test(customerName));
    setHasEnglishC(englishRegex.test(customerName));
  }, [customerName, group]);
  const now = new Date();

  console.log(now);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const readableDate = now.toLocaleString("en-US", options);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`http://104.248.251.235:8000/receipt/${url}`)
      .then((dataUrl) => {
        setQrCodeDataUrl(dataUrl);
        console.log(dataUrl);
      })
      .catch((error) => console.log("Error generating QR code: ", error));
  }, [url]);

  return (
    <Document>
      <Page size={[80, 200]} style={style.page}>
        <View style={style.section}>
          <Image style={style.logo} src={"/assets/image/Logo1.png"} />
          <Text style={{ textAlign: "center", fontSize: 4, marginBottom: 2 }}>
            (فاتورة ضريبية مبسطة)
          </Text>
          <Text style={{ textAlign: "center" }}>Balance Fitness Complix</Text>
          <Text style={style.title}>{url}</Text>
          <Text style={style.text}>التاريخ والوقت: {readableDate}</Text>
          <Text style={style.text}>اسم المستخدم:{admin}</Text>
          <Text style={style.text}>
            {hasArabicC && !hasEnglishC
              ? `اسم العضو: ${customerName}`
              : `${customerName} :اسم العضو`}
          </Text>
          <Text style={style.text}>رقم الهاتف: {phone_number}</Text>
          <Text style={style.text}>الرقم الضريبي: 311051035700003</Text>
          <Text style={style.text}>رقم العضوية: {national_id}</Text>
          <View style={style.table}>
            {/* Table Header */}
            <View style={[style.tableRow, style.tableHeader]}>
              <Text style={style.tableCol}>الإجمالي</Text>
              <Text style={style.tableCol}>الى</Text>
              <Text style={style.tableCol}>من</Text>
              <Text style={style.tableCol}>البيان</Text>
            </View>
            {/* Table Rows */}
            <View style={style.tableRow}>
              <Text style={style.tableCol}>{total}</Text>
              <Text style={style.tableCol}>
                {addMonthToDate(startDate).toISOString().split("T")[0]
                  ? addMonthToDate(startDate).toISOString().split("T")[0]
                  : "-"}
              </Text>
              <Text style={style.tableCol}>{startDate}</Text>
              <Text style={style.tableCol}>{group}</Text>
            </View>
          </View>
          <Text style={style.text}>
            الخصم (%{discount}): {(total * (discount / 100)).toFixed(2)}ريال
          </Text>
          <Text style={style.text}>
            قيمته: {promoValue} ريال - {promo} :البرومو كود
          </Text>
          <Text style={style.text}>الإجمالي قبل الضريبة: {totalBT}ريال</Text>
          <Text style={style.text}>الضريبة (%15): {taxes}ريال</Text>
          <Text style={style.text}>الإجمالي: {fTotal}ريال</Text>
          {qrCodeDataUrl && (
            <Image
              src={qrCodeDataUrl}
              style={{ width: 40, textAlign: "center", marginLeft: "18px" }}
            />
          )}
          <Text
            style={{
              fontSize: 4,
              textDecoration: "underline",
              textAlign: "center",
              marginTop: 1.5,
              marginBottom: 2,
            }}
          >
            الإجمالي النهائي يشمل ضريبة القيمة المضافة
          </Text>
          <Text style={{ fontSize: 3.5, textAlign: "center" }}>
            سجل تجاري / 4030431805
          </Text>
          <Text style={style.footer}>Balance Fitness Complix ©</Text>
        </View>
      </Page>
    </Document>
  );
};

const DynamicComponent = () => {
  const { values } = useFormikContext();
  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError,
  } = useGetAllMembersQuery("/?filter{is_active}=true");
  console.log(members);

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
  } = useGetSessionsWithSchedulesQuery("?filter{is_active}=true");
  console.log(sessions);

  const {
    data: coupons,
    isLoading: isCouponsLoading,
    error: couponsError,
  } = useGetCouponsQuery("");
  console.log(coupons);
  const [promo, setPromo] = useState([``, 0]);
  useEffect(() => {
    if (values.promo_code !== "") {
      setPromo([
        coupons?.data?.find((coupon) => +coupon.id === +values.promo_code)
          ?.discount_type,
        coupons?.data?.find((coupon) => +coupon.id === +values.promo_code)
          ?.discount_value,
        coupons?.data?.find((coupon) => +coupon.id === +values.promo_code)
          ?.code,
      ]);
    }
  }, [values.promo_code, coupons]);

  const [sessionSchedules, setSesstionSchedules] = useState([]);
  const [sessionPrice, setSessionPrice] = useState(0);
  useEffect(() => {
    if (values.group !== "") {
      setSessionPrice(
        sessions?.data?.sessions?.find(
          (session) => +session.id === +values.group
        )?.price
      );
      console.log(sessions?.data?.sessions);
      try {
        setSesstionSchedules([]);
        for (let i = 0; i < sessions?.data?.sessions?.length; i++) {
          console.log(sessions?.data?.sessions[i]);
          if (+sessions?.data?.sessions[i].id === +values.group) {
            for (
              let j = 0;
              j < sessions?.data?.sessions[i]?.schedules?.length;
              j++
            ) {
              console.log(sessions?.data?.sessions[i]?.schedules[j]);
              const newArray = [sessions?.data?.sessions[i]?.schedules[j].id];
              for (const key in sessions?.data?.sessions[i]?.schedules[j]) {
                console.log(key);
                if (
                  key === "saturday" ||
                  key === "sunday" ||
                  key === "monday" ||
                  key === "tuesday" ||
                  key === "wednesday" ||
                  key === "thursday" ||
                  key === "friday"
                ) {
                  if (sessions?.data?.sessions[i]?.schedules[j][key]) {
                    newArray.push(
                      ` [${key}: ${sessions?.data?.sessions[i]?.schedules[j][key]}] `
                    );
                  }
                }
              }
              console.log(newArray);
              setSesstionSchedules((prev) => [...prev, newArray]);
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setSesstionSchedules([]);
    }
  }, [values.group, sessions]);

  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setReceiptPaid(
        promo[0] === "price"
          ? +price +
              +(
                sessionPrice *
                (1 -
                  (+values.discount + (+promo[1] / sessionPrice) * 100) / 100)
              ).toFixed(2)
          : +price +
              +(
                sessionPrice *
                (1 - (+values.discount + +promo[1]) / 100)
              ).toFixed(2)
      )
    );
  }, [sessionPrice, values.discount, promo, dispatch, price]);
  useEffect(() => {
    if (sessionPrice) {
      if (promo[0] === "price") {
        const pricePercentage = (+promo[1] / sessionPrice) * 100;
        setPrice(
          sessionPrice *
            (1 - (+values.discount + +pricePercentage) / 100) *
            (15 / 100)
        );
      } else {
        setPrice(
          sessionPrice * (1 - (+values.discount + +promo[1]) / 100) * (15 / 100)
        );
      }
    }
  }, [sessionPrice, values.discount, promo, dispatch, price]);
  const receiptStatus = useSelector((state) => state.receipt);
  useEffect(() => {
    if (receiptStatus.status) {
      const doc = (
        <ReceiptDocument
          customerName={
            members?.data?.users?.find((member) => +member.id === +values.name)
              ?.name
          }
          phone_number={
            members?.data?.users?.find((member) => +member.id === +values.name)
              ?.phone_number
          }
          group={
            sessions?.data?.sessions?.find(
              (session) => +session.id === +values.group
            )?.name
          }
          total={`${sessionPrice}`}
          discount={`${values.discount}`}
          totalBT={
            promo[0] === "price"
              ? (
                  sessionPrice *
                  (1 -
                    (+values.discount + (+promo[1] / sessionPrice) * 100) / 100)
                ).toFixed(2)
              : (
                  sessionPrice *
                  (1 - (+values.discount + +promo[1]) / 100)
                ).toFixed(2)
          }
          taxes={price}
          fTotal={
            promo[0] === "price"
              ? +price +
                +(
                  sessionPrice *
                  (1 -
                    (+values.discount + (+promo[1] / sessionPrice) * 100) / 100)
                ).toFixed(2)
              : +price +
                +(
                  sessionPrice *
                  (1 - (+values.discount + +promo[1]) / 100)
                ).toFixed(2)
          }
          startDate={values.start_date}
          national_id={
            members?.data?.users?.find((member) => +member.id === +values.name)
              ?.national_id
          }
          promo={promo[2]}
          promoValue={
            promo[0] === "price"
              ? `${promo[1]}`
              : `${(sessionPrice * (+promo[1] / 100)).toFixed(2)}`
          }
          url={receiptStatus.id}
          admin={localStorage.getItem("name of user")}
        />
      );
      // Generate PDF blob
      (async () => {
        const blob = await pdf(doc).toBlob();
        // Open in new tab and trigger print dialog
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      })();
    }
  }, [
    members?.data?.users,
    price,
    promo,
    receiptStatus,
    sessionPrice,
    sessions?.data?.sessions,
    values.discount,
    values.group,
    values.name,
    values.start_date,
  ]);
  const navigate = useNavigate();
  if (isSessionsLoading || isMembersLoading || isCouponsLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (membersError || sessionsError || couponsError) {
    if (
      membersError?.status === 403 ||
      sessionsError?.status === 403 ||
      couponsError?.status === 403
    ) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (
      membersError?.status === 401 ||
      sessionsError?.status === 401 ||
      couponsError?.status === 401
    ) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى
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
      <div className="row">
        <div className={`col-6`}>
          <div
            className={`${styles.section} col-12 d-grid gap-3 rounded-2 pb-5 pt-3 pe-5 ps-5`}
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
          >
            <div className={`col-12`}>
              <InputField name="name" label="اسم العضو" inputType={"select"}>
                <option value={""}>اختر</option>
                {members?.data?.users?.map((member, i) => (
                  <option value={member.id} key={i}>
                    {member.name} - {member.phone_number}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField
                name="group"
                label="اسم المجموعة"
                inputType={"select"}
              >
                <option value={""}>اختر</option>
                {sessions?.data?.sessions?.map((session, i) => (
                  <option value={session.id} key={i}>
                    {session.name}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField name="schedule" label="الموعد" inputType={"select"}>
                <option value={""}>اختر</option>
                {sessionSchedules?.map((schedule, i) => (
                  <option value={schedule[0]} key={i}>
                    {schedule.slice(1)}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField
                name="start_date"
                label="تاريخ البداية"
                inputType={"input"}
                type={"date"}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>
        <div className={`col-6`}>
          <div
            className={`${styles.section} col-12 rounded-2 pb-5 pt-3 pe-5 ps-5`}
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
          >
            <div className={`col-12`}>
              <InputField name="discount" label="الخصم (%)" />
            </div>
            <div className={`col-12`}>
              <InputField
                name="promo_code"
                label="برومو كود"
                inputType={"select"}
              >
                <option value={""}>اختر</option>
                {coupons?.data?.map((coupon, i) => (
                  <option value={coupon.id} key={i}>
                    {coupon.code}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField
                name="payment_method"
                label="طريقة الدفع"
                inputType={"select"}
              >
                <option value={""}>اختر</option>
                <option value={"cash"}>نقدي</option>
                <option value={"mada"}>مدى</option>
              </InputField>
            </div>
            <div className={`col-12 mt-4 ps-2 pe-2`}>
              <div className="row gap-3 text-secondary mb-3">
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الخصم</span>
                  <span>{sessionPrice ? sessionPrice : "-"} ريال</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الخصم ({values.discount}%)</span>
                  <span>
                    {(sessionPrice * (values.discount / 100)).toFixed(2) > 0
                      ? (sessionPrice * (values.discount / 100)).toFixed(2)
                      : "-"}{" "}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>قيمة البرومو كود </span>
                  <span>
                    {sessionPrice > 0
                      ? promo[0] === "price"
                        ? `${promo[1]}`
                        : `${(sessionPrice * (+promo[1] / 100)).toFixed(2)}`
                      : "-"}{" "}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الضريبة</span>
                  <span>
                    {sessionPrice > 0
                      ? promo[0] === "price"
                        ? (
                            sessionPrice *
                            (1 -
                              (+values.discount +
                                (+promo[1] / sessionPrice) * 100) /
                                100)
                          ).toFixed(2)
                        : (
                            sessionPrice *
                            (1 - (+values.discount + +promo[1]) / 100)
                          ).toFixed(2)
                      : "-"}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الضريبة (15%) </span>
                  <span>{price > 0 ? price : "-"} ريال</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الاجمالي</span>
                  <span>
                    {sessionPrice > 0
                      ? promo[0] === "price"
                        ? +price +
                          +(
                            sessionPrice *
                            (1 -
                              (+values.discount +
                                (+promo[1] / sessionPrice) * 100) /
                                100)
                          ).toFixed(2)
                        : +price +
                          +(
                            sessionPrice *
                            (1 - (+values.discount + +promo[1]) / 100)
                          ).toFixed(2)
                      : "-"}{" "}
                    ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddGroupMember = () => {
  const initialValues = {
    name: "",
    group: "",
    schedule: "",
    discount: "",
    start_date: "",
    promo_code: "",
    payment_method: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    group: Yup.string().required("هذا الحقل الزامي"),
    schedule: Yup.string().required("هذا الحقل الزامي"),
    discount: Yup.number()
      .max(100, `يجب أن يكون الخصم أقل من 100`)
      .min(0, `يجب أن يكون الخصم أكبر من 0`),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    promo_code: Yup.string().max(20, `يجب أن يكون الكود أقل من 20`),
    payment_method: Yup.string().required("هذا الحقل الزامي"),
  });

  const [postSessionMember, { isLoading: isSchedulesLoading }] =
    usePostSessionMemberMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const receiptState = useSelector((state) => state.receipt);

  const handleSubmit = async (values) => {
    console.log(values);
    const uniqeId = new Date().getTime();

    dispatch(setReceiptId(uniqeId));
    const data = {
      schedule: values.schedule,
      user: values.name,
      discount: values.discount,
      start_date: values.start_date,
      paid_money: receiptState.paid,
      // payment_method: values.payment_method,
      coupon: values.promo_code,
      receipt_id: uniqeId,
    };
    console.log(receiptState);
    console.log(data);
    const filteredObject = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => +value !== 0)
    );
    try {
      const response = await postSessionMember(filteredObject).unwrap();
      console.log(response);
      dispatch(setReceipt(true));
      setSuccess(true);
      setTimeout(() => {
        dispatch(setReceipt(false));
        setSuccess(false);
        navigate("/Home/GroupsContainer");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      if (
        err.data.error.detail[0].startsWith("This user already has an active")
      ) {
        setError("هذا العضو مشترك بالفعل.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };
  return (
    <>
      {success && <Success text={"تم إضافة عضو إلى المجموعة بنجاح! "} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/groups.png"}
          title={"إضافة عضو للمجموعة"}
          subTitle={"يمكنك إضافة عضو لمجموعة من هنا"}
        />
        <div className="container p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setStatus }) => {
              return (
                <Form className={`d-grid gap-3`}>
                  <DynamicComponent />
                  <div className="row text-center mt-4">
                    <MainButton
                      text={"اضافة"}
                      btnWidth={"200px"}
                      btnType={"submit"}
                      isLoading={isSchedulesLoading}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddGroupMember;
