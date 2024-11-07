import React, { useRef, useState } from "react";
import "./AddNewMember.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function AddNewMember() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [national_idExist, setNational_idExist] = useState(false);
  const [phone_numberExist, setPhone_numberExist] = useState(false);
  const valuesRef = useRef(null);
  const [error, setError] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (value) => {
    setLoading(true);
    console.log(value);
    try {
      const genderValue = value.gender === "انثي" ? "F" : "M";
      const items = {
        name: value["name"],
        phone_number: `${value["countryCode"]}${value["phone_number"]}`,
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        gender: genderValue,
      };
      console.log(items);
      const response = await fetch(`${api}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          accept: "application/json",
        },
        body: JSON.stringify(items),
      });

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response result:", result);
      setLoading(false);
      if (response?.status === 400) {
        for (
          let index = 0;
          index < Object.keys(result?.error).length;
          index++
        ) {
          if (Object.keys(result?.error)[index] === "national_id") {
            setNational_idExist(true);
            showModalError(false);
            showModal(false);
            console.log("national id already exist");
          } else if (Object.keys(result?.error)[index] === "phone_number") {
            setPhone_numberExist(true);
            showModalError(false);
            showModal(false);
            console.log("phone number already exist");
          }
        }
      }
      if (response.ok) {
        console.log(response);
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllMembers");
        }, 3000);
      } else if (response.status === 403) {
        setError("ليس لديك صلاحية لعرض هذه المعلومات");
      } else if (response.status === 401) {
        setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
      } else {
        console.log(response);
        setShowModalError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string()
      .max(11, "يجب أن يكون رقم الهاتف أقل من 11 رقم")
      .required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز")
      .required("هذا الحقل الزامي"),
    notes: Yup.string(),
    date_of_birth: Yup.date().required("هذا الحقل الزامي").max("2-5-3000"),
    gender: Yup.string().required("هذا الحقل الزامي"),
    countryCode: Yup.string().required("هذا الحقل الزامي"),
  });
  const [show, setShow] = useState(false);
  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
    countryCode: "966",
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  const handleCloseNational_idModal = () => {
    setNational_idExist(false);
  };
  const handleClosePhone_numberModal = () => {
    setPhone_numberExist(false);
  };
  return (
    <div className="addMemberContainer">
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={"اضافة عضو "}
          subTitle={"يمكنك اضافة العضو المطلوب من هنا"}
        />
      </div>
      <div className="">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, setFieldValue }) => {
            valuesRef.current = values;
            return (
              <Form className={`addForm pt-4 mt-2`}>
                <div className={`row g-4 mt-2`}>
                  <div className={`col-12 col-sm-6`}>
                    <InputField name={"name"} label={"الأسم"} />
                  </div>
                  <div
                    className={`col-12 col-sm-6 phone-number position-relative`}
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
                      <div className={`countryCode`}>
                        <PhoneInput
                          country={"sa"} // Default country
                          value={values.phone}
                          onChange={(value) =>
                            setFieldValue("countryCode", value)
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
                      name={"phone_number"}
                      component="div"
                      className={"error-message"}
                    />
                  </div>
                </div>
                <div className={`row g-4 mb-5`}>
                  <div className={`col-12 col-sm-6`}>
                    <InputField name={"national_id"} label={"رقم العضوية"} />
                  </div>
                  <div className={`col-12 col-sm-6 position-relative`}>
                    <label
                      className="text-light d-block mt-2"
                      htmlFor="password"
                    >
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
                      className="error-message mt-2"
                    />
                  </div>
                </div>
                <div className={`row g-4 mb-5`}>
                  <div className={`col-12 col-sm-6`}>
                    <InputField
                      name={"notes"}
                      label={"ملاحظات"}
                      className={"note"}
                    />
                  </div>
                  <div className={`col-12 col-sm-6`}>
                    <InputField
                      name={"date_of_birth"}
                      label={"تاريخ الميلاد"}
                      inputType={"input"}
                      type={"date"}
                    />
                    <div className={`col-12 col-sm-6`}>
                      <InputField
                        name={"gender"}
                        label={"النوع"}
                        inputType={"select"}
                      >
                        <option value="">{"أختر نوع"}</option>
                        <option value="انثي">{"انثي"}</option>
                        <option value="ذكر">{`ذكر`}</option>
                      </InputField>
                    </div>
                  </div>
                </div>
                <div className={`addmemberBtn text-center`}>
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
      {/* suucess ading member */}
      <SuccessModal isOpen={showModal}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            لقد تم إضافة العضو بنجاح
          </p>
        </div>
      </SuccessModal>
      {/* failed adding member */}
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            فشلت محاولة إضافة العضو
          </p>
        </div>
      </FailedModal>
      {/* nationa id exist */}
      <FailedModal
        isOpen={national_idExist}
        handleClose={handleCloseNational_idModal}
      >
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! رقم العضوية موجود من قبل
          </p>
        </div>
      </FailedModal>
      {/* phone number exist */}
      <FailedModal
        isOpen={phone_numberExist}
        handleClose={handleClosePhone_numberModal}
      >
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! رقم الجوال موجود من قبل
          </p>
        </div>
      </FailedModal>
    </div>
  );
}
export default AddNewMember;
