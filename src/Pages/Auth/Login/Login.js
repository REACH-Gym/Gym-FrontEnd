import React from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const items = {
        phone_number: values["phone_number"],
        password: values["password"],
        is_web: values["is_web"],
      };
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const result = await response.json();
      console.log(result);
      localStorage.setItem("access", result.data.access);
      localStorage.setItem("refresh", result.data.refresh);
      localStorage.setItem("adminName", result.data.role);
      
      if (response.ok) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/Home");
        }, 1500);
      } else {
        toast.error("Login failed. Please check your phone or password.");
      }
    } catch (error) {
      toast.error("Phone or password is not correct , please try again");
    }
  };

  const initialValues = {
    phone_number: "",
    password: "",
    is_web: true,
  };

  const validationSchema = Yup.object({
    phone_number: Yup.string().required("هذا الحقل إلزامي"),
    password: Yup.string().required("هذا الحقل إلزامي"),
  });

  return (
    <div className="login d-flex">
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
      <aside className="right-side">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <div>
              <label htmlFor="phone_number" className="d-block mb-2">
                رقم العضوية
              </label>
              <Field id="phone_number" name="phone_number" />
              <ErrorMessage
                className="error-message mt-1 text-danger"
                name="phone_number"
                component="div"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="d-block mb-2 mt-4">
                كلمة السر
              </label>
              <Field name="password" id="password" type="password" />
              <ErrorMessage
                className="error-message mt-1 text-danger"
                name="password"
                component="div"
              />
            </div>
            <Link to={"ForgotPassword"} className="text-decoration-none fw-bolder">
              <span className="forgot-password">هل نسيت كلمة السر؟</span>
            </Link>
            <div className="mt-4 text-center login-btn">
              <MainButton text={"تسجيل الدخول"} btnType="submit" />
            </div>
          </Form>
        </Formik>
      </aside>
      <ToastContainer />
    </div>
  );
}
export default Login;
