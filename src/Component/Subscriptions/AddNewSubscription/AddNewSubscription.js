import React, { useState } from "react";
import "./AddNewSubscription.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Formik, Form } from "formik";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function AddNewSubscription() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = process.env.REACT_APP_DOMAIN;
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
      const response = await fetch(`${api}/memberships/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify(items),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Response data:", result);
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllSubScriptions");
        }, 2000);
      } else if (response.status === 403) {
        setError("ليس لديك صلاحية لعرض هذه المعلومات");
      } else if (response.status === 401) {
        setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
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
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  return (
    <div className="AddNewSubscriptionContainer">
      <Helmet>
        <title>إضافة أشتراك جديد</title>
      </Helmet>
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
          <Form className=" mt-5 mb-4" style={{ padding: "0px 50px 0px 50px" }}>
            <div className="row mb-4 g-5">
              <div className="col-12 col-md-6">
                <InputField name={"name"} label={"اسم الاشتراك"} />
              </div>
              <div className="col-12 col-md-6">
                <InputField name={"price"} label={"السعر"} />
              </div>
            </div>
            <div className="row mb-4 g-5">
              <div className="col-12 col-md-6">
                <InputField
                  name={"membership_duration"}
                  label={" المدة بالشهر"}
                />
              </div>
              <div className="col-12 col-md-6">
                <InputField
                  name={"freeze_duration"}
                  label={"أقصي حد للتجميد(بالأيام)"}
                />
              </div>
            </div>
            <div className="col-12">
              <InputField
                name={"description"}
                label={"الملاحظات"}
                className="add-note"
              />
            </div>
            <div className="addmemberBtn mt-5 text-center">
              <MainButton
                text={"اضافة"}
                btnType={"submit"}
                isLoading={loading}
              />
            </div>
          </Form>
        </Formik>
      </div>
      {/* success add sub */}
      <SuccessModal isOpen={showModal}>
        <div>
          <p className="text-center mt-2 text-dark fw-bolder mb-3">
            تم اضافة الأشتراك بنجاح
          </p>
        </div>
      </SuccessModal>
      {/* failed add sub */}
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ أثناء حذف هذا الأشتراك
          </p>
        </div>
      </FailedModal>
    </div>
  );
}
export default AddNewSubscription;
