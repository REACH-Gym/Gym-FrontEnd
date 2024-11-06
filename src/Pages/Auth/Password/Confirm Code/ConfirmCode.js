import React, { useState } from "react";
import "./ConfirmCode.css";
import { Field, Form, Formik } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../Common Components/Modal/Modal";

function ConfirmCode() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const access_token = localStorage.getItem("access");
  const phone_number = localStorage.getItem("phone_number");
  const [loading, setLoading] = useState(false);
  const [modalExpired, setModalExpired] = useState(false);
  const [incorrectOtp, setIncorrectOtp] = useState(false);
  const [tooMantAttempts, setTooManyAttempts] = useState(false);
  const [resend, setResend] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const phone_number = localStorage.getItem("phone_number");
      const otp =
        values.otp1 +
        values.otp2 +
        values.otp3 +
        values.otp4 +
        values.otp5 +
        values.otp6;
      const item = { otp, phone_number };
      console.log("Sending item:", item);
      const response = await fetch(`${api}/auth/verify-otp`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("otp_message", result.message);
        if (result.message.includes("OTP verified successfully.")) {
          setShowModal(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/CreateNewPassword");
          }, 2500);
        }
      } else if (
        result.status === "error" &&
        result.error &&
        result.error.detail.includes("OTP expired.")
      ) {
        setShowModal(false);
        setModalExpired(true);
        setLoading(false);
      } else if (
        result.status === "error" &&
        result.error &&
        result.error.detail.includes("Incorrect OTP.")
      ) {
        setShowModal(false);
        setModalExpired(false);
        setIncorrectOtp(true);
        setLoading(false);
      } else {
        console.log("OTP Verification Failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // resend
  const handleResendCode = async () => {
    try {
      const response = await fetch(`${api}/auth/request-otp`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({ phone_number }),
      });

      const result = await response.json();
      if (response.ok) {
        if (
          result.message.includes(
            "A verification request has been sent to your number:"
          )
        ) {
          console.log("allow");
          setLoading(false);
          setShowModal(false);
          setTooManyAttempts(false);
          setResend(true);
        } else {
          setShowModal(false);
          setTooManyAttempts(true);
          setLoading(false);
          setResend(false);
        }
      } else {
        console.error("an error ocurred");
      }
    } catch (error) {
      console.error("An error occurred while resending OTP:", error);
    }
  };
  const validationSchema = Yup.object({
    otp1: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
    otp2: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
    otp3: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
    otp4: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
    otp5: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
    otp6: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1),
  });

  const initialValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const handleKeyUp = (event, nextField) => {
    if (event.target.value.length === 1 && nextField) {
      nextField.focus();
    }
  };

  return (
    <div className="confirmCodeContainer">
      <div className="confirmCodeFormContainer">
        <p className="text-center mt-3 text-light">
          لقد قمنا بإرسال رمز التحقق المكون من 6 أرقام إلى رقم <br />
          الهاتف المنتهي بـ {phone_number?.slice(-4)}
          <span className="fw-bolder me-3">
            يرجي إدخال الرمز لإعادة تعيين كلمة المرور الخاصة بك.
          </span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="confirmCodeForm text-center">
              <div className="confirmCodeForm__inputs mt-5" dir="ltr">
                <Field
                  className="p-2 text-center"
                  name="otp1"
                  maxLength="1"
                  onKeyUp={(e) =>
                    handleKeyUp(e, document.getElementsByName("otp2")[0])
                  }
                />
                <Field
                  className="p-2 text-center"
                  name="otp2"
                  maxLength="1"
                  onKeyUp={(e) =>
                    handleKeyUp(e, document.getElementsByName("otp3")[0])
                  }
                />
                <Field
                  className="p-2 text-center"
                  name="otp3"
                  maxLength="1"
                  onKeyUp={(e) =>
                    handleKeyUp(e, document.getElementsByName("otp4")[0])
                  }
                />
                <Field
                  className="p-2 text-center"
                  name="otp4"
                  maxLength="1"
                  onKeyUp={(e) =>
                    handleKeyUp(e, document.getElementsByName("otp5")[0])
                  }
                />
                <Field
                  className="p-2 text-center"
                  name="otp5"
                  maxLength="1"
                  onKeyUp={(e) =>
                    handleKeyUp(e, document.getElementsByName("otp6")[0])
                  }
                />
                <Field className="p-2 text-center" name="otp6" maxLength="1" />
              </div>

              <div className="sendCodeBtn mt-4">
                <MainButton
                  text={"تأكيد"}
                  btnType={"submit"}
                  isLoading={loading}
                />
              </div>

              <p className="mt-3 fw-bolder text-light">لم تقم باستلام الرمز؟</p>
              <p className="text-light">
                ارسال الرمز مرة اخرى
                <button
                  className="resend-button fw-bolder  me-2 "
                  style={{ color: "#cccbcb" }}
                  type="button"
                  onClick={handleResendCode}
                >
                  اعادة الارسال
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"100px"}
              height={"100px"}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder fs-6 p-3">
          <p className="text-dark">تم التحقق من الرقم</p>
        </div>
      </Modal>
      {/* expired */}
      <Modal isOpen={modalExpired}>
        <div className="closeModal">
          <button
            className="border-0 fw-bolder pt-4 ps-4 pe-4"
            onClick={() => setModalExpired(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/ph_warning-bold.png"
              alt=""
              width={"100px"}
              height={"100px"}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder fs-6 p-3">
          <p className="text-dark"> انتهت صلاحية OTP </p>
        </div>
      </Modal>
      {/* enter wrong otp */}
      <Modal isOpen={incorrectOtp}>
        <div className="closeModal">
          <button
            className="border-0 fw-bolder pt-4 ps-4 pe-4"
            onClick={() => setIncorrectOtp(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt=""
              width={"100px"}
              height={"100px"}
              style={{ padding: "12px" }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder fs-6 p-3">
          <p className="text-dark">OTP غير صحيح. يرجى المحاولة مرة أخرى</p>
        </div>
      </Modal>
      {/* too many attempts */}
      <Modal isOpen={tooMantAttempts}>
        <div className="closeModal">
          <button
            onClick={() => setTooManyAttempts(false)}
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
      {/* resend */}
      <Modal isOpen={resend}>
        <div className="closeModal">
          <button
            className="border-0 ps-4 pt-4 pe-4 fw-bolder"
            onClick={() => setResend(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-4">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"100px"}
              height={"100px"}
              style={{ padding: "6px" }}
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
    </div>
  );
}
export default ConfirmCode;
