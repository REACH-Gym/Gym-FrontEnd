import InputField from "../../Common Components/InputField/InputField";
import styles from "./OfferDetails.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostEmployeeMutation } from "../../features/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";

const OfferDetails = () => {
  const [editable, setEditable] = useState(false);
  const [activated, setActivated] = useState(false);
  const initialValues = {
    offerDays: "",
  };
  const validationSchema = Yup.object({
    offerDays: Yup.string().required("هذا الحقل الزامي"),
  });
  const [postEmployee, { isLoading: isEmployeeLoading }] =
    usePostEmployeeMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values) => {
    setEditable(false);
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
                  <InputField
                    name="offerDays"
                    label="عدد الإيام الخاصة بالعرض"
                    inputType={"select"}
                    disabled={!editable}
                  >
                    <option value={""}>اختر</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                  </InputField>
                </div>
              </div>
              <div className="row text-center mt-4 d-flex justify-content-center gap-5 mt-5">
                {editable ? (
                  <button className={`${styles.acceptButton} bg-primary`}>
                    حفظ
                  </button>
                ) : (
                  <div
                    className={`${styles.acceptButton} bg-primary`}
                    type="button"
                    onClick={() => {
                      setEditable(true);
                    }}
                  >
                    تعديل
                  </div>
                )}
                <div
                  className={`${styles.cancelButton}`}
                  onClick={() => {
                    setActivated(!activated);
                  }}
                >
                  {activated ? (
                    <div className={`d-inline-block fw-bold`}>
                      إلغاء التفعيل
                    </div>
                  ) : (
                    <div className={`d-inline-block fw-bold`}>تفعيل</div>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
