import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Formik, Form } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import Modal from "../../../src/Common Components/Modal/Modal";
import FailedModal from "../../Common Components/Modal/FailedModal/FailedModal";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [show, setShow] = useState(false);
  const [showNewPssword, setShowNewPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const api = process.env.REACT_APP_DOMAIN
  const handleSubmit = async (value) => {
    setLoading(true);
    const items = {
      current_password: value["current_password"],
      new_password: value["new_password"],
    };
    console.log("Submitted current password:", items.current_password);

    try {
      const response = await fetch(
        `${api}/auth/change-password`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("access"),
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log("sucess update");
        setShowModal(true);
        setLoading(false);
      } else {
        console.log("fail update");
        setShowModal(false);
        setLoading(false);
        setShowModalError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const validationSchema = Yup.object({
    current_password: Yup.string().required("هذا الحقل الزامي"),
    new_password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز")
      .required("يرجي ادخال كلمة السر الجديدة"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "كلمة المرور غير متطابقة") //confirm match
      .required("يرجي تأكيد كلمة السر"),
  });
  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };
  return (
    <div className="changePasswordContainer">
      <Helmet>
        <title>تغير كلمة السر</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          title={"الاعدادات"}
          subTitle={"يمكنك تغيير كلمة السر من هنا"}
          MainIcon={"/assets/image/settings.png"}
        />
      </div>
      <div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="changePassForm mt-2">
            <div className={`pt-5`}>
              <div className="mt-3 position-relative">
                <InputField
                  label={"كلمة السر الحالية"}
                  className="changePassForm__input p-2"
                  name="current_password"
                  id="current_password"
                  type={show ? "text" : "password"}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 51,
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
              </div>
              <p
                className="mt-2 fw-bolder"
                style={{
                  color: "lightgray",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/ForgotPassword")}
              >
                هل نسيت كلمة السر؟
              </p>
            </div>
            <div className="mt-3 position-relative">
              <InputField
                label={"كلمة السر الجديدة"}
                className="changePassForm__input p-2"
                name="new_password"
                id="new_password"
                type={showNewPssword ? "text" : "password"}
              />
              <span
                style={{
                  position: "absolute",
                  top: 51,
                  left: 25,
                  cursor: "pointer",
                }}
                onClick={() => setShowNewPassword(!showNewPssword)}
              >
                {!showNewPssword ? (
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
            </div>
            <div className="mt-3 position-relative">
              <InputField
                label={" تأكيد كلمة السر الجديدة"}
                className="changePassForm__input p-2"
                name="confirm_password"
                id="confirm_password"
                type={showConfirm ? "text" : "password"}
              />
              <span
                style={{
                  position: "absolute",
                  top: 51,
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
            </div>
            <div className=" saveData text-center mt-5">
              <MainButton text={"حفظ"} btnType={"submit"} isLoading={loading} />
            </div>
          </Form>
        </Formik>
      </div>
      <Modal isOpen={showModal}>
        <div>
          <button
            className="border-0 pe-4 ps-4 pt-4 fw-bolder"
            style={{ backgroundColor: "transparent" }}
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/weui_done2-outlined.png"
            alt="success"
            width={"100px"}
            height={"100px"}
            style={{ padding: "6px" }}
          />
        </div>
        <p className="text-center fw-bolder mt-3">لقد تم تغيير كلمة المرور</p>
      </Modal>
      <FailedModal
        isOpen={showModalError}
        handleClose={() => setShowModalError(false)}
      >
        <p className="fw-bolder text-center p-2">
          كلمة المرور الحالية غير صحيحة.
        </p>
      </FailedModal>
    </div>
  );
}
export default ChangePassword;