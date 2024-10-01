import React from "react";
import "./AddNewSubscription.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Formik, Form } from "formik";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddNewSubscription() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const handleSubmit = async (values) => {
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
        toast.success("Done! Subscription Added Successfully");
        setTimeout(() => {
          navigate("/Home/AllSubScriptions");
        }, 1500);
      } else {
        console.error("Response status:", response.status);
        console.error("Response body:", result);
        console.log("Failed to add new Subscription");
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
    description: Yup.string().required("هذا الحقل الزامي"),
  });
  const intialValues = {
    name: "",
    description: "",
    price: "",
    membership_duration: "",
    freeze_duration: "",
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

      <div className="addSubFormContainer mt-4">
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
              <MainButton text={"اضافة"} btnType={"submit"} />
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}
export default AddNewSubscription;