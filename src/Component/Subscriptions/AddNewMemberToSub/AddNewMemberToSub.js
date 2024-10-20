import React, { useEffect, useRef, useState } from "react";
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
    padding: 1,
    fontFamily: "Almarai",
    fontSize: 5,
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
    marginBottom: 5, // Add spacing below the image
    marginRight: "auto", // Add spacing to the right of the image
    marginLeft: "auto", // Add spacing to the right of the image
  },
  title: {
    textAlign: "center",
    marginBottom: 3,
    fontSize: 4,
    padding: "2px 0",
    borderBottom: "0.5px dashed #000",
  },
  text: {
    fontSize: 3.5,
    marginBottom: 3,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 5,
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
    marginTop: 18,
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

  const formattedDate = now.toISOString();
  console.log(formattedDate);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const readableDate = now.toLocaleString("en-US", options);

  return (
    <Document>
      <Page size={[80, 200]} style={style.page}>
        <View style={style.section}>
          <Image style={style.logo} src={"/assets/image/Logo1.png"} />
          <Text style={{ textAlign: "center", fontSize: 4, marginBottom: 2 }}>
            (فاتورة ضريبية مبسطة)
          </Text>
          <Text style={{ textAlign: "center" }}>Balance Fitness Complix</Text>
          <Text style={style.title}>0543842672</Text>
          <Text style={style.text}>التاريخ والوقت: {readableDate}</Text>
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
                {addMonthToDate(startDate).toISOString().split("T")[0]}
              </Text>
              <Text style={style.tableCol}>{startDate}</Text>
              <Text style={style.tableCol}>{group}</Text>
            </View>
          </View>
          <Text style={style.text}>
            الخصم (%{discount}): {(total * (discount / 100)).toFixed(2)}ريال
          </Text>
          <Text style={style.text}>الإجمالي قبل الضريبة: {totalBT}ريال</Text>
          <Text style={style.text}>الضريبة (%15): {taxes}ريال</Text>
          <Text style={style.text}>الإجمالي: {fTotal}ريال</Text>
          <Text
            style={{
              fontSize: 4,
              textDecoration: "underline",
              textAlign: "center",
              marginTop: 10,
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
  // const [discountedTotal, setDiscountedTotal] = useState(0);

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
        } else {
          setUsers(null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [access_token]);
  const valuesRef = useRef(null);
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
  // adding member to subscriptions
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const items = {
        user: values["user"],
        membership: values["membership"],
        notes: values["notes"],
        start_date: values["start_date"],
        discount: values["discount"],
        status: "active",
      };
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members/memberships/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(items),
        }
      );

      const subscriptions = await response.json();
      console.log(subscriptions);
      if (response.ok) {
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
      } else {
        setShowModalModalError(true);
        setLoading(false);
      }
    } catch (error) {
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
  };
  const validationSchema = Yup.object({
    user: Yup.string().required("هذا الحقل الزامي"),
    membership: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string(),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    discount: Yup.number().min(0).max(100).required("هذا الحقل الزامي"),
  });

  const handleCloseModalError = () => {
    setShowModalModalError(false);
  };

  return (
    <div className="addNewSubscriptionsContainer mt-5">
      <Helmet>
        <title>إضافة عضو للأشتراك</title>
      </Helmet>
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
              valuesRef.current = values;
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
                            setFieldValue("membership", selectedMembershipId);

                            // Find the selected membership from the membership list and set the price
                            const selectedMembership = membership.find(
                              (m) => m.id === parseInt(selectedMembershipId)
                            );
                            if (selectedMembership) {
                              setMemberShipPrice(selectedMembership.price); // Set the membership price
                              setFieldValue("price", selectedMembership.price); // Store price
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
                          // onChange={(e) => {
                          //   const discountValue = e.target.value;
                          //   setFieldValue("discount", discountValue);

                          //   // Calculate discounted total
                          //   const discountAmount =
                          //     (memberShipPrice * discountValue) / 100;
                          //   const finalTotal = memberShipPrice - discountAmount;
                          //   setDiscountedTotal(finalTotal);
                          // }}
                        />
                      </div>
                      <div>
                        <InputField
                          inputType={"select"}
                          name={"promo_code"}
                          label={"برومو كود"}
                        />
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
                            {(
                              memberShipPrice *
                              (1 - values.discount / 100)
                            ).toFixed(2)}{" "}
                            ريال
                          </p>
                          <p>
                            {memberShipPrice *
                              (1 - values.discount / 100) *
                              (15 / 100)}{" "}
                            ريال
                          </p>
                          <p>
                            {+(
                              memberShipPrice *
                              (1 - values.discount / 100) *
                              (15 / 100)
                            ) +
                              +(
                                memberShipPrice *
                                (1 - values.discount / 100)
                              ).toFixed(2)}{" "}
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
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! هذا العضو مشترك من قبل
          </p>
        </div>
      </FailedModal>
    </div>
  );
}
export default AddNewMemberToSub;
