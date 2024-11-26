import InputField from "../../Common Components/InputField/InputField";
import styles from "./RequestDetails.module.css";
import { Formik, Form, ErrorMessage, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostEmployeeMutation } from "../../features/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";

const RequestDetails = () => {
  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    date_of_birth: "",
    notes: "",
    gender: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10 أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  const [postEmployee, { isLoading: isEmployeeLoading }] =
    usePostEmployeeMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values) => {
    // console.log(values);
    // const data = {
    //   name: values["name"],
    //   phone_number: `${values["countryCode"]}${values["phone_number"]}`,
    //   national_id: values["national_id"],
    //   date_of_birth: values["date_of_birth"],
    //   password: values["password"],
    //   role: values["role"],
    //   gender: values["gender"],
    // };
    // console.log(data);
    // try {
    //   const response = await postEmployee(data).unwrap();
    //   console.log(response);
    //   setSuccess(true);
    //   setTimeout(() => {
    //     setSuccess(false);
    //     navigate("/Home/UsersContainer");
    //     window.location.reload();
    //   }, 1000);
    // } catch (err) {
    //   console.log(err);
    //   if (
    //     Object.keys(err.data.error).includes("national_id") &&
    //     Object.keys(err.data.error).includes("phone_number")
    //   ) {
    //     setError("رقم الهاتف ورقم العضوية مسجلين مسبقاً.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   } else if (Object.keys(err.data.error).includes("phone_number")) {
    //     setError("رقم الهاتف مسجل مسبقاً.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   } else if (Object.keys(err.data.error).includes("national_id")) {
    //     setError("رقم العضوية مسجل مسبقاً.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   } else if (err.originalStatus === 403) {
    //     setError("ليس لديك الصلاحية لإضافة مجموعة.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   } else if (err.originalStatus === 401) {
    //     setError("قم بتسجيل الدخول وحاول مرة أخرى.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   } else {
    //     setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
    //     setTimeout(() => {
    //       setError("");
    //     }, 3000);
    //   }
    // }
  };

  return (
    <>
      {success && <Success text={"تم إضافة مستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/Users.png"}
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
                  <InputField name="name" label="اسم العضو" disabled />
                </div>
                <div
                  className={`col-12 col-md-6 phone-number position-relative`}
                >
                  <label
                    className="mb-2 mt-2 text-light"
                    htmlFor={"phone_number"}
                  >
                    رقم الهاتف
                  </label>
                  <div className={`position-relative`}>
                    <Field
                      name={"phone_number"}
                      id={"phone_number"}
                      disabled
                      style={{
                        width: "100%",
                        backgroundColor: "#dee2e6",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="national_id" label="رقم العضوية" disabled />
                </div>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name="date_of_birth"
                    label="تاريخ الميلاد"
                    inputType={"input"}
                    type={"date"}
                    disabled
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="notes" label="الملاحظات" disabled />
                </div>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name={"gender"}
                    label={"الجنس"}
                    inputType={"select"}
                    disabled
                  >
                    <option value={""}>اختر</option>
                    <option value={"M"}>ذكر</option>
                    <option value={"F"}>انثي</option>
                  </InputField>
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <label className="text-light">الصورة الشخصية</label>
                  {/* <img /> */}
                </div>
                <div className={`col-12 col-md-6`}>
                  <label className="text-light">صورة البطاقة الشخصية</label>
                  {/* <img /> */}
                </div>
              </div>
              <div className="row text-center mt-4 d-flex justify-content-center gap-5">
                <button className={`${styles.acceptButton}`}>
                  <div className={`d-inline-block fw-bold`}>قبول الطلب</div>
                </button>
                <button className={`${styles.cancelButton}`}>
                  <div className={`d-inline-block fw-bold`}>رفض الطلب</div>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
