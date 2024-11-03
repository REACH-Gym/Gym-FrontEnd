import React, { useState } from "react";
import "./forgotPassword.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../Common Components/Modal/Modal";
import SuccessModal from "../../../../Common Components/Modal/SucessModal/SuccessModal";
import PhoneInput from "react-phone-input-2";
function ForgotPassword() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooMantAttempts, setTooManyAttempts] = useState(false);
  const access_token = localStorage.getItem("access");
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const item = {
        phone_number: `${values["countryCode"]}${values["phone_number"]}`,
      };
      const response = await fetch(`${api}/auth/request-otp`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        localStorage.setItem("message", result.message);
        localStorage.setItem("phone_number", values["phone_number"]);
        setLoading(false);
        if (
          result.message.includes(
            "A verification request has been sent to your number:"
          )
        ) {
          console.log("allow");
          setLoading(false);
          setShowModal(true);
          setTooManyAttempts(false);
          setTimeout(() => {
            navigate("/ConfirmCode");
          }, 3500);
        } else {
          setShowModal(false);
          setTooManyAttempts(true);
          setLoading(false);
        }
      } else if (result.status === 404) {
        setShowModalError(true);
        setLoading(false);
        setServerError("رقم الهاتف غير صحيح برجاء المحاولة مرة أخرى");
      } else {
        setShowModalError(true);
        setLoading(false);
        setServerError("رقم الهاتف غير صحيح برجاء المحاولة مرة أخرى");
        console.log(result.error.detail);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
      setServerError("حدث خطأ ما، يرجى المحاولة لاحقًا");
    }
  };

  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^[0-9\s]+$/, "رقم الهاتف يجب أن يحتوي على أرقام ومسافات فقط")
      .required("رقم الهاتف مطلوب"),
    countryCode: Yup.string().required("ادخل رقم الدولة"),
  });

  const initialValues = {
    phone_number: "",
    countryCode: "966",
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  const hanldeCloseMayAttempts = () => {
    setTooManyAttempts(false);
  };
  return (
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordFormContainer">
        <div className="mt-3 d-flex justify-content-center">
          <img
            src="/assets/image/gym2 1.png"
            alt="logo"
            width={"149px"}
            height={"149px"}
          />
        </div>
        <p className="fw-bolder text-center mt-4">
          من فضلك أدخل رقم هاتفك لإرسال رمز التحقق
          <br /> لمرة واحدة (OTP).
        </p>

        <div className="mt-4">
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className="forgotPasswordForm">
                <div className={`phone-number position-relative`}>
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
                    name="phone_number"
                    component="div"
                    className="text-danger error-message"
                  />
                </div>
                <div className="sendCodeBtn mt-4">
                  <ErrorMessage
                    name="countryCode"
                    component="div"
                    className="text-danger"
                  />
                  <MainButton
                    btnType={"submit"}
                    text={"ارسال رمز"}
                    isLoading={loading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* success send code to phone number */}
      <SuccessModal isOpen={showModal}>
        <div className="d-flex align-items-center justify-content-center fw-bolder fs-6 p-3">
          <p
            className="text-center text-dark"
            style={{ color: "", fontSize: "" }}
          >
            لقد تم إرسال طلب التحقق إلى رقمك:
            <span className=" ms-2 me-2">
              {localStorage.getItem("phone_number")}
            </span>
          </p>
        </div>
      </SuccessModal>
      {/* failed to send code to phone number */}
      <Modal isOpen={showModalError}>
        <div className="closeModal">
          <button
            onClick={handleCloseModalError}
            className="border-0 pt-4 ps-4 pe-4 fw-bolder failed"
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{ padding: "6px" }}
          />
        </div>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          فشل في إرسال OTP، تحقق من رقم هاتفك
        </p>
      </Modal>
      {/* too many attempts */}
      <Modal isOpen={tooMantAttempts}>
        <div className="closeModal">
          <button
            onClick={hanldeCloseMayAttempts}
            className="border-0 pt-4 ps-4 pe-4 fw-bolder"
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/ph_warning-bold.png"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{ padding: "6px" }}
          />
        </div>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          محاولات كثيرة يرجي المحاولة مرة اخري خلال 15 دقيقة
        </p>
      </Modal>
    </div>
  );
}
export default ForgotPassword;
