import React from "react";
import "./ConfirmCode.css";
import { Field, Form, Formik } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ConfirmCode() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access');
  const handleSubmit = async (values) => {
    try {
      const phone_number = localStorage.getItem("phone_number"); //get phone number from local storage to send it body

      // Combine all six OTP fields into one string
      const otp =
        values.otp1 +
        values.otp2 +
        values.otp3 +
        values.otp4 +
        values.otp5 +
        values.otp6;

      const item = {
        otp,
        phone_number, // to send it in body with otp
      };

      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/auth/verify-otp",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token
          },
          body: JSON.stringify(item),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("OTP Verified", result);
        localStorage.setItem("otp_message", result.message);
        toast.success(result.message);
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

  const validationSchema = Yup.object({
    otp1: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp2: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp3: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp4: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp5: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
    otp6: Yup.string()
      .required("من فضلك قم بادخال رمز التأكيد")
      .length(1, "رمز التأكيد مكون من رقم واحد فقط"),
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
          <img
            src="/assets/image/gym2 1.png"
            alt="logo"
            width={"149px"}
            height={"149px"}
          />
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
              <span className="span fw-bolder text-primary me-2">
                اعادة الارسال
              </span>
            </p>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}
export default ConfirmCode;
//send again
