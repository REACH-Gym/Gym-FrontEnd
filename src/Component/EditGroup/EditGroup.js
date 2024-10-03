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
import { useEffect } from "react";
import { Commet } from "react-loading-indicators";

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
      <div className="d-flex justify-content-center align-items-center w-100">
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
          <InputField name="duration" label="مدة الجلسة (بالساعة)" />
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
    notes: Yup.string().required("هذا الحقل إلزامي"),
    duration: Yup.number().required("هذا الحقل إلزامي").max(8),
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

  const [editSession] = useEditSessionMutation();

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
    if (window.confirm("هل تريد تأكيد هذه التعديلات؟")) {
      try {
        const response = await editSession({ id: GroupId, data: newSession });
        console.log(response);
        localStorage.setItem("groupId", response.data.name);
        navigate("/Home/ScheduleContainer");
      } catch (error) {
        console.log(error);
        alert("حدث خطأ، برجاء المحاولة لاحقاً.");
      }
    } else {
      alert("تم إلغاء التعديلات.");
      navigate("/Home/ScheduleContainer");
    }
  };
  return (
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
              <DynamicComponent />
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGroup;
