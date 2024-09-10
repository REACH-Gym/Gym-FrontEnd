import styles from "./AddMeasurementForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import { useAddMeasurementsMutation } from "../../features/api";
import ContentContainer from "../ContentContainer/ContentContainer";

// Add Measurements Form Container And Controller
const AddMeasurementForm = () => {
  const validationSchema = Yup.object({
    member: Yup.string().required("هذا الحقل إلزامي"),
    height: Yup.number().required("هذا الحقل إلزامي").max(300),
    month: Yup.date().required("هذا الحقل إلزامي"),
    weight1: Yup.number().required("هذا الحقل إلزامي").max(300),
    shoulder1: Yup.number().required("هذا الحقل إلزامي").max(300),
    chest1: Yup.number().required("هذا الحقل إلزامي").max(300),
    waist1: Yup.number().required("هذا الحقل إلزامي").max(300),
    arm1: Yup.number().required("هذا الحقل إلزامي").max(300),
    thigh1: Yup.number().required("هذا الحقل إلزامي").max(300),
    buttocks1: Yup.number().required("هذا الحقل إلزامي").max(300),
  });
  const initialValues = {
    member: "",
    height: "",
    month: "",
    weight1: "",
    shoulder1: "",
    chest1: "",
    waist1: "",
    arm1: "",
    thigh1: "",
    buttocks1: "",
  };
  const [addMeasuremenst, { isLoading }] = useAddMeasurementsMutation();
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await addMeasuremenst();
      console.log(response);
      console.log(isLoading);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ContentContainer
      title={"إضافة قياس جديد"}
      desc={"يمكنك إضافة قياس جديد هنا"}
      mainIcon={"/assets/image/measurements.png"}
    >
      <div>
        <div className="d-flex">
          <div className={`${styles.addMeasurmentsContainer}`}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className={`${styles.formContainer} p-4`}>
                <div className={`row g-4 d-flex align-items-end w-100`}>
                  <div className={`col-5`}>
                    <div className={`row g-4`}>
                      <div className={`col-12`}>
                        <InputField
                          name="member"
                          label={"العضو"}
                          inputType={"select"}
                        >
                          <option>1</option>
                          <option>1</option>
                          <option>1</option>
                          <option>1</option>
                        </InputField>
                      </div>
                      <div className={`col-12`}>
                        <InputField name="month" label={"قياسات شهر"} />
                      </div>
                      <div className={`col-6`}>
                        <InputField name="height" label={"الطول"} />
                      </div>
                      <div className={`col-6`}>
                        <InputField
                          name="weight1"
                          label={"الوزن بداية الشهر"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2 text-center p-2">
                    <img
                      src="/assets/image/body.png"
                      alt="Body"
                      style={{ maxHeight: "350px" }}
                    />
                  </div>
                  <div className="col-5">
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
                </div>
                {/* button to confirm add memeber */}
                <div className={`addmemberBtn m-auto w-100 text-center mt-5`}>
                  <MainButton
                    text={"حفظ القياس"}
                    btnType={"submit"}
                    btnWidth="200px"
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default AddMeasurementForm;
