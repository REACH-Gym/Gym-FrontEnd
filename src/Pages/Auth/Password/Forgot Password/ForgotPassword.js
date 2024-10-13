import React, { useState } from "react";
import "./forgotPassword.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../Common Components/Modal/Modal";

function ForgotPassword() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [serverError, setServerError] = useState("");
  const access_token = localStorage.getItem("access");

  const handleSubmit = async (values) => {
    try {
      const item = {
        phone_number: values["phone_number"],
      };
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/auth/request-otp",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(item),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("message", data.message);
        localStorage.setItem("phone_number", values["phone_number"]);
        setShowModal(true);
        setTimeout(() => {
          navigate("/ConfirmCode");
        }, 3500);
        setServerError(""); //no server error
      } else {
        setShowModalError(true);
        setServerError("رقم الهاتف غير صحيح برجاء المحاولة مرة أخرى");
        console.log(data.error.detail);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setServerError("حدث خطأ ما، يرجى المحاولة لاحقًا");
    }
  };

  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^[0-9\s]+$/, "رقم الهاتف يجب أن يحتوي على أرقام ومسافات فقط")
      .required("رقم الهاتف مطلوب"),
  });

  const initialValues = {
    phone_number: "",
  };
  const handleCloseModalError = ()=>{
    setShowModalError(false);
  }

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
            <Form className="forgotPasswordForm">
              <div>
                <label className="d-block fw-bolder" htmlFor="phone_number">
                  رقم الجوال
                </label>
                <Field
                  className="forgotPasswordForm__input mt-3 p-3"
                  name="phone_number"
                  id="phone_number"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-danger error-message"
                />
                {serverError && ( // error is founded
                  <div className="text-danger mt-2">{serverError}</div>
                )}
              </div>
              <div className="sendCodeBtn mt-4">
                <MainButton btnType={"submit"} text={"ارسال رمز"} />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {/* success send code to phone number */}
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"90px"}
              height={"90px"}
            />
          </div>
        </div>
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
      </Modal>
      {/* failed to send code to phone number */}
      <Modal isOpen={showModalError}>
        <div className="d-flex justify-content-end fw-bolder">
          <button onClick={handleCloseModalError} className="border-0 pt-4 ps-4 failed">X</button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{padding:"12px"}}
          />
        </div>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
        فشل في إرسال OTP، تحقق من رقم هاتفك</p>
      </Modal>
    </div>
  );
}
export default ForgotPassword;