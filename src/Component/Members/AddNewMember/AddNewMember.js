import React, { useState } from "react";
import "./AddNewMember.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Modal from "../../../Common Components/Modal/Modal";
function AddNewMember() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const handleSubmit = async (value) => {
    try {
      const genderValue = value.gender === "انثي" ? "F" : "M";

      const items = {
        name: value["name"],
        phone_number: value["phone_number"],
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        gender: genderValue,
      };

      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
            accept: "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response result:", result);

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllMembers");
        }, 3000);
      } else {
        setShowModalError(true);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز")
      .required("هذا الحقل الزامي"),
    notes: Yup.string(),
    date_of_birth: Yup.date().required("هذا الحقل الزامي").max("2-5-3000"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });

  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  return (
    <div className="addMemberContainer">
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={"اضافة عضو "}
          subTitle={"يمكنك اضافة العضو المطلوب من هنا"}
        />
      </div>
      <div className="">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className={`addForm mt-3 mb-5`}>
            <div className={`row g-4 mb-5 mt-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"name"} label={"الأسم"} />
              </div>
              <div className={`col-4 col-lg-6 phone-number`}>
                <InputField name={"phone_number"} label={"رقم الهاتف"} />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"national_id"} label={"رقم العضوية"} />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"password"}
                  label={"كلمة السر"}
                  type="password"
                />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"notes"} label={"ملاحظات"} className="note" />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"date_of_birth"}
                  label={"تاريخ الميلاد"}
                  inputType={"input"}
                  type={"date"}
                />
                <InputField
                  name={"gender"}
                  label={"النوع"}
                  inputType={"select"}
                >
                  <option value="">{"أختر نوع"}</option>
                  <option value="انثي">{"انثي"}</option>
                  <option value="ذكر">{`ذكر`}</option>
                </InputField>
              </div>
            </div>
            <div className={`addmemberBtn m-auto`}>
              <MainButton text={"اضافة"} btnType={"submit"} />
            </div>
          </Form>
        </Formik>
      </div>
      {/* suucess ading member */}
      <Modal isOpen={showModal}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt="add memeber"
              width={"90px"}
              height={"90px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            لقد تم إضافة العضو بنجاح
          </p>
        </div>
      </Modal>
      {/* failed adding member */}
      <Modal isOpen={showModalError}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleCloseModalError}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt="delete member"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            فشلت محاولة إضافة العضو
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default AddNewMember;
