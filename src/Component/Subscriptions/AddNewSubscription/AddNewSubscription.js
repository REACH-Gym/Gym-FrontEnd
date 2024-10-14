import React, { useState } from "react";
import "./AddNewSubscription.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Formik, Form } from "formik";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
function AddNewSubscription() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading , setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const items = {
        name: values["name"],
        price: values["price"],
        membership_duration: values["membership_duration"],
        freeze_duration: values["freeze_duration"],
        description: values["description"],
      };
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/memberships/",
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
      const result = await response.json();
      if (response.ok) {
        console.log("Response data:", result);
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllSubScriptions");
        }, 5000);
      } else {
        console.error("Response status:", response.status);
        console.error("Response body:", result);
        console.log("Failed to add new Subscription");
        setShowModalError(true);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    price: Yup.string().required("هذا الحقل الزامي"),
    membership_duration: Yup.string().required("هذا الحقل الزامي"),
    freeze_duration: Yup.string().required("هذا الحقل الزامي"),
    description: Yup.string(),
  });
  const intialValues = {
    name: "",
    description: "",
    price: "",
    membership_duration: "",
    freeze_duration: "",
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  return (
    <div className="AddNewSubscriptionContainer">
      <div className="pe-4">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"إضافة اشتراك جديد"}
          subTitle={"يمكنك إضافة اشتراك جديد من هنا"}
        />
      </div>

      <div className="addSubFormContainer mt-3">
        <Formik
          onSubmit={handleSubmit}
          initialValues={intialValues}
          validationSchema={validationSchema}
        >
          <Form className="addSubForm mt-5 mb-4">
            <div className="row mb-4 g-5">
              <div className="col-6">
                <InputField name={"name"} label={"اسم الاشتراك"} />
              </div>
              <div className="col-6">
                <InputField name={"price"} label={"السعر"} />
              </div>
            </div>
            <div className="row mb-4 g-5">
              <div className="col-6">
                <InputField name={"membership_duration"} label={"المدة"} />
              </div>
              <div className="col-6">
                <InputField name={"freeze_duration"} label={"فترة التجميد"} />
              </div>
            </div>
            <div className="col-12">
              <InputField
                name={"description"}
                label={"الملاحظات"}
                className="add-note"
              />
            </div>
            <div className="addmemberBtn mt-5">
              <MainButton text={"اضافة"} btnType={"submit"} isLoading={loading} />
            </div>
          </Form>
        </Formik>
      </div>
      {/* success add sub */}
      <Modal isOpen={showModal}>
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
            src="/assets/image/weui_done2-outlined.png"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{padding:"12px"}}
          />
        </div>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            تم اضافة الأشتراك بنجاح
          </p>
        </div>
      </Modal>
      {/* failed add sub */}
      <Modal isOpen={showModalError}>
        <div className="d-flex justify-content-end">
          <button
            onClick={handleCloseModalError}
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
            style={{padding:"12px"}}
          />
        </div>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ أثناء حذف هذا الأشتراك
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default AddNewSubscription;