import React from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
function Login() {
  const onSubmit = {};

  const intialValues = {
    nationalId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    
  });
  return (
    <div className="login d-flex">
      {/* left */}
      <aside className="left-side d-flex justify-content-center align-items-center">
        <div className="logo">
          <img
            src="/assets/image/logo.png"
            alt="Gym logo"
            width={"312px"}
            height={"312px"}
          />
        </div>
      </aside>

      {/* right */}
      <aside className="right-side">
        <Formik
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="login-form ">
            {/* user name / mobile number */}
            <div>
              <label htmlFor="" className="d-block mb-2">
                رقم العضوية
              </label>
              <Field id="" name="" />
            </div>

            {/* password */}
            <div className="mb-4">
              <label htmlFor="" className="d-block mb-2 mt-4">
                كلمة السر
              </label>
              <Field name="" id="" />
            </div>
            <span className="forgot-password">هل نسيت كلمة السر؟</span>
            {/* login button */}
            <div className="mt-4 login-btn">
              <MainButton text={"تسجيل الدخول"} onClick={"/"} />
            </div>
          </Form>
        </Formik>
      </aside>
    </div>
  );
}

export default Login;
