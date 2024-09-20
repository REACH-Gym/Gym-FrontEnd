import styles from "./AddScheduleForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
const AddScheduleForm = () => {
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
    <div className={`${styles.schedulFormeContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/appointments.png"}
          title={"اضافه موعد جديد"}
          subTitle={"يمكنك اضافه موعد جديد من هنا"}
        />
      </div>
      <div
        style={{ height: "100%" }}
        className="  justify-content-center align-items-center mt-3"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={`${styles.groupForm} p-4`}>
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
            <div className={`${styles.AddSchedule} text-center`}>
              <MainButton text="إضافة" btnType="submit" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddScheduleForm;
