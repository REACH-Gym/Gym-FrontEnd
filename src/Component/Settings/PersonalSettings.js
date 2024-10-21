import React, { useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import "./Settings.css";
import { Form, Formik } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

function PersonalSettings() {
  const [loading , setLoading] = useState(false);
  const initialValues = {
    name: "",
    national_id: "",
    date_of_birth: "",
    gender: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string(),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي").max("2-5-3000"),
    gender: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const genderValue = values.gender === "أنثى" ? "F" : "M";
      const items = {
        name: values["name"],
        national_id: values["national_id"],
        date_of_birth: values["date_of_birth"],
        gender: genderValue,
      };
  
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/current-employee`,
        {
          method: "PATCH",
          headers: {
            Authorization:localStorage.getItem("access"), // Ensure Bearer token if needed
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        console.error("Server error:", errorData);
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log(result);
      setLoading(false);
      console.log("User data updated successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error updating user data:", error);
      // Display user-friendly error message if necessary
    }
  };
  
  return (
    <div className="settingContainer">
      <Helmet>
        <title>الأعدادات</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          title={"الاعدادات"}
          subTitle={"يمكنك تعديل معلوماتك الشخصية من هنا"}
          MainIcon={"/assets/image/settings.png"}
        />
      </div>
      <div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="settingForm mt-4">
            <div className={`row g-4 mb-5 pt-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"name"} label={"الأسم"} />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField label={" رقم العضوية"} name={"national_id"} />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"date_of_birth"}
                  label={"تاريخ الميلاد"}
                  type="date"
                />
              </div>
              <div className={`col-4 col-lg-4`}>
                <InputField
                  name={"gender"}
                  label={"النوع"}
                  inputType={"select"}
                >
                  <option value="">اختر النوع</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </InputField>
              </div>
            </div>
            <div className="text-center saveInfo">
              <MainButton text={"حفظ"} btnType={"submit"} isLoading={loading} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default PersonalSettings;