import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import "./EditMember.css";
import InputField from "../../../Common Components/InputField/InputField";
import Modal from "../../../Common Components/Modal/Modal";
import { Helmet } from "react-helmet";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function EditMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const member = location.state?.member;
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    national_id: "",
    date_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    if (member) {
      setInitialValues({
        name: member.name,
        national_id: member.national_id,
        date_of_birth: member.date_of_birth,
        gender: member.gender === "F" ? "انثي" : "ذكر",
      });
    }
  }, [member]);

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    national_id: Yup.string().required("مطلوب"),
    date_of_birth: Yup.date().required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      gender: values.gender === "انثي" ? "F" : "M",
      date_of_birth: new Date(values.date_of_birth).toISOString().split("T")[0],
    };
    try {
      const response = await fetch(
        `http://104.248.251.235:8000/members/${member.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("access"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedValues),
        }
      );
      const updatedMember = await response.json();
      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllMembers", { state: { updatedMember } });
        }, 3000);
      } else {
        console.error("Failed to update member", updatedMember);
        setShowModalError(true);
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalError = () => {
    setShowModalError(false);
  };

  return (
    <div className="editMemberContainer">
      <Helmet>
        <title>تعديل بيانات العضو</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={" تعديل عضو "}
          subTitle={"يمكنك تعديل عضو  من هنا"}
        />
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="editForm">
          <div className="row g-4 mb-5 mt-5">
            <div className="col-4 col-lg-6">
              <InputField name="name" label={"الأسم"} />
            </div>
            <div className="col-4 col-lg-6">
              <InputField
                label={"تاريخ الميلاد"}
                type="date"
                name="date_of_birth"
              />
            </div>
          </div>
          <div className="row g-4 mb-5">
            <div className="col-4 col-lg-6">
              <InputField label={"رقم العضوية"} name="national_id" />
            </div>
            <div className="col-4 col-lg-6">
              <InputField name={"gender"} label={"النوع"} inputType={"select"}>
                <option value="">{"أختر نوع"}</option>
                <option value="انثي">{"انثي"}</option>
                <option value="ذكر">{"ذكر"}</option>
              </InputField>
            </div>
          </div>
          <div className="editBtn text-center">
            <MainButton
              text={"حفظ التعديل"}
              btnType={"submit"}
              isLoading={loading}
            />
          </div>
        </Form>
      </Formik>

      <SuccessModal isOpen={showModal}>
        {/* <div className="d-flex justify-content-end">
          <button
            className="border-0 pt-4 ps-4 failed fw-bolder"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/weui_done2-outlined.png"
            alt="edit member"
            height={"90px"}
            width={"90px"}
          />
        </div>
        <div> */}
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          تم تعديل العضو بنجاح
        </p>
        {/* </div> */}
      </SuccessModal>
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        {/* <div className="d-flex justify-content-end">
          <button
            className="border-0 pt-4 ps-4 failed fw-bolder"
            onClick={handleCloseModalError}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
            alt="edit member"
            height={"90px"}
            width={"90px"}
          />
        </div>
        <div> */}
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          حدث خطأ أثناء تعديل هذا العضو
        </p>
        {/* </div> */}
      </FailedModal>
    </div>
  );
}
export default EditMember;
