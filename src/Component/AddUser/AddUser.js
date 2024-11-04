import InputField from "../../Common Components/InputField/InputField";
import styles from "./AddUser.module.css";
import { Formik, Form, ErrorMessage, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostEmployeeMutation } from "../../features/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const DynamicComponent = () => {
  const [show, setShow] = useState(false);
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField name="name" label="اسم العضو" />
        </div>
        <div className={`col-6 phone-number position-relative`}>
          <label className="mb-2 mt-2 text-light" htmlFor={"phone_number"}>
            رقم الهاتف
          </label>
          <div className={`position-relative`}>
            <Field
              name={"phone_number"}
              id={"phone_number"}
              style={{
                width: "100%",
                backgroundColor: "#F4F4F4",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                outline: "none",
                height: "52px",
              }}
            />
            <div className={`${styles.countryCode}`}>
              <PhoneInput
                country={"sa"} // Default country
                value={values.countryCode}
                onChange={(value) =>
                  setFieldValue("countryCode", value.target.value)
                }
                inputProps={{
                  name: "countryCode",
                  required: true,
                  autoFocus: true,
                }}
              />
            </div>
          </div>
          <ErrorMessage
            name="phone_number"
            component="div"
            className="text-danger"
          />
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField name="national_id" label="رقم العضوية" />
        </div>
        <div className={`col-6 position-relative`}>
          <label className="mb-2 mt-2 text-light" htmlFor={"password"}>
            كلمة السر
          </label>
          <Field
            as="input"
            type={show ? "text" : "password"}
            style={{
              width: "100%",
              backgroundColor: "#F4F4F4",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              outline: "none",
              height: "52px",
            }}
            id={"password"}
            name={"password"}
          />
          <span
            style={{
              position: "absolute",
              top: 51,
              left: 25,
              cursor: "pointer",
            }}
            onClick={() => setShow(!show)}
          >
            {!show ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 8L3.07945 4.30466C4.29638 2.84434 6.09909 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8L12.9206 11.6953C11.7036 13.1557 9.90091 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
                  fill="#000000"
                />
              </svg>
            ) : (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 16H13L10.8368 13.3376C9.96488 13.7682 8.99592 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8L3.07945 4.30466C3.14989 4.22013 3.22229 4.13767 3.29656 4.05731L0 0H3L16 16ZM5.35254 6.58774C5.12755 7.00862 5 7.48941 5 8C5 9.65685 6.34315 11 8 11C8.29178 11 8.57383 10.9583 8.84053 10.8807L5.35254 6.58774Z"
                  fill="#000000"
                />
                <path
                  d="M16 8L14.2278 10.1266L7.63351 2.01048C7.75518 2.00351 7.87739 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8Z"
                  fill="#000000"
                />
              </svg>
            )}
          </span>
          <ErrorMessage
            name={"password"}
            component="div"
            className="error-message"
          />
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField
            name="date_of_birth"
            label="تاريخ الميلاد"
            inputType={"input"}
            type={"date"}
          />
        </div>
        <div className={`col-6`}>
          <InputField name="role" label="الوظيفة" inputType={"select"}>
            <option value={""}>اختر</option>
            <option value={"S"}>مشرف العام</option>
            <option value={"A"}>محاسب</option>
            <option value={"T"}>مدرب</option>
            <option value={"R"}>موظف استقبال</option>
          </InputField>
        </div>
      </div>
      <div className="row">
        <div className={`col-6`}>
          <InputField name={"gender"} label={"الجنس"} inputType={"select"}>
            <option value={""}>اختر</option>
            <option value={"M"}>ذكر</option>
            <option value={"F"}>انثي</option>
          </InputField>
        </div>
      </div>
    </>
  );
};

const AddUser = () => {
  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    date_of_birth: "",
    password: "",
    role: "",
    gender: "",
    countryCode: "966",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string()
      .max(11, "يجب ان يكون رقم الهاتف أقل من 11 رقم")
      .required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز")
      .required("هذا الحقل الزامي"),
    role: Yup.string().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
    countryCode: Yup.string().required("هذا الحقل الزامي"),
  });

  const [postEmployee, { isLoading: isEmployeeLoading }] =
    usePostEmployeeMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      name: values["name"],
      phone_number: `${values["countryCode"]}${values["phone_number"]}`,
      national_id: values["national_id"],
      date_of_birth: values["date_of_birth"],
      password: values["password"],
      role: values["role"],
      gender: values["gender"],
    };
    console.log(data);
    try {
      const response = await postEmployee(data).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/UsersContainer");
        window.location.reload();
      }, 1000);
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

  return (
    <>
      {success && <Success text={"تم إضافة مستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/Users.png"}
          title={"إضافة مستخدم"}
          subTitle={"يمكنك إضافة مستخدم من هنا"}
        />
        <div className="rounded-2" style={{backgroundColor:"#373636" , padding:"50px"}}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {
              return (
                <Form className={`d-grid gap-3`}>
                  <DynamicComponent />
                  <div className="row text-center mt-4">
                    <MainButton
                      text={"اضافة"}
                      btnWidth={"200px"}
                      btnType={"submit"}
                      isLoading={isEmployeeLoading}
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

export default AddUser;
