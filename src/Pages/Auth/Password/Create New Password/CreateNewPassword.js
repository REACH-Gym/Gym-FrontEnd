import React, { useState } from "react";
import "./CreateNewPassword.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import MainButton from "../../../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../../../../Common Components/Modal/Modal";
function CreateNewPassword() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const access_token = localStorage.getItem("access");
  const phone_number = localStorage.getItem("phone_number");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const items = {
        phone_number: phone_number,
        new_password: values["new_password"],
      };
      const response = await fetch(
        `${api}/auth/forget-password`,
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
      console.log(data);
      if (response.ok) {
        localStorage.setItem("rest_password", data.message);
        setShowModal(true);

        setTimeout(() => {
          navigate("/");
        }, 1500);
        setLoading(false);
      } else {
        setShow(false);
        setShowError(true);
        setLoading(false);
      }
    } catch (error) {
      setShow(false);
      setShowError(true);
      setLoading(false);
    }
  };

  const initialValues = {
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    new_password: Yup.string().required("يجب عليك ادخال كلمة المرور الجديدة"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "كلمة المرور غير متطابقة") //confirm match
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
            <Form className="createNewPasswordForm">
              <div className="position-relative">
                <label className="d-block" htmlFor="new_password">
                  كلمة السر الجديدة
                </label>
                <Field
                  className="createNewPasswordForm__input mt-2 p-2"
                  name="new_password"
                  id="new_password"
                  type={show ? "text" : "password"}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 41,
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
                  name="new_password"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>
              <div className="mt-3 position-relative">
                <label className="d-block mb-2" htmlFor="confirm_password">
                  اعادة كتابة كلمة السر
                </label>
                <Field
                  className="createNewPasswordForm__input p-2"
                  name="confirm_password"
                  id="confirm_password"
                  type={showConfirm ? "text" : "password"}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 41,
                    left: 25,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {!showConfirm ? (
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
                  name="confirm_password"
                  component="div"
                  className="text-danger mt-2"
                />
              </div>
              <div className="mt-4 sendCodeBtn">
                <MainButton
                  text={"تأكيد"}
                  btnType={"submit"}
                  isLoading={loading}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Modal isOpen={showModal}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-3">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"100px"}
              height={"100px"}
              style={{ padding: "6px" }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder pb-3">
          <p className="mt-4">
          تم التحقق من الرقم 01013585051 </p>
        </div>
      </Modal>
      {/* error */}
      <Modal isOpen={showError}>
        <div className="">
          <button
          style={{backgroundColor:"transparent"}}
            className="border-0 ps-4 pe-4 pt-4 fw-bolder"
            onClick={() => setShowError(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mt-3">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt=""
              width={"100px"}
              height={"100px"}
              style={{ padding: "6px" }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center fw-bolder pb-3">
          <p className="mt-4" style={{}}>
             كلمة المرور قصيرة جدًا. يجب أن تحتوي على 8 أحرف على الأقل.
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default CreateNewPassword;