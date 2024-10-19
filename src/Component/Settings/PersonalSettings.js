import React, { useEffect, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import "./Settings.css";
import { Form, Formik } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function PersonalSettings() {
  const location = useLocation();
  const employee = location.state?.employee;

  const [initialValues, setInitialValues] = useState({
    name: employee?.name || "",
    national_id: employee?.national_id || "",
    date_of_birth: employee?.date_of_birth || "",
    gender: employee?.gender === "ذكر" ? "M" : "F", // Adjust based on your API
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('هذا الحقل الزامي'),
    national_id: Yup.string().required('هذا الحقل الزامي'),
    date_of_birth: Yup.string().required('هذا الحقل الزامي'),
    gender: Yup.string().required('هذا الحقل الزامي'),
  });

  const handleSubmit = async (values) => {
    // Map the gender value to the expected format
    const updatedValues = {
      ...values,
      gender: values.gender === 'ذكر' ? 'M' : 'F' // Adjust based on your API
    };

    try {
      const response = await fetch(`https://gym-backend-production-65cc.up.railway.app/employee/41`, {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem('access'),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues), // Send the updated values
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Log error response
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      console.log(userData);
    } catch (error) {
      console.log('Error updating user data:', error);
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
                <InputField label={' رقم العضوية'} name={"national_id"} />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"date_of_birth"} label={"تاريخ الميلاد"} type="date" />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"gender"} label={"النوع"} inputType={'select'}>
                  <option value="">اختر النوع</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </InputField>
              </div>
            </div>
            <div className="text-center saveInfo">
              <MainButton text={'حفظ'} btnType={'submit'} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default PersonalSettings;
