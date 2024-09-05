import styles from "./AddGroupForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField/InputField";
import MainBtn from "../common/MainBtn/MainBtn";
const AddGroupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    price: Yup.number().required("هذا الحقل إلزامي"),
    discount: Yup.number().required("هذا الحقل إلزامي"),
    duration: Yup.number().required("هذا الحقل إلزامي"),
    numOfReservations: Yup.number().required("هذا الحقل إلزامي"),
    freezeDuration: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    price: "",
    discount: "",
    duration: "",
    numOfReservations: "",
    freezeDuration: "",
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
              <InputField name="name" label="الإسم" />
            </div>
            <div className="col-6">
              <InputField name="price" label="السعر" />
            </div>
          </div>
          <div className="row mb-4 g-5">
            <div className="col-6">
              <InputField name="discount" label="الخصم (%)" />
            </div>
            <div className="col-6">
              <InputField name="duration" label="المدة" />
            </div>
          </div>
          <div className="row mb-5 g-5">
            <div className="col-6">
              <InputField name="freezeDuration" label="فترة التجميد" />
            </div>
            <div className="col-6">
              <InputField name="numOfReservations " label="عدد مرات الحجز" />
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
