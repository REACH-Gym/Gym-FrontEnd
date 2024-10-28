import React, { useEffect, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import "./Settings.css";
import { Form, Formik } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import FailedModal from "../../Common Components/Modal/FailedModal/FailedModal";
import SuccessModal from "../../Common Components/Modal/SucessModal/SuccessModal";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

const USER_NAME_KEY = "name of logged in user";
const API_URL = "http://104.248.251.235:8000/current-employee";

function PersonalSettings() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://104.248.251.235:8000/current-employee`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        console.log(result);
        setUserData(result);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
          setShowModalError(true);
        }
      } catch (error) {
        setLoading(false);
        setShowModalError(true);
      }
    })();
  }, []);

  const initialValues = {
    name: userData?.data?.user?.name,
    national_id: userData?.data?.user?.national_id,
    date_of_birth: userData?.data?.user?.date_of_birth,
    gender: userData?.data?.user?.gender,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("الأسم مطلوب"),
    national_id: Yup.string().matches(
      /^[1-2]\d{9}$/,
      "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10 أرقام"
    ),
    date_of_birth: Yup.date().required("تاريخ الميلاد مطلوب"),
    gender: Yup.string().required("النوع مطلوب"),
  });

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const genderValue = values.gender === "انثي" ? "F" : "M";
      const items = {
        name: values.name,
        national_id: values.national_id,
        date_of_birth: values.date_of_birth,
        gender: genderValue,
      };

      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("access"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (response.ok) {
        localStorage.setItem(USER_NAME_KEY, values.name);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/Home");
          window.location.reload();
        }, 1000);

        console.log("User data updated successfully");
      } else {
        setShowModalError(true);
      }
    } catch (error) {
      setShowModalError(true);
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

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
          enableReinitialize
        >
          <Form className="settingForm mt-4">
            <div className={`row g-4 mb-5 pt-5`}>
              <div className={`col-6`}>
                <InputField name={"name"} label={"الأسم"} />
              </div>
              <div className={`col-6`}>
                <InputField label={" رقم العضوية"} name={"national_id"} />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-6`}>
                <InputField
                  name={"date_of_birth"}
                  label={"تاريخ الميلاد"}
                  type="date"
                />
              </div>
              <div className={`col-6`}>
                <InputField
                  name={"gender"}
                  label={"النوع"}
                  inputType={"select"}
                >
                  <option value="">اختر النوع</option>
                  <option value="ذكر">{"ذكر"}</option>
                  <option value="انثي">{"انثي"}</option>
                </InputField>
              </div>
            </div>
            <div className="text-center saveInfo">
              <MainButton text={"حفظ"} btnType={"submit"} isLoading={loading} />
            </div>
          </Form>
        </Formik>
      </div>

      <SuccessModal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <p className="text-center mt-2 text-dark fw-bolder mb-3">
          تم تعديل البيانات بنجاح
        </p>
      </SuccessModal>

      <FailedModal
        isOpen={showModalError}
        handleClose={() => setShowModalError(false)}
      >
        <p className="text-center mt-2 text-dark fw-bolder mb-5">
          حدث خطأ أثناء تعديل البيانات
        </p>
      </FailedModal>
    </div>
  );
}

export default PersonalSettings;
