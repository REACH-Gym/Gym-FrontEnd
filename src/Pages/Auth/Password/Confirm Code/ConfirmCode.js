import React, { useState } from "react";
import "./ConfirmCode.css";
import { Field, Form, Formik } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../Common Components/Modal/Modal";

function ConfirmCode() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const access_token = localStorage.getItem("access");

  // Function to handle OTP submission
  const handleSubmit = async (values) => {
    try {
      const phone_number = localStorage.getItem("phone_number");
      const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4 + values.otp5 + values.otp6;

      const item = {
        otp,
        phone_number,
      };

      const response = await fetch("https://gym-backend-production-65cc.up.railway.app/auth/verify-otp", {
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
        console.log("OTP Verified", result);
        localStorage.setItem("otp_message", result.message);
        setShowModal(true);
        setTimeout(() => {
          navigate("/CreateNewPassword");
        }, 1500);
      } else {
        console.log("OTP Verification Failed");
        console.log(otp);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to handle OTP resend
  const handleResendCode = async () => {
    try {
      const phone_number = localStorage.getItem("phone_number");
      const response = await fetch("https://gym-backend-production-65cc.up.railway.app/auth/request-otp", {
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
        toast.success("تم إرسال رمز التحقق مرة أخرى");
      } else {
        toast.error("فشل في إرسال الرمز. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("An error occurred while resending OTP:", error);
      toast.error("حدث خطأ. حاول مرة أخرى.");
    }
  };

  const validationSchema = Yup.object({
    otp1: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp2: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp3: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp4: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp5: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp6: Yup.string().required("من فضلك قم بادخال رمز التأكيد").length(1, "رمز التأكيد مكون من رقم واحد فقط"),
  });

  const initialValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  return (
    <div className="confirmCodeContainer">
      <div className="confirmCodeFormContainer">
        <div className="mt-3 d-flex justify-content-center">
          <img src="/assets/image/gym2 1.png" alt="logo" width={"149px"} height={"149px"} />
        </div>
        <p className="text-center mt-3">
          لقد قمنا بإرسال رمز التحقق المكون من 4 أرقام إلى رقم <br />
          الهاتف المنتهي بـ 6559 .{" "}
          <span className="fw-bolder">
            يرجي إدخال الرمز لإعادة تعيين كلمة المرور الخاصة بك.
          </span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="confirmCodeForm text-center">
            <div className="confirmCodeForm__inputs mt-5">
              <Field className="p-2 text-center" name="otp1" />
              <Field className="p-2 text-center" name="otp2" />
              <Field className="p-2 text-center" name="otp3" />
              <Field className="p-2 text-center" name="otp4" />
              <Field className="p-2 text-center" name="otp5" />
              <Field className="p-2 text-center" name="otp6" />
            </div>

            <div className="sendCodeBtn mt-4">
              <MainButton text={"تأكيد"} btnType={"submit"} />
            </div>

            <p className="mt-3 fw-bolder">لم تقم باستلام الرمز؟</p>
            <p>
              ارسال الرمز مرة اخرى{" "}
              <button
                className="resend-button fw-bolder text-primary me-2"
                type="button"
                onClick={handleResendCode}
              >
                اعادة الارسال
              </button>
            </p>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center position-relative">
          <div className="modal-img">
            <img src="/assets/image/check-mark.avif" alt="" width={"80px"} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center mt-5 fw-bolder fs-4 pb-3">
          <p className="mt-4" style={{ color: "darkblue", fontSize: "17px" }}>
            01013585051 has been verified
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmCode;
