import styles from "./AddGroupForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import ContentContainer from "../ContentContainer/ContentContainer";
import { usePostSessionMutation } from "../../features/api";
import { useNavigate } from "react-router-dom";

const AddGroupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    notes: Yup.string().required("هذا الحقل إلزامي"),
    price: Yup.number().required("هذا الحقل إلزامي"),
    duration: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    price: "",
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
    <ContentContainer
      title={"إضافة مجموعة جديدة"}
      desc={"يمكنك إضافة مجموعة جديدة هنا"}
      mainIcon={"/assets/image/groups.png"}
    >
      <div>
        <div className="d-flex">
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
                    <InputField name="price" label="السعر" />
                  </div>
                </div>
                <div className="row mb-4 g-5">
                  <div className="col-6">
                    <InputField name="duration" label="المدة" />
                  </div>
                  <div className="col-6">
                    <InputField name="notes" label="ملاحظات" />
                  </div>
                </div>
                <div className={`addmemberBtn m-auto text-center`}>
                  <MainButton
                    text={"اضافة"}
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

export default AddGroupForm;
