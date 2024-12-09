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

const DynamicComponent = ({ setCoupons, setSessions, setMembers }) => {
  const { values } = useFormikContext();
  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError,
  } = useGetAllMembersQuery("/?filter{is_active}=true");
  console.log(members);

  useEffect(() => {
    setMembers(members);
  }, [members, setMembers]);

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
  } = useGetSessionsWithSchedulesQuery("?filter{is_active}=true");
  console.log(sessions);

  useEffect(() => {
    setSessions(sessions);
  }, [sessions, setSessions]);

  const {
    data: coupons,
    isLoading: isCouponsLoading,
    error: couponsError,
  } = useGetCouponsQuery("");
  console.log(coupons);
  useEffect(() => {
    setCoupons(coupons);
  }, [coupons, setCoupons]);
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
    } else {
      setPromo([``, 0, ``]);
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
      setSessionPrice(0);
    }
  }, [values.group, sessions]);

  const dispatch = useDispatch();

  const discountValue = (type, value, price) => {
    if (type === "percentage") {
      if (value >= 100 || value < 1) {
        return 0;
      } else {
        return ((value / 100) * price).toFixed(2);
      }
    } else if (type === "price") {
      return +value;
    } else {
      return 0;
    }
  };

  const priceBeforeTaxes = (discount, promoType, promoValue, price) => {
    const disValue = discountValue("percentage", +discount, +price);
    const pValue = discountValue(`${promoType}`, promoValue, +price);
    if (+disValue + +promoValue > +price) {
      return 0;
    } else {
      return +price - (+disValue + +pValue);
    }
  };

  const taxes = (discount, promoType, promoValue, price) => {
    const fPrice = priceBeforeTaxes(discount, promoType, promoValue, price);
    if (+fPrice > 0) {
      return fPrice * (15 / 100);
    } else {
      return 0;
    }
  };

  const priceAfterTaxes = (priceBeforeTaxes, taxes) => {
    if (+priceBeforeTaxes + +taxes > 0) {
      dispatch(setReceiptPaid((+priceBeforeTaxes + +taxes).toFixed(2)));
      return (+priceBeforeTaxes + +taxes).toFixed(2);
    } else {
      dispatch(setReceiptPaid(0));
      return 0;
    }
  };

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
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
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
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى
        </div>
      );
    } else {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      <div className="row">
        <div className={`col-12 col-lg-6`}>
          <div
            className={`${styles.section} col-12 d-grid gap-3 rounded-2 pb-5 pt-3 pe-5 ps-5`}
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
                {sessions?.data?.sessions
                  ?.filter((session) => session.schedules.length > 0)
                  .map((session, i) => (
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
        <div className={`col-12 col-lg-6 mt-3 mt-lg-0 text-light`}>
          <div
            className={`${styles.section} col-12 rounded-2 pb-5 pt-3 pe-5 ps-5`}
            style={{
              // backgroundColor: "white",
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
            <div className={`col-12 mt-4 ps-2 pe-2 text-light`}>
              <div className="row gap-3  mb-3">
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الخصم</span>
                  <span>{sessionPrice ? sessionPrice : "0"} ريال</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الخصم ({values.discount}%)</span>
                  <span>
                    {discountValue(
                      "percentage",
                      values.discount,
                      +sessionPrice
                    )}{" "}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>قيمة البرومو كود </span>
                  <span>
                    {discountValue(promo[0], promo[1], +sessionPrice)} ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الضريبة</span>
                  <span>
                    {priceBeforeTaxes(
                      +values.discount,
                      promo[0],
                      +promo[1],
                      +sessionPrice
                    ).toFixed(2)}{" "}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الضريبة (15%) </span>
                  <span>
                    {taxes(
                      +values.discount,
                      promo[0],
                      +promo[1],
                      +sessionPrice
                    ).toFixed(2)}{" "}
                    ريال
                  </span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الاجمالي</span>
                  <span>
                    {priceAfterTaxes(
                      priceBeforeTaxes(
                        +values.discount,
                        promo[0],
                        +promo[1],
                        +sessionPrice
                      ),
                      taxes(
                        +values.discount,
                        promo[0],
                        +promo[1],
                        +sessionPrice
                      )
                    )}{" "}
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const discountValue = (type, value, price) => {
    if (type === "percentage") {
      if (value >= 100 || value < 1) {
        return 0;
      } else {
        return ((value / 100) * price).toFixed(2);
      }
    } else if (type === "price") {
      return +value;
    } else {
      return 0;
    }
  };

  const priceBeforeTaxes = (discount, promoType, promoValue, price) => {
    const disValue = discountValue("percentage", +discount, +price);
    const pValue = discountValue(`${promoType}`, promoValue, +price);
    if (+disValue + +promoValue > +price) {
      return 0;
    } else {
      return +price - (+disValue + +pValue);
    }
  };

  const taxes = (discount, promoType, promoValue, price) => {
    const fPrice = priceBeforeTaxes(discount, promoType, promoValue, price);
    if (+fPrice > 0) {
      return fPrice * (15 / 100);
    } else {
      return 0;
    }
  };

  const priceAfterTaxes = (priceBeforeTaxes, taxes) => {
    if (+priceBeforeTaxes + +taxes > 0) {
      dispatch(setReceiptPaid((+priceBeforeTaxes + +taxes).toFixed(2)));
      return (+priceBeforeTaxes + +taxes).toFixed(2);
    } else {
      dispatch(setReceiptPaid(0));
      return 0;
    }
  };

  const dispatch = useDispatch();
  const receiptState = useSelector((state) => state.receipt);
  const [members, setMembers] = useState({});
  const [sessions, setSessions] = useState({});
  const [coupons, setCoupons] = useState({});
  const receiptStatus = useSelector((state) => state.receipt);

  const handleSubmit = async (values) => {
    console.log(values);
    const uniqeId = new Date().getTime();
    console.log(parseInt(receiptState.paid).toFixed(2));
    dispatch(setReceiptId(uniqeId));
    let data = {};
    if (values.promo_code === "") {
      data = {
        schedule: values.schedule,
        user: values.name,
        discount: values.discount === "" ? "0" : values.discount,
        start_date: values.start_date,
        paid_money: receiptState.paid,
        // payment_method: values.payment_method,
        receipt_id: uniqeId,
      };
    } else {
      data = {
        schedule: values.schedule,
        user: values.name,
        discount: values.discount === "" ? "0" : values.discount,
        start_date: values.start_date,
        paid_money: receiptState.paid,
        // payment_method: values.payment_method,
        coupon: values.promo_code,
        receipt_id: uniqeId,
      };
    }
    try {
      const response = await postSessionMember(data).unwrap();
      console.log(response);
      dispatch(setReceipt(true));
      setSuccess(true);
      const sessionPrice = sessions?.data?.sessions?.find(
        (session) => +session.id === +values.group
      )?.price;
      const couponType = coupons?.data?.find(
        (coupon) => +coupon.id === +values.promo_code
      )?.discount_type;
      const couponValue = coupons?.data?.find(
        (coupon) => +coupon.id === +values.promo_code
      )?.discount_value;
      const couponName = coupons?.data?.find(
        (coupon) => +coupon.id === +values.promo_code
      )?.code;
      const price = taxes(
        +values.discount,
        couponType,
        +couponValue,
        +sessionPrice
      );
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
          totalBT={priceBeforeTaxes(
            +values.discount,
            couponType,
            +couponValue,
            +sessionPrice
          )}
          taxes={price}
          fTotal={priceAfterTaxes(
            priceBeforeTaxes(
              +values.discount,
              couponType,
              +couponValue,
              +sessionPrice
            ),
            price
          )}
          startDate={values.start_date}
          national_id={
            members?.data?.users?.find((member) => +member.id === +values.name)
              ?.national_id
          }
          promo={couponName}
          promoValue={discountValue(couponType, +couponValue, +sessionPrice)}
          url={receiptStatus.id}
          admin={localStorage.getItem("name of logged in user ")}
        />
      );
      // Generate PDF blob
      const blob = await pdf(doc).toBlob();
      // Open in new tab and trigger print dialog
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
      setTimeout(() => {
        dispatch(setReceipt(false));
        setSuccess(false);
        // navigate("/Home/GroupsContainer");
        // window.location.reload();
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
      } else if (
        err.data.error.detail[0].startsWith(
          "The period exceeds allowed freezing days."
        )
      ) {
        setError("عفوا التاريخ الذي أدخلته يتخطى الحد المسموح به");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.data.error.detail[0].startsWith("You paid")) {
        setError("عفوا التاريخ الذي أدخلته يتخطى الحد المسموح به");
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
        <div className="  rounded-2 p-4" style={{ backgroundColor: "#5f5e5e" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setStatus }) => {
              return (
                <Form className={`d-grid gap-3`}>
                  <DynamicComponent
                    setMembers={setMembers}
                    setSessions={setSessions}
                    setCoupons={setCoupons}
                  />
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
