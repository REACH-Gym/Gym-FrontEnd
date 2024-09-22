import styles from "./AddGroupForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostSessionMutation } from "../../features/api";
import { useNavigate } from "react-router-dom";
import { usePostSessionMutation } from "../../features/api";
import { useNavigate } from "react-router-dom";

const AddGroupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    notes: Yup.string().required("هذا الحقل إلزامي"),
    duration: Yup.number().required("هذا الحقل إلزامي"),
    price: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    notes: "",
    duration: "",
    notes: "",
  };

  const [postSession, { isLoading: isSessionsLoading }] =
    usePostSessionMutation();

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const newSession = {
      name: values["name"],
      description: values["notes"],
      price: values["price"],
      duration: values["duration"],
    };

    console.log(newSession);
    try {
      const response = await postSession(newSession);
      console.log(response);
      localStorage.setItem("groupId", response.data.name);
      navigate("/Home/AddScheduleForm");
    } catch (error) {
      console.log(error);
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
                    <InputField name="duration" label="المدة" />
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
  );
};
export default AddGroupForm;
