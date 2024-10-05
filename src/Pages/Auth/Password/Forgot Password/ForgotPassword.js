import React, { useState } from "react";
import "./forgotPassword.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../Common Components/Modal/Modal";

function ForgotPassword() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
        setTimeout(() => {
          navigate("/ConfirmCode");
        }, 2500);
        setShowModal(true);
        setServerError("");
      } else {
        toast.error("رقم الهاتف غير صحيح برجاءالمحاولة مرة اخري");
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
      <ToastContainer />
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/pepicons-pencil_checkmark-outlined.png"
              alt=""
              width={"100px"}
              height={"100px"}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder fs-6 p-3">
          <p
            className="text-center text-dark"
            style={{ color: "", fontSize: "" }}
          >
            لقد تم إرسال طلب التحقق إلى رقمك:
            <span className="fw-bolder ms-2 me-2">
              {localStorage.getItem("phone_number")}
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default ForgotPassword;