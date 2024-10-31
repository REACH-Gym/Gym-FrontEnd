import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import PhoneInput from "react-phone-input-2";
function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const items = {
        phone_number: `${values["countryCode"]}${values["phone_number"]}`,
        password: values["password"],
        is_web: values["is_web"],
      };
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(items),
      });

      const result = await response.json();
      console.log(result);
      localStorage.setItem("access", result.data.access);
      localStorage.setItem("refresh", result.data.refresh);
      if (response.ok) {
        setShowModal(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/Home");
        }, 2500);
        const fetchUserInfo = await fetch(
          `${api}/current-employee`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              accept: "application/json",
            },
          }
        );
        const userInfo = await fetchUserInfo.json();
        console.log(userInfo);
        if (fetchUserInfo.ok) {
          console.log("name of user logged in", userInfo.data.user.name);
          console.log(
            "phone number of user logged in",
            userInfo.data.user.phone_number
          );
          localStorage.setItem(
            "name of logged in user ",
            userInfo.data.user.name
          );
          localStorage.setItem(
            "phone number of logged in user",
            userInfo.data.user.phone_number
          );
          localStorage.setItem(" id of logged in user", userInfo.data.user.id);
        } else {
          console.log("failed get user info");
        }
      } else {
        setShowModalError(true);
        setLoading(false);
      }
    } catch (error) {
      setShowModalError(true);
      setLoading(false);
    }
  };

  const initialValues = {
    phone_number: "",
    password: "",
    countryCode: "966",
    is_web: true,
  };

  const validationSchema = Yup.object({
    phone_number: Yup.string().required("هذا الحقل إلزامي"),
    password: Yup.string().required("هذا الحقل إلزامي"),
    countryCode: Yup.string().required("هذا الحقل إلزامي"),
  });
  const handleCloseModal = () => {
    setShowModalError(false);
  };
  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form className="login-form">
              {/* <div className="mt-3 d-flex justify-content-center">
                <img
                  src="/assets/image/gym2 1.png"
                  alt="logo"
                  width={"149px"}
                  height={"149px"}
                />
              </div> */}
              <div className={`phone-number position-relative`}>
                <label
                  className="mb-2 mt-2 text-light"
                  htmlFor={"phone_number"}
                >
                  رقم الهاتف
                </label>
                <div className={`position-relative mt-3`}>
                  <Field
                    name={"phone_number"}
                    id={"phone_number"}
                    style={{
                      width: "100%",
                      border: "1px solid lightgray",
                      borderRadius: "5px",
                      padding: "10px",
                      outline: "none",
                      height: "52px",
                    }}
                  />
                  <div className={`countryCode`}>
                    <PhoneInput
                      country={"sa"} // Default country
                      value={values.countryCode}
                      onChange={(value) => setFieldValue("countryCode", value)}
                      inputProps={{
                        name: "countryCode",
                        required: true,
                        autoFocus: true,
                      }}
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-2 position-relative">
                <label htmlFor="password" className="d-block mb-2 mt-4">
                  كلمة السر
                </label>
                <Field
                  name="password"
                  id="password"
                  type={show ? "text" : "password"}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 45,
                    left: 25,
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {!show ? (
                    <img
                      src="/assets/image/close eye.png"
                      alt="hide password"
                      width={"20px"}
                      height={"20px"}
                    />
                  ) : (
                    <img
                      src="/assets/image/open eye.png"
                      alt="show password"
                      width={"20px"}
                      height={"20px"}
                    />
                  )}
                </span>
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
                <MainButton
                  text={"تسجيل الدخول"}
                  btnType="submit"
                  isLoading={loading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <SuccessModal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div className="text-center fw-lighter fs-5">
          <p className="p-2 text-dark">لقد تم تسجيل دخولك بنجاح</p>
        </div>
      </SuccessModal>
      {/* failed to login */}
      <FailedModal isOpen={showModalError} handleClose={handleCloseModal}>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          رقم الهاتف أو كلمة المرور غير صحيحة
        </p>
      </FailedModal>
    </div>
  );
}
export default Login;
