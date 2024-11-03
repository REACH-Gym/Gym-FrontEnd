import InputField from "../../Common Components/InputField/InputField";
import styles from "./EditUser.module.css";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useGetEmployeesQuery,
  usePatchEmployeeMutation,
} from "../../features/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import { Commet } from "react-loading-indicators";
import PhoneInput from "react-phone-input-2";

const DynamicComponent = () => {
  const { values, setFieldValue } = useFormikContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={`row ${styles.editForm}`}>
        <div className={`col-6`}>
          <InputField name="name" label="اسم العضو" />
        </div>
        <div className={`col-6 phone-number position-relative`}>
          <label className="mb-2 mt-2 text-secondary" htmlFor={"phone_number"}>
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
            <div className={`countryCode`}>
              <PhoneInput
                country={"sa"} // Default country
                value={values.countryCode}
                onChange={(value) => setFieldValue("countryCode", value)}
                inputProps={{
                  name: "countryCode",
                  required: true,
                  autoFocus: true,
                }}
              />
            </div>
          </div>
          <ErrorMessage
            name={"phone_number"}
            component="div"
            className={"text-danger"}
          />
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField name="national_id" label="رقم العضوية" />
        </div>
        <div className={`col-6`}>
          <InputField
            name="date_of_birth"
            label="تاريخ الميلاد"
            inputType={"input"}
            type={"date"}
          />
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField name="role" label="الوظيفة" inputType={"select"}>
            <option value={""}>اختر</option>
            <option value={"S"}>مشرف العام</option>
            <option value={"A"}>محاسب</option>
            <option value={"T"}>مدرب</option>
            <option value={"R"}>موظف استقبال</option>
          </InputField>
        </div>
        <div className={`col-6`}>
          <InputField name={"national_id"} label={"رقم العضوية"} />
        </div>
        <div className={`col-6 position-relative`}>
          <label className="d-block mt-2" htmlFor="password">
            كلمة السر
          </label>
          <InputField
            className="createNewPasswordForm__input mt-2 p-2"
            name="password"
            id="password"
            type={show ? "text" : "password"}
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
              <img
                src="/assets/image/close eye.png"
                alt="hide password"
                width={"20px"}
                height={"20px"}
              />
            ) : (
              <img
                src="/assets/image/open eye.png"
                alt="show password"
                width={"20px"}
                height={"20px"}
              />
            )}
          </span>
          <ErrorMessage
            name="new_password"
            component="div"
            className="text-danger mt-2"
          />
        </div>
      </div>
      <div className={`row`}>
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

const EditUser = () => {
  const { userId } = useParams();
  const setFieldValueRef = useRef(null);
  const { data: userData, isLoading: isUserLoading } = useGetEmployeesQuery(
    `/${userId}`
  );
  console.log(userData);

  useEffect(() => {
    if (userData?.data?.user?.name) {
      setFieldValueRef.current("name", userData?.data?.user?.name);
    }
    if (userData?.data?.user?.phone_number) {
      setFieldValueRef.current(
        "phone_number",
        userData?.data?.user?.phone_number
      );
    }
    if (userData?.data?.user?.national_id) {
      setFieldValueRef.current(
        "national_id",
        userData?.data?.user?.national_id
      );
    }
    if (userData?.data?.user?.date_of_birth) {
      setFieldValueRef.current(
        "date_of_birth",
        userData?.data?.user?.date_of_birth
      );
    }
    if (userData?.data?.user?.role) {
      setFieldValueRef.current("role", userData?.data?.user?.role);
    }
    if (userData?.data?.user?.gender) {
      setFieldValueRef.current("gender", userData?.data?.user?.gender);
    }
  }, [userData]);

  const initialValues = {
    name: userData?.id,
    phone_number: userData?.phone_number,
    national_id: userData?.national_id,
    date_of_birth: userData?.date_of_birth,
    role: userData?.role,
    gender: userData?.gender,
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    role: Yup.string().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
    password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز"),
  });

  const [editEmployee, { isLoading: isEmployeeLoading }] =
    usePatchEmployeeMutation("/?filter{is_active}=true");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  console.log(error);
  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      [values["name"].length > 0 ? "name" : null]: values["name"],
      [values["national_id"].length > 0 ? "national_id" : null]:
        values["national_id"],
      [values["date_of_birth"].length > 0 ? "date_of_birth" : null]:
        values["date_of_birth"],
      [values["role"].length > 0 ? "role" : null]: values["role"],
      [values["gender"].length > 0 ? "gender" : null]: values["gender"],
      [values["phone_number"].length > 0 ? "phone_number" : null]:
        values["phone_number"],
      [values["password"].length > 0 ? "password" : null]: values["password"],
    };
    console.log(data);
    try {
      const response = await editEmployee({ id: userId, data: data }).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/UsersContainer");
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (
        Object.keys(err.data.error).includes("national_id") &&
        Object.keys(err.data.error).includes("phone_number")
      ) {
        setError("رقم العضوية مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("phone_number")) {
        setError("رقم الهاتف مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("national_id")) {
        setError("رقم الهاتف ورقم العضوية مسجلين مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 400) {
        console.log(err);
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

  if (isUserLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      {success && <Success text={"تم تعديل المستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 1} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/Users.png"}
          title={"تعديل بيانات المستخدم"}
          subTitle={"يمكنك تعديل بيانات المستخدم من هنا"}
        />
        <div className="container bg-white p-4 rounded-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => {
              console.log(values);
              setFieldValueRef.current = setFieldValue;
              return (
                <Form className={`d-grid gap-3`}>
                  <DynamicComponent />
                  <div className="row text-center mt-4">
                    <MainButton
                      text={"تعديل"}
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

export default EditUser;
