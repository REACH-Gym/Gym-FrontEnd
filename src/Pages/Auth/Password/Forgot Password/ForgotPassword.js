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
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
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
                  className="text-danger"
                />
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
        <div className="d-flex flex-column align-items-center justify-content-center position-relative">
          <div className="modal-img">
            <img src="/assets/image/check-mark.avif" alt="" width={"80px"} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center mt-5 fw-bolder fs-4 pb-3">
          <p className="mt-4" style={{ color: "darkblue" , fontSize:"15px" }}>
            A verification request has been sent to your number: <span className="fw-bolder">01013585051</span>
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default ForgotPassword;
