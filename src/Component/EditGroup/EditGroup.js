import styles from "./EditGroup.module.css";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useEditSessionMutation,
  useGetSessionsQuery,
} from "../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";

const DynamicComponent = () => {
  const { GroupId } = useParams();
  console.log(GroupId);
  const { setFieldValue } = useFormikContext();
  const {
    data: session,
    isLoading: isSessionLoading,
    error: sessionError,
  } = useGetSessionsQuery(`${GroupId}`);
  console.log(session);

  useEffect(() => {
    if (session) {
      setFieldValue("name", session?.data?.session?.name);
      setFieldValue("price", session?.data?.session?.price);
      setFieldValue("duration", session?.data?.session?.duration);
      setFieldValue("notes", session?.data?.session?.description);
      setFieldValue("freeze_duration", session?.data?.session?.freeze_duration);
    }
  }, [session, setFieldValue]);

  if (isSessionLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (sessionError) {
    return (
      <div
        className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
      >
        حدث خطأ، برجاء المحاولة مرة أخرى.
      </div>
    );
  }
  return (
    <Form className={`${styles.groupForm} p-4`}>
      <div className="row mb-4 g-5">
        <div className="col-6">
          <InputField name="name" label="الإسم" />
        </div>
        <div className="col-6">
          <InputField name="duration" label="مدة الجلسة (بالدقيقة)" />
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
      <div className="row mb-4 g-5">
        <div className="col-6">
          <InputField name="freeze_duration" label="فترة التجميد" />
        </div>
      </div>
      <div className={`${styles.addgroupBtn} text-center`}>
        <MainButton text={"تعديل"} btnType={"submit"} />
      </div>
    </Form>
  );
};

const EditGroup = () => {
  const { GroupId } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    notes: Yup.string(),
    duration: Yup.number()
      .required("هذا الحقل إلزامي")
      .min(0, "مدة الجلسة لا يجب أن تكون أقل من صفر"),
    price: Yup.number().required("هذا الحقل إلزامي"),
    freeze_duration: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    price: "",
    duration: "",
    notes: "",
    freeze_duration: "",
  };

  const [editSession, { isError: isSessionsError }] = useEditSessionMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const newSession = {
      name: values["name"],
      description: values["notes"],
      price: values["price"],
      duration: values["duration"],
      freeze_duration: values["freeze_duration"],
    };

    console.log(newSession);
    try {
      const response = await editSession({
        id: GroupId,
        data: newSession,
      }).unwrap();
      console.log(response);
      localStorage.setItem("groupId", response.data.name);
      setSuccess(true);
      setTimeout(() => {
        navigate("/Home/ScheduleContainer");
        window.location.reload();
      }, 300);
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
      {success && (
        <Success text={"تم تعديل بيانات المجموعة بنجاح"} show={success} />
      )}
      {isSessionsError && <Error text={error} show={isSessionsError} />}
      <div className={`${styles.groupFormContainer}`}>
        <div className="allSubscriptionContainer mt-4">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/groups.png"}
              title={"تعديل مجموعة"}
              subTitle={"يمكنك  تعديل المجموعة من هنا"}
            />
          </div>
          <div className="">
            <div className={`${styles.addgroupContainer}`}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <DynamicComponent />
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGroup;
