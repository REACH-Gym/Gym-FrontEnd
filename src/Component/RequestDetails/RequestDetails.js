import InputField from "../../Common Components/InputField/InputField";
import styles from "./RequestDetails.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useEditMemberMutation,
  useGetAllMembersQuery,
  useLazyGetContractQuery,
} from "../../features/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";
import { Commet } from "react-loading-indicators";
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

const baseURL = process.env.REACT_APP_DOMAIN;

Font.register({
  family: "MarkaziText",
  fonts: [
    {
      src: "/assets/fonts/MarkaziText-Regular.ttf",
      fontWeight: "regular",
    },
    {
      src: "/assets/fonts/MarkaziText-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
const style = StyleSheet.create({
  page: {
    minWidth: "210mm", // Set width for receipt printer paper
    minHeight: "297mm", // Set width for receipt printer paper
    padding: "15 10",
    fontFamily: "MarkaziText",
    fontSize: 14,
    textAlign: "right", // Align text to the right for RTL
    direction: "rtl", // Set text direction to RTL
  },
  section: {
    margin: 5,
    padding: 5,
  },
  title: {
    textAlign: "right",
    marginTop: 20,
    marginBottom: 4,
    fontWeight: "bold",
    textDecoration: "underline",
    padding: "2px 0",
  },
  memberInformation: {
    textAlign: "right",
    display: "flex",
    direction: "rtl",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  memberInfo: {
    width: "50%",
  },
  memberInfoS: {
    width: "100%",
    marginLeft: "auto",
  },
  memberImage: {
    maxWidth: 100,
    maxHeight: 100,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  line: {
    marginRight: 5,
  },
});
const ReceiptDocument = ({
  title,
  introduction,
  terms_and_conditions,
  member_rights,
  member_duties,
  payment_terms,
  package_prices,
  arriving_at_the_club,
  classes_and_dates,
  which_prohibits_the_member,
  cancel_membership,
  communication_mechanisms,
  member,
}) => {
  const now = new Date();
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
      <Page size="A4" style={style.page}>
        <View style={style.section} wrap>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            اتفاقية ولائحة عضوية نادي
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
          {introduction.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>أولاً: الأحكام والشروط:</Text>
          {terms_and_conditions.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثانياً: حقوق الأعضاء:</Text>
          {member_rights.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثالثاً: واجبات الأعضاء:</Text>
          {member_duties.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>رابعاً: شروط الدفع:</Text>
          {payment_terms.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>
            خامساً: اسعار الباقات المدرجة على برامج العضوية:
          </Text>
          {package_prices.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>سادساً: الوصول الى النادي:</Text>
          {arriving_at_the_club.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>سابعاً: الحصص والمواعيد:</Text>
          {classes_and_dates.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>ثامناً: يحظر على العضو:</Text>
          {which_prohibits_the_member.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>تاسعاً: إلغاء العضوية:</Text>
          {cancel_membership.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
          <Text style={style.title}>عاشراً: آليات التواصل:</Text>
          {communication_mechanisms.split(".").map((line) => (
            <Text style={style.line}>{line}</Text>
          ))}
        </View>
      </Page>
      <Page size="A4" style={style.page}>
        <Text
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            marginTop: 20,
            fontSize: 15,
          }}
        >
          بيانات المشترك
        </Text>
        <View style={style.memberInformation}>
          <Text style={style.memberInfo}>
            رقم الجوال: {member.phone_number}
          </Text>
          <Text style={style.memberInfo}>الإسم: {member.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:الصورة الشخصية</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member.profile_image
                  ? member.profile_image
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
              marginLeft: "auto",
            }}
          >
            <Text style={style.memberInfo}>:صورة البطاقة الشخصية</Text>
            <Image
              style={style.memberImage}
              src={
                member.personal_card_image
                  ? member.personal_card_image
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <Text style={style.memberInfoS}>
            رقم الهوية: {member.national_id}
          </Text>
        </View>
        <Text
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            marginTop: 20,
            fontSize: 15,
          }}
        >
          التوقيعات
        </Text>
        <View style={style.memberInformation}>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:توقيع العضو</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member?.memberSignature
                  ? member.memberSignature
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 20,
              width: "50%",
            }}
          >
            <Text>:توقيع إدارة النادي</Text>
            <Image
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={
                member.gymSignature
                  ? `${baseURL}${member.gymSignature}`
                  : "/assets/image/broken-image.png"
              }
            />
          </View>
          <Text style={style.memberInfoS}>التاريخ: {readableDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

const RequestDetails = () => {
  const { RequestId } = useParams();

  const { data: userData, isLoading: isUserDataLoading } =
    useGetAllMembersQuery(`/${RequestId}`);
  console.log(userData);

  const [editMember] = useEditMemberMutation();

  const initialValues = {
    name: userData?.data?.user.name,
    phone_number: userData?.data?.user.phone_number,
    national_id: userData?.data?.user.national_id,
    date_of_birth: userData?.data?.user.date_of_birth,
    gender: userData?.data?.user.gender,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10 أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleCancel = async () => {
    try {
      const response = await editMember({
        id: RequestId,
        data: { is_verified: false },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/RejectedRequests");
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.originalStatus === 403) {
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

  const [selectedImage, setSelectedImage] = useState(
    userData?.data?.user.personal_card_image
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    userData?.data?.user.profile_image
  );
  const [signature, setSignature] = useState(
    userData?.data?.user?.electronic_signature_image
  );
  useEffect(() => {
    setSelectedProfileImage(userData?.data?.user.profile_image);
    setSelectedImage(userData?.data?.user.personal_card_image);
    setSignature(userData?.data?.user.electronic_signature_image);
  }, [
    userData?.data?.user.personal_card_image,
    userData?.data?.user.profile_image,
    userData?.data?.user.electronic_signature_image,
  ]);

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Save the selected file
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    document.getElementById("imageInput").click(); // Trigger the file input
  };

  const handleUploadProfileClick = () => {
    document.getElementById("profileImageInput").click(); // Trigger the file input
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedProfileImage(URL.createObjectURL(file)); // Save the selected file
    }
  };
  const [getContract] = useLazyGetContractQuery();
  const handleSubmit = async (values) => {
    const profileResponse = await fetch(selectedProfileImage);
    const response = await fetch(selectedImage);
    const blob = await response.blob(); // Convert the response to a Blob
    const profileBlob = await profileResponse.blob(); // Convert the response to a Blob
    const file = new File([blob], "image1.jpg", { type: blob.type });
    const profileFile = new File([profileBlob], "image2.jpg", {
      type: profileBlob.type,
    });
    // Step 2: Convert the Blob to a File
    const formattedValues = new FormData();
    formattedValues.append("name", values.name);
    formattedValues.append("phone_number", values.phone_number);
    formattedValues.append("national_id", values.national_id);
    formattedValues.append("date_of_birth", values.date_of_birth);
    formattedValues.append("gender", values.gender === "انثي" ? "F" : "M");
    formattedValues.append("is_verified", true);
    selectedProfileImage?.length > 0 &&
      formattedValues.append("profile_image", profileFile);
    selectedImage?.length > 0 &&
      formattedValues.append("personal_card_image", file);
    try {
      const response = await editMember({
        id: RequestId,
        data: formattedValues,
      }).unwrap();
      console.log(response);
      setSuccess(true);
      try {
        const response = await getContract("").unwrap();
        console.log(response);
        const member = {
          name: values.name,
          phone_number: values.phone_number,
          national_id: values.national_id,
          profile_image: selectedProfileImage,
          personal_card_image: selectedImage,
          gymSignature: response.data.signature_image,
          memberSignature: signature,
        };
        const doc = (
          <ReceiptDocument
            title={response.data.title}
            introduction={response.data.introduction}
            terms_and_conditions={response.data.terms_and_conditions}
            member_rights={response.data.member_rights}
            member_duties={response.data.member_duties}
            payment_terms={response.data.payment_terms}
            package_prices={response.data.package_prices}
            arriving_at_the_club={response.data.arriving_at_the_club}
            classes_and_dates={response.data.classes_and_dates}
            which_prohibits_the_member={
              response.data.which_prohibits_the_member
            }
            cancel_membership={response.data.cancel_membership}
            communication_mechanisms={response.data.communication_mechanisms}
            member={member}
          />
        );
        const blob = await pdf(doc).toBlob();
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      } catch (error) {
        setError("حدث خطأ في طباعة العقد!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/AcceptedRequests");
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      if (
        Object.keys(err.data.error).includes("national_id") &&
        Object.keys(err.data.error).includes("phone_number")
      ) {
        setError("رقم الهاتف ورقم العضوية مسجلين مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("phone_number")) {
        setError("رقم الهاتف مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("national_id")) {
        setError("رقم العضوية مسجل مسبقاً.");
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

  if (isUserDataLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      {success && <Success text={"تم إضافة مستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/details.svg"}
          title={"تفاصيل طلب الإشتراك"}
          subTitle={"يمكنك متابعة تفاصيل طلبات الإشتراكات من هنا  "}
        />
        <div
          className="rounded-2"
          style={{ backgroundColor: "#373636", padding: "50px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="name" label="اسم العضو" />
                </div>
                <div
                  className={`col-12 col-md-6 phone-number position-relative`}
                >
                  <InputField
                    name={"phone_number"}
                    label={"رقم الهاتف"}
                    disabled
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="national_id" label="رقم العضوية" />
                </div>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name="date_of_birth"
                    label="تاريخ الميلاد"
                    inputType={"input"}
                    type={"date"}
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name={"gender"}
                    label={"الجنس"}
                    inputType={"select"}
                  >
                    <option value={""}>اختر</option>
                    <option value={"M"}>ذكر</option>
                    <option value={"F"}>انثي</option>
                  </InputField>
                </div>
              </div>
              <div className="row g-4 mt-1 mb-5" style={{ minHeight: 120 }}>
                <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
                  <label className="text-light mb-2 align-self-start">
                    تحميل الصورة الشخصية
                  </label>
                  <img
                    src={selectedProfileImage}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      width: "fit-content",
                    }}
                  />
                  <div className="btns d-flex justify-content-center align-items-center gap-3">
                    <div
                      className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={handleUploadProfileClick}
                    >
                      تعديل
                    </div>
                    <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfileImageChange}
                    />
                    <div
                      className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={() => setSelectedProfileImage("")}
                    >
                      حذف
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
                  <label className="text-light mb-2 align-self-start">
                    تحميل صورة البطاقة الشخصية
                  </label>
                  <img
                    src={selectedImage}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      width: "fit-content",
                    }}
                  />
                  <div className="btns d-flex justify-content-center align-items-center gap-3">
                    <div
                      className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={handleUploadClick}
                    >
                      تعديل
                    </div>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <div
                      className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={() => setSelectedImage("")}
                    >
                      حذف
                    </div>
                  </div>
                </div>
              </div>
              <div className="row text-center mt-4 d-flex justify-content-center gap-5">
                <button type="submit" className={`${styles.acceptButton}`}>
                  <div className={`d-inline-block fw-bold`}>قبول الطلب</div>
                </button>
                <div
                  className={`${styles.cancelButton}`}
                  onClick={handleCancel}
                >
                  <div className={`d-inline-block fw-bold`}>رفض الطلب</div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
