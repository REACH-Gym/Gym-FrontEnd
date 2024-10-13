import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../Common Components/Modal/Modal";

function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
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
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home");
        }, 2500);
      } else {
        setShowModalError(true);
      }
    } catch (error) {
      setShowModalError(true);
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
  const handleCloseModal = () => {
    setShowModalError(false);
  };
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
            <Link
              to={"ForgotPassword"}
              className="text-decoration-none fw-bolder"
            >
              <span className="forgot-password">هل نسيت كلمة السر؟</span>
            </Link>
            <div className="mt-4 text-center login-btn">
              <MainButton text={"تسجيل الدخول"} btnType="submit" />
            </div>
          </Form>
        </Formik>
      </aside>
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-3">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"100px"}
              height={"100px"}
            />
          </div>
        </div>
        <div className="text-center fw-lighter fs-5">
          <p className="p-3 text-dark">لقد تم تسجيل دخولك بنجاح</p>
        </div>
      </Modal>
      {/* failed to login */}
      <Modal isOpen={showModalError}>
        <div className="d-flex justify-content-end">
          <button
            onClick={handleCloseModal}
            className="border-0 pt-4 ps-4 failed fw-bolder"
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
            style={{ padding: "12px" }}
          />
        </div>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          رقم الهاتف أو كلمة المرور غير صحيحة
        </p>
      </Modal>
    </div>
  );
}
export default Login;