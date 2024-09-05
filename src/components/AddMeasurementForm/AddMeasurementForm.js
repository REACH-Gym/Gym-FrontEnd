import styles from "./AddMeasurementForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField/InputField";
import MainBtn from "../common/MainBtn/MainBtn";

// Add Measurements Form Container And Controller
const AddMeasurementForm = () => {
  const validationSchema = Yup.object({
    member: Yup.string().required("هذا الحقل إلزامي"),
    height: Yup.number().required("هذا الحقل إلزامي").max(300),
    month: Yup.date().required("هذا الحقل إلزامي"),
    weight1: Yup.number().required("هذا الحقل إلزامي").max(300),
    weight2: Yup.number().required("هذا الحقل إلزامي").max(300),
    shoulder1: Yup.number().required("هذا الحقل إلزامي").max(300),
    shoulder2: Yup.number().required("هذا الحقل إلزامي").max(300),
    chest1: Yup.number().required("هذا الحقل إلزامي").max(300),
    chest2: Yup.number().required("هذا الحقل إلزامي").max(300),
    waist1: Yup.number().required("هذا الحقل إلزامي").max(300),
    waist2: Yup.number().required("هذا الحقل إلزامي").max(300),
    arm1: Yup.number().required("هذا الحقل إلزامي").max(300),
    arm2: Yup.number().required("هذا الحقل إلزامي").max(300),
    thigh1: Yup.number().required("هذا الحقل إلزامي").max(300),
    thigh2: Yup.number().required("هذا الحقل إلزامي").max(300),
    buttocks1: Yup.number().required("هذا الحقل إلزامي").max(300),
    buttocks2: Yup.number().required("هذا الحقل إلزامي").max(300),
  });
  const initialValues = {
    member: "",
    height: "",
    month: "",
    weight1: "",
    weight2: "",
    shoulder1: "",
    shoulder2: "",
    chest1: "",
    chest2: "",
    waist1: "",
    waist2: "",
    arm1: "",
    arm2: "",
    thigh1: "",
    thigh2: "",
    buttocks1: "",
    buttocks2: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={`${styles.formContainer} mt-5 mb-5`}>
          <div className={`row g-4 mb-5`}>
            <div className={`col-4 col-lg-6`}>
              <InputField name="member" label={"العضو"} />
            </div>
            <div className={`col-2`}>
              <InputField name="height" label={"الطول"} />
            </div>
            <div className={`col-3 col-lg-2`}>
              <InputField name="month" label={"قياسات شهر"} />
            </div>
            <div className={`col-3 col-lg-2`}>
              <InputField name="weight1" label={"الوزن بداية الشهر"} />
            </div>
            <div className={`col-3 col-lg-2`}>
              <InputField name="weight2" label={"الوزن نهاية الشهر"} />
            </div>
          </div>
          <div className={`row mb-5`}>
            <div className="col-4">
              <div className="row mb-4">
                <div className={`${styles.title}`}>قياسات بداية الشهر</div>
              </div>
              <div className="row g-4">
                <div className={`col-6`}>
                  <InputField name="shoulder1" label={"الكتف"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="arm1" label={"الذراع"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="buttocks1" label={"الأرداف"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="chest1" label={"الصدر"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="waist1" label={"الخصر"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="thigh1" label={"الفخذ"} />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className={`row`}>
                <div className={`col-2`}></div>
                <div className={`col-8 text-center`}>
                  <img src="assets/body.png" alt="Body" />
                </div>
                <div className={`col-2`}></div>
              </div>
            </div>
            <div className="col-4">
              <div className="row mb-4">
                <div className={`${styles.title}`}>قياسات نهاية الشهر</div>
              </div>
              <div className="row g-4">
                <div className={`col-6`}>
                  <InputField name="shoulder2" label={"الكتف"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="arm2" label={"الذراع"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="buttocks2" label={"الأرداف"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="chest2" label={"الصدر"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="waist2" label={"الخصر"} />
                </div>
                <div className={`col-6`}>
                  <InputField name="thigh2" label={"الفخذ"} />
                </div>
              </div>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-12`}>
              <MainBtn
                text="حفظ القياسات"
                btnType={"submit"}
                btnWidth={"200px"}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddMeasurementForm;
