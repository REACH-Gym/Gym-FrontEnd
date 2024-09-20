import styles from "./AddScheduleForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostScheduleMutation } from "../../features/api";
const AddScheduleForm = () => {
  const validationSchema = Yup.object({
    group: Yup.string().required("هذا الحقل إلزامي"),
    capacity: Yup.number().required("هذا الحقل إلزامي"),
    days: Yup.string().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    group: "",
    capacity: "",
    from: "",
    time1: "",
    to: "",
    time2: "",
  };
  const [postSchedule, { isLoading: isPostSchedulesLoading }] =
    usePostScheduleMutation();

  const handleSubmit = (values) => {
    console.log(values);
    const newSchedule = {
      group: values["group"],
      capacity: values["capacity"],
      from: values["from"],
      time1: values["time1"],
      to: values["to"],
      time2: values["time2"],
    };
    console.log(newSchedule);
    try {
      const response = postSchedule(newSchedule);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            <div className="row text-center">
              <MainButton text="إضافة" btnType="submit" btnWidth={"200px"} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddScheduleForm;
