import styles from "./AddGroupForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import SidebarBox from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
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
    <div>
      <Navbar/>
        <div className="d-flex">
          <SidebarBox/>
        
      <div className={`${styles.addgroupContainer}`}
      // style={{ height: "100%" }}
      // className="d-flex justify-content-center align-items-center"
    >

      {/*add group */}
      <section className="d-flex align-items-center pe-5">
            <div className="ms-3 mb-3 bg-light p-2 rounded">
              <img
                src="/assets/image/group-svgrepo-com.png"
                alt="home logo"
                width={"21.08px"}
                height={"13.42"}
              />
            </div>
            <div>
              <p className="mb-0"> إضافة مجموعة جديدة </p>
              <p className="fw-lighter">يمكنك إضافة مجموعة جديدة من هنا</p>
            </div>
          </section>
          {/*end of add group */}
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
          <div className={`addmemberBtn m-auto`}>
                <MainButton text={"اضافة"} btnType={"submit"} />
              </div>
        </Form>
      </Formik>
    </div>
      </div>
      </div>
    
  );
};

export default AddGroupForm;
