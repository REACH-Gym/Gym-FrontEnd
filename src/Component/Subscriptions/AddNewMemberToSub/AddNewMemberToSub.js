import React, { useEffect, useState } from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

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
// Create the PDF document component
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
    QRCode.toDataURL(`http://104.248.251.235:3000/receipt/${url}`)
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
          <Text style={style.text}></Text>
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

function AddNewMemberToSub() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [users, setUsers] = useState([]);
  const [membership, setMemberShip] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [memberShipPrice, setMemberShipPrice] = useState(0);
  const [error, setError] = useState("");
  const [copons, setCopons] = useState(false);

  useEffect(() => {
    // fetch users
    async function fetchData() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/?filter{is_active}=true",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const user = await response.json();

        if (response.ok) {
          setUsers(user.data.users);
        } else if (response.status === 403) {
          setError("ليس لديك صلاحية لعرض هذه المعلومات");
        } else if (response.status === 401) {
          setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
        } else {
          setUsers(null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [access_token]);
  const [values, setValues] = useState({
    user: "",
    membership: "",
    notes: "",
    start_date: "",
    discount: "",
    status: "active",
    promo_code: "",
  });
  // to get memberships
  useEffect(() => {
    async function fetchMemberShips() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/memberships/?filter{is_active}=true",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setMemberShip(result.data.memberships);
        } else if (response.status === 403) {
          setError("ليس لديك صلاحية لعرض هذه المعلومات");
        } else if (response.status === 401) {
          setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
        } else {
          setMemberShip(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMemberShips();
  }, [access_token]);

  //get promo code
  useEffect(() => {
    async function fetchPromoCode() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/coupons/active_coupons/`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("access"),
            },
          }
        );
        const result = await response.json();
        console.log("promo code", result);
        if (response.ok) {
          setCopons(result.data);
          console.log("get promo code ");
        } else {
          console.log("failed to get promo code");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchPromoCode();
  }, []);
  const [promo, setPromo] = useState([``, 0, ``]);
  useEffect(() => {
    console.log(values);
    if (values.promo_code !== "") {
      console.log("coupons", copons);
      setPromo([
        copons?.find((coupon) => +coupon.id === +values[`promo_code`])
          ?.discount_type,
        copons?.find((coupon) => +coupon.id === +values[`promo_code`])
          ?.discount_value,
        copons?.find((coupon) => +coupon.id === +values[`promo_code`])?.code,
      ]);
    }
  }, [values, copons]);
  // adding member to subscriptions
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const uniqeId = new Date().getTime();
    try {
      const items = {
        user: values["user"],
        membership: values["membership"],
        notes: values["notes"],
        start_date: values["start_date"],
        discount: values["discount"],
        coupon: values["promo_code"],
        receipt_id: uniqeId,
        paid_money:
          promo[0] === "price"
            ? memberShipPrice *
                (1 -
                  (+values.discount + +(+promo[1] / memberShipPrice) * 100) /
                    100) *
                (15 / 100) +
              +(
                memberShipPrice *
                (1 -
                  (+values.discount + (+promo[1] / memberShipPrice) * 100) /
                    100)
              ).toFixed(2)
            : memberShipPrice *
                (1 - (+values.discount + +promo[1]) / 100) *
                (15 / 100) +
              +(
                memberShipPrice *
                (1 - (+values.discount + +promo[1]) / 100)
              ).toFixed(2),
      };
      const filteredObject = Object.fromEntries(
        Object.entries(items).filter(
          ([key, value]) => +value !== 0 || value !== ""
        )
      );

      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members/memberships/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(filteredObject),
        }
      );

      const subscriptions = await response.json();
      console.log(subscriptions);
      if (response.ok) {
        setLoading(false);
        const doc = (
          <ReceiptDocument
            customerName={
              users?.find((member) => +member.id === +values.user)?.name
            }
            phone_number={
              users?.find((member) => +member.id === +values.user)?.phone_number
            }
            group={
              membership?.find((session) => +session.id === +values.membership)
                ?.name
            }
            total={`${memberShipPrice}`}
            discount={`${values.discount}`}
            totalBT={(memberShipPrice * (1 - values.discount / 100)).toFixed(2)}
            taxes={`${
              memberShipPrice * (1 - values.discount / 100) * (15 / 100)
            }`}
            fTotal={
              +(memberShipPrice * (1 - values.discount / 100) * (15 / 100)) +
              +(memberShipPrice * (1 - values.discount / 100)).toFixed(2)
            }
            startDate={values.start_date}
            national_id={
              users?.find((member) => +member.id === +values.user)?.national_id
            }
            url={uniqeId}
            promo={promo[2]}
            promoValue={
              promo[0] === "price"
                ? `${promo[1]}`
                : `${(memberShipPrice * (+promo[1] / 100)).toFixed(2)}`
            }
            admin={localStorage.getItem("name of user")}
          />
        );
        // Generate PDF blob
        const blob = await pdf(doc).toBlob();
        // Open in new tab and trigger print dialog
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
        setSubscription(subscriptions.data.user_membership);
        console.log(subscriptions.data);
        setShowModal(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/Home/SubscripedMembers");
        }, 2000);
      } else if (response.status === 403) {
        setLoading(false);
        setError("ليس لديك صلاحية لعرض هذه المعلومات");
      } else if (response.status === 401) {
        setLoading(false);
        setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
      } else {
        setShowModalModalError(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const initialValues = {
    user: "",
    membership: "",
    notes: "",
    start_date: "",
    discount: "",
    status: "active",
    promo_code: "",
  };
  const validationSchema = Yup.object({
    user: Yup.string().required("هذا الحقل الزامي"),
    membership: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string(),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    discount: Yup.number().min(0).max(100),
    promo_code: Yup.string(),
  });

  const handleCloseModalError = () => {
    setShowModalModalError(false);
  };

  return (
    <div className="addNewSubscriptionsContainer mt-5">
      <Helmet>
        <title>إضافة عضو للأشتراك</title>
      </Helmet>
      {error ? (
        <div style={{ paddingTop: "200px" }}>
          <h4 className="fw-bolder texte-center text-danger text-center">
            {error}
          </h4>
        </div>
      ) : (
        <>
          <div className="pe-4  ">
            <ComponentTitle
              MainIcon={"/assets/image/subscriptions.png"}
              title={"إضافة عضو للاشتراك "}
              subTitle={"يمكنك إضافة عضو للاشتراك من هنا"}
            />
          </div>

          <div className=" ">
            <div className="">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => {
                  setValues(values);
                  return (
                    <Form className="  AddForm">
                      <div className=" d-flex justify-content-around">
                        <div className="form1 ms-5">
                          <div>
                            <InputField
                              name={"user"}
                              label={"اسم العضو"}
                              inputType={"select"}
                              className="mb-4"
                            >
                              <option value="">اختر العضو</option>
                              {users?.length > 0 ? (
                                users.map((user, index) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name} - {user.phone_number}
                                  </option>
                                ))
                              ) : (
                                <option>لا يوجد أعضاء متاحين</option>
                              )}
                            </InputField>
                          </div>
                          <div>
                            <InputField
                              name={"membership"}
                              label={"نوع الأشتراك"}
                              inputType={"select"}
                              className="mb-4"
                              onChange={(e) => {
                                const selectedMembershipId = e.target.value;
                                setFieldValue(
                                  "membership",
                                  selectedMembershipId
                                );

                                // Find the selected membership from the membership list and set the price
                                const selectedMembership = membership.find(
                                  (m) => m.id === parseInt(selectedMembershipId)
                                );
                                if (selectedMembership) {
                                  setMemberShipPrice(selectedMembership.price); // Set the membership price
                                  setFieldValue(
                                    "price",
                                    selectedMembership.price
                                  ); // Store price
                                }
                              }}
                            >
                              <option value="">اختر الاشتراك</option>
                              {membership?.length > 0 ? (
                                membership.map((membershipItem, index) => (
                                  <option
                                    key={membershipItem.id}
                                    value={membershipItem.id}
                                  >
                                    {membershipItem.name}
                                  </option>
                                ))
                              ) : (
                                <option>لاتوجد اشتراكات متاحة</option>
                              )}
                            </InputField>
                          </div>
                          <div>
                            <InputField
                              name={"start_date"}
                              label={"تاريخ البداية"}
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <InputField
                              name={"notes"}
                              label={"الملاحظات"}
                              className="mt-3 notes"
                            />
                          </div>
                        </div>
                        <div className="form2">
                          <div>
                            <InputField
                              name={"discount"}
                              label={"الخصم (%)"}
                              className="mb-3"
                            />
                          </div>
                          <div>
                            <InputField
                              name={"promo_code"}
                              label={"برمو كود"}
                              inputType={"select"}
                              className="mb-4"
                            >
                              <option value="">أختر كوبون </option>
                              {copons?.length > 0 ? (
                                copons.map((copon, index) => (
                                  <option key={copon.id} value={copon.id}>
                                    {copon.code}
                                  </option>
                                ))
                              ) : (
                                <option>لا يوجد كوبونات متاحة</option>
                              )}
                            </InputField>
                          </div>
                          <div>
                            <InputField
                              inputType={"select"}
                              name={"payment_method"}
                              label={"طريقة الدفع"}
                            >
                              <option>أختر طريقة دفع</option>
                              <option>مدي</option>
                              <option>نقدي</option>
                            </InputField>
                          </div>
                          <div className="d-flex justify-content-between mt-4">
                            <div>
                              <p>الإجمالي قبل الخصم</p>
                              <p>الخصم (%{values.discount})</p>
                              <p>قيمة البرومو كود</p>
                              <p>الإجمالي قبل الضريبة</p>
                              <p>الضريبة (%15)</p>
                              <p>الإجمالي</p>
                            </div>
                            <div>
                              <p>{memberShipPrice || 0} ريال</p>
                              <p>
                                {(
                                  memberShipPrice *
                                  (values.discount / 100)
                                ).toFixed(2) > 0
                                  ? (
                                      memberShipPrice *
                                      (values.discount / 100)
                                    ).toFixed(2)
                                  : "0"}{" "}
                                ريال
                              </p>
                              <p>
                                {memberShipPrice > 0
                                  ? promo[0] === "price"
                                    ? `${promo[1]}`
                                    : `${(
                                        memberShipPrice *
                                        (+promo[1] / 100)
                                      ).toFixed(2)}`
                                  : "-"}{" "}
                                ريال
                              </p>
                              <p>
                                {memberShipPrice > 0
                                  ? promo[0] === "price"
                                    ? (
                                        memberShipPrice *
                                        (1 -
                                          (+values.discount +
                                            (+promo[1] / memberShipPrice) *
                                              100) /
                                            100)
                                      ).toFixed(2)
                                    : (
                                        memberShipPrice *
                                        (1 -
                                          (+values.discount + +promo[1]) / 100)
                                      ).toFixed(2)
                                  : "-"}{" "}
                                ريال
                              </p>
                              <p>
                                {memberShipPrice > 0
                                  ? promo[0] === "price"
                                    ? memberShipPrice *
                                      (1 -
                                        (+values.discount +
                                          +(+promo[1] / memberShipPrice) *
                                            100) /
                                          100) *
                                      (15 / 100)
                                    : memberShipPrice *
                                      (1 -
                                        (+values.discount + +promo[1]) / 100) *
                                      (15 / 100)
                                  : "-"}{" "}
                                ريال
                              </p>
                              <p>
                                {memberShipPrice > 0
                                  ? promo[0] === "price"
                                    ? memberShipPrice *
                                        (1 -
                                          (+values.discount +
                                            +(+promo[1] / memberShipPrice) *
                                              100) /
                                            100) *
                                        (15 / 100) +
                                      +(
                                        memberShipPrice *
                                        (1 -
                                          (+values.discount +
                                            (+promo[1] / memberShipPrice) *
                                              100) /
                                            100)
                                      ).toFixed(2)
                                    : memberShipPrice *
                                        (1 -
                                          (+values.discount + +promo[1]) /
                                            100) *
                                        (15 / 100) +
                                      +(
                                        memberShipPrice *
                                        (1 -
                                          (+values.discount + +promo[1]) / 100)
                                      ).toFixed(2)
                                  : "-"}{" "}
                                ريال
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 addBtn text-center">
                        <MainButton
                          text={"اضافة"}
                          btnType={"submit"}
                          isLoading={loading}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          {/* succeess */}
          <SuccessModal isOpen={showModal}>
            <div>
              <p className="text-center mt-2  text-dark fw-bolder mb-5">
                تم اضافة العضو للأشتراك بنجاح
              </p>
            </div>
          </SuccessModal>
          {/* failed */}
          <FailedModal
            isOpen={showModalError}
            handleClose={handleCloseModalError}
          >
            <div>
              <p className="text-center mt-2  text-dark fw-bolder mb-5">
                حدث خطأ ! هذا العضو مشترك من قبل
              </p>
            </div>
          </FailedModal>
        </>
      )}
    </div>
  );
}
export default AddNewMemberToSub;
