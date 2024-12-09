import { Form, Formik } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import styles from "./GymContract.module.css";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import {
  useEditContractMutation,
  useGetContractQuery,
} from "../../features/api";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

function GymContract() {
  const {
    data: contractData,
    isLoading: isContractLoading,
    error: contractError,
  } = useGetContractQuery("");
  console.log(contractData);

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (contractData) {
      setInitialValues({
        title: contractData?.data?.title,
        introduction: contractData?.data?.introduction,
        terms_and_conditions: contractData?.data?.title,
        member_rights: contractData?.data?.member_rights,
        member_duties: contractData?.data?.member_duties,
        payment_terms: contractData?.data?.payment_terms,
        package_prices: contractData?.data?.package_prices,
        arriving_at_the_club: contractData?.data?.arriving_at_the_club,
        classes_and_dates: contractData?.data?.classes_and_dates,
        which_prohibits_the_member:
          contractData?.data?.which_prohibits_the_member,
        cancel_membership: contractData?.data?.cancel_membership,
        communication_mechanisms: contractData?.data?.communication_mechanisms,
      });
    }
  }, [contractData]);

  const validationSchema = Yup.object({
    title: Yup.string().required("هذا الحقل الزامي"),
    introduction: Yup.string().required("هذا الحقل الزامي"),
    terms_and_conditions: Yup.string().required("هذا الحقل الزامي"),
    member_rights: Yup.string().required("هذا الحقل الزامي"),
    member_duties: Yup.string().required("هذا الحقل الزامي"),
    payment_terms: Yup.string().required("هذا الحقل الزامي"),
    package_prices: Yup.string().required("هذا الحقل الزامي"),
    arriving_at_the_club: Yup.string().required("هذا الحقل الزامي"),
    classes_and_dates: Yup.string().required("هذا الحقل الزامي"),
    which_prohibits_the_member: Yup.string().required("هذا الحقل الزامي"),
    cancel_membership: Yup.string().required("هذا الحقل الزامي"),
    communication_mechanisms: Yup.string().required("هذا الحقل الزامي"),
  });

  const [editContract, { isLoading: isEditContarctLoading }] =
    useEditContractMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await editContract(values);
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home");
      }, 3000);
    } catch (error) {
      if (error.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (error.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const navigate = useNavigate();

  if (isContractLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (contractError) {
    if (contractError?.status === 403) {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (contractError?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      {success && <Success text={"تم تعديل العقد "} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      <div className={`${styles.groupFormContainer}`}>
        <div className="addgroupContainer mt-4">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/contract.png"}
              title={"عقد اتفاقية النادي"}
              subTitle={"يمكنك   تعديل عقد اتفاقية النادي من هنا"}
            />
          </div>
          <div className="">
            <div className={`${styles.addgroupContainer}`}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form
                  className={`${styles.groupForm} p-4 d-flex flex-column align-items-stretch gap-3`}
                >
                  <div className="fs-4 text-light mb-3 fw-bold text-center w-100">
                    فقرات عقد اتفاقية النادي
                  </div>
                  <div>
                    <InputField name="title" label="العنوان" />
                  </div>
                  <div>
                    <InputField
                      name="introduction"
                      label="المقدمة"
                      inputType={"textarea"}
                    />
                  </div>
                  <div>
                    <InputField
                      name="terms_and_conditions"
                      label="الشروط والأحكام"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="member_rights"
                      label="حقوق الأعضاء"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="member_duties"
                      label="واجبات الأعضاء"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="payment_terms"
                      label="شروط الدفع"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="package_prices"
                      label="أسعار الباقات"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="arriving_at_the_club"
                      label="الوصول إلى النادي"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="classes_and_dates"
                      label="الحصص والمواعيد"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="which_prohibits_the_member"
                      label="ما الذي يحرم على العضو"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="cancel_membership"
                      label="إلغاء العضوية"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div>
                    <InputField
                      name="communication_mechanisms"
                      label="آليات التواصل"
                      inputType={"textarea"}
                    />
                    <p className="text-secondary">
                      في هذا الحقل عند كتابة رمز النقطة (.) سيتم إضافة سطر جديد
                      في ملف الـ pdf لهذا العقد.
                    </p>
                  </div>
                  <div className={`${styles.addgroupBtn} text-center`}>
                    <MainButton
                      text={"تعديل"}
                      btnType={"submit"}
                      isLoading={isEditContarctLoading}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GymContract;
