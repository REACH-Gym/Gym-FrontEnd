import React from "react";
import "./CreateNewPassword.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function CreateNewPassword() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const phone_number = localStorage.getItem("phone_number");

  const handleSubmit = async (values) => {
    try {
      const items = {
        phone_number: phone_number,
        new_password: values["new_password"],
      };

      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/auth/forget-password",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(items),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.setItem("rest_password", data.message);
        console.log(data.message);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/"); // Go to login page again
        }, 1500);
      } else {
        console.log("An error happened");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const initialValues = {
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    new_password: Yup.string().required("يجب عليك ادخال كلمة المرور الجديدة"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "كلمة المرور غير متطابقة")//confirm match 
      .required("يرجي تأكيد كلمة السر"),
  });

  return (
    <div className="createNewPasswordContainer">
      <div className="createNewPasswordFormContainer">
        <div className="mt-3 d-flex justify-content-center">
          <img
            src="/assets/image/gym2 1.png"
            alt="logo"
            width={"149px"}
            height={"149px"}
          />
        </div>
        <p className="text-center mt-3 fw-bolder">
          أدخل كلمة السر الجديدة التي ترغب في استخدامها لحماية حسابك.
        </p>

        <div>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="createNewPasswordForm">
                <div>
                  <label className="d-block" htmlFor="new_password">
                    كلمة السر الجديدة
                  </label>
                  <Field
                    className="createNewPasswordForm__input mt-2 p-2"
                    name="new_password"
                    id="new_password"
                    type="password"
                  />
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mt-3">
                  <label className="d-block mb-2" htmlFor="confirm_password">
                    اعادة كتابة كلمة السر
                  </label>
                  <Field
                    className="createNewPasswordForm__input p-2"
                    name="confirm_password"
                    id="confirm_password"
                    type="password"
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mt-4 sendCodeBtn">
                  <MainButton text={"تأكيد"} btnType={"submit"} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default CreateNewPassword;
