import styles from "./AddScheduleForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField/InputField";
import MainBtn from "../common/MainBtn/MainBtn";
const AddGroupForm = () => {
  const validationSchema = Yup.object({
    group: Yup.string().required("هذا الحقل إلزامي"),
    capacity: Yup.number().required("هذا الحقل إلزامي"),
    from: Yup.date().required("هذا الحقل إلزامي"),
    time1: Yup.number().required("هذا الحقل إلزامي"),
    to: Yup.date().required("هذا الحقل إلزامي"),
    time2: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    group: "",
    capacity: "",
    from: "",
    time1: "",
    to: "",
    time2: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div
      style={{ height: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={`${styles.groupForm}`}>
          <div className="row mb-4 g-5">
            <div className="col-6">
              <InputField name="group" label="المجموعة" inputType={"select"}>
                <option value="">إختر</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </InputField>
            </div>
            <div className="col-6">
              <InputField name="capacity" label="الطاقة الإستيعابية" />
            </div>
          </div>
          <div className="row mb-4 g-5">
            <div className="col-6">
              <InputField
                name="from"
                label="من"
                inputType={"input"}
                type={"date"}
              />
            </div>
            <div className="col-6">
              <InputField name="time1" label="الساعة" />
            </div>
          </div>
          <div className="row mb-5 g-5">
            <div className="col-6">
              <InputField
                name="to"
                label="إلى"
                inputType={"input"}
                type={"date"}
              />
            </div>
            <div className="col-6">
              <InputField name="time2" label="الساعة" />
            </div>
          </div>
          <div className="row">
            <MainBtn text="إضافة" btnType="submit" btnWidth={"200px"} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddGroupForm;
