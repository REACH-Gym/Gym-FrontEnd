import styles from "./AddMeasurementForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import {
  useAddMeasurementsMutation,
  useGetAllMembersAtOnceQuery,
} from "../../features/api";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";

// Add Measurements Form Container And Controller
const AddMeasurementForm = () => {
  const validationSchema = Yup.object({
    user_id: Yup.number(),
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
    user_id: 0,
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
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      user_id: values.user_id,
      user: values.user_id,
      month: values.month,
      height: values.height,
      weight: values.weight1,
      shoulder: values.shoulder1,
      waist: values.waist1,
      chest: values.chest1,
      arm: values.arm1,
      thigh: values.thigh1,
      buttock: values.buttocks1,
    };
    console.log(data);
    try {
      const response = await addMeasuremenst(data);
      console.log(response);
      navigate("/Home/MeasurmentsContainer");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const {
    data,
    isLoading: isMembersLoading,
    error,
  } = useGetAllMembersAtOnceQuery();
  error && console.log(error);

  const [active, setActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  console.log(active);

  const handleChange = (e, setFieldValue) => {
    setFieldValue("member", e.target.value);
    const query = e.target.value.toLowerCase();
    const filteredData = data?.data.users.filter((item) => {
      return item.name && item.name.toString().toLowerCase().includes(query);
    });
    setFilteredData(filteredData);
  };

  if (isMembersLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{
          height: "100vh",
          backgroundColor: "#373636",
        }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    if (error?.status === 403) {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (error?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <div className={`${styles.AddMeasurementFormContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/measurments.png"}
          title={"اضافة قياس جديد"}
          subTitle={"يمكنك اضافة قياس  جديد من هنا"}
        />
      </div>
      <div className={`${styles.addMeasurmentsContainer}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className={`${styles.formContainer} p-4`}>
              <div className={`row g-4 d-flex align-items-end w-100`}>
                <div className={`col-12 col-lg-5`}>
                  <div className={`row g-4`}>
                    <div className={`col-12 ${styles.membersSearch}`}>
                      <InputField
                        name="member"
                        label={"العضو"}
                        onFocus={() => {
                          setFilteredData(data?.data.users);
                          setActive(true);
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            setActive(false);
                          }, 1000);
                        }}
                        onChange={(e) => {
                          handleChange(e, setFieldValue);
                        }}
                        value={values.member}
                      />
                      {active ? (
                        <div className={`${styles.membersDropdown}`}>
                          {filteredData?.map((member, i) => (
                            <div
                              key={member.id}
                              value={member.id}
                              onClick={() => {
                                setFieldValue("member", member.name);
                                setFieldValue("user_id", member.id);
                                console.log(member.name);
                              }}
                            >
                              {member.name}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className={`col-12`}>
                      <InputField
                        name="month"
                        label={"قياسات شهر"}
                        inputType={"input"}
                        type={"date"}
                      />
                    </div>
                    <div className={`col-6`}>
                      <InputField name="height" label={"الطول"} />
                    </div>
                    <div className={`col-6`}>
                      <InputField name="weight1" label={"الوزن بداية الشهر"} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-2 text-center p-2">
                  <img
                    src="/assets/image/body.png"
                    alt="Body"
                    style={{ maxHeight: "350px" }}
                  />
                </div>
                <div className="col-12 col-lg-5">
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
              <div className={`addmemberBtn m-auto w-100 text-center mt-5`}>
                <MainButton
                  text={"حفظ القياس"}
                  btnType={"submit"}
                  btnWidth="200px"
                  isLoading={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default memo(AddMeasurementForm);
