import styles from "./AddGroupForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostSessionMutation } from "../../features/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";

const AddGroupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    notes: Yup.string().required("هذا الحقل إلزامي"),
    duration: Yup.number().required("هذا الحقل إلزامي"),
    price: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    price: "",
    duration: "",
    notes: "",
  };

  const [
    postSession,
    { isLoading: isSessionsLoading, isError: isSessionsError },
  ] = usePostSessionMutation();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    const newSession = {
      name: values["name"],
      description: values["notes"],
      price: values["price"],
      duration: values["duration"],
    };

    console.log(newSession);
    try {
      const response = await postSession(newSession).unwrap();
      console.log(response);
      localStorage.setItem("groupId", response.data.name);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/ScheduleContainer");
      }, 1200);
    } catch (error) {
      if (error.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
      } else if (error.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
      }
    }
  };
  return (
    <>
      {success && <Success text={"تم إضافة المجموعة! "} />}
      {isSessionsError && <Error text={error} show={isSessionsError} />}
      <div className={`${styles.groupFormContainer}`}>
        <div className="allSubscriptionContainer mt-4">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/groups.png"}
              title={"اضافة مجموعة جديدة"}
              subTitle={"يمكنك   اضافة مجموهة جديدة من هنا"}
            />
          </div>
          <div className="">
            <div className={`${styles.addgroupContainer}`}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className={`${styles.groupForm} p-4`}>
                  <div className="row mb-4 g-5">
                    <div className="col-6">
                      <InputField name="name" label="الإسم" />
                    </div>
                    <div className="col-6">
                      <InputField name="duration" label="المدة (بالشهر)" />
                    </div>
                  </div>
                  <div className="row mb-4 g-5">
                    <div className="col-6">
                      <InputField name="price" label="السعر" />
                    </div>
                    <div className="col-6">
                      <InputField name="notes" label="ملاحظات" />
                    </div>
                  </div>
                  <div className={`${styles.addgroupBtn} text-center`}>
                    <MainButton text={"اضافة"} btnType={"submit"} />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddGroupForm;
