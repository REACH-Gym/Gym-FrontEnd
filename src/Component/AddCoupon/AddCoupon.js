import styles from "./AddCoupon.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { usePostCouponMutation } from "../../features/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";

const AddCoupon = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  const validationSchema = Yup.object({
    code: Yup.string().required("هذا الحصل إلزامي"),
    usage_limit: Yup.string().required("هذا الحصل إلزامي"),
    end_date: Yup.string().required("هذا الحصل إلزامي"),
    start_date: Yup.string().required("هذا الحصل إلزامي"),
    discount_type: Yup.string().required("هذا الحصل إلزامي"),
    discount_value: Yup.number()
      .min(0, "يجب أن يكون الخصم أكبر من صفر")
      .required("هذا الحصل إلزامي"),
  });
  const initialValues = {
    code: "",
    usage_limit: "",
    end_date: "",
    start_date: "",
    discount_type: "",
    discount_value: 0,
  };

  const [
    postCoupon,
    { isLoading: isSessionsLoading, isError: isSessionsError },
  ] = usePostCouponMutation();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    const newCoupon = {
      code: values["code"],
      usage_limit: values["usage_limit"],
      start_date: values["start_date"],
      end_date: values["end_date"],
      discount_type: values["discount_type"],
      discount_value: values["discount_value"],
    };

    console.log(newCoupon);
    try {
      const response = await postCoupon(newCoupon).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/CouponsContainer");
        window.location.reload();
      }, 300);
    } catch (error) {
      if (error.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 1000);
      } else if (error.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 1000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    }
  };
  return (
    <>
      {success && <Success text={"تم إضافة المجموعة! "} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      <div className={`${styles.groupFormContainer}`}>
        <div className="allSubscriptionContainer mt-4">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              MainIcon={"/assets/image/groups.png"}
              title={"اضافة خصم جديد"}
              subTitle={"يمكنك اضافة خصم جديد من هنا"}
            />
          </div>
          <div className="">
            <div className={`${styles.addgroupContainer}`}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => {
                  return (
                    <Form className={`${styles.groupForm} p-4`}>
                      <div className="row mb-4 g-5">
                        <div className="col-6">
                          <InputField name="code" label="كود الخصم" />
                        </div>
                        <div className="col-6">
                          <InputField
                            name="usage_limit"
                            label="عدد مرات الإستخدام"
                          />
                        </div>
                      </div>
                      <div className="row mb-4 g-5">
                        <div className="col-6">
                          <InputField
                            name="start_date"
                            label="تاريخ البداية"
                            inputType={"input"}
                            type={"date"}
                          />
                        </div>
                        <div className="col-6">
                          <InputField
                            name="end_date"
                            label="تاريخ النهاية"
                            inputType={"input"}
                            type={"date"}
                          />
                        </div>
                      </div>
                      <div className="row mb-4 g-5">
                        <div
                          className={`col-6 ${styles.radioContainer}`}
                          style={{ marginBottom: "120px" }}
                        >
                          <InputField
                            name="discount_type"
                            label="برجاء اختيار طريقة كود الخصم"
                            // inputType={"input"}
                            render={({ field }) => (
                              <>
                                <div className="position-relative">
                                  <div
                                    className={`${styles.radioItem} w-100`}
                                    onClick={() => {
                                      setFieldValue("discount_type", "price");
                                      setDropdown1(!dropdown1);
                                      !dropdown1 &&
                                        dropdown2 &&
                                        setDropdown2(false);
                                    }}
                                  >
                                    <svg
                                      width="9"
                                      height="16"
                                      viewBox="0 0 9 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={`${styles.arrow} ${
                                        dropdown1 && styles.down
                                      }`}
                                    >
                                      <path
                                        d="M8.65831 0.313349C8.24929 -0.10445 7.58985 -0.10445 7.18083 0.313349L0.244161 7.39888C-0.0813869 7.73141 -0.0813869 8.26858 0.244161 8.60112L7.18083 15.6867C7.58985 16.1045 8.24929 16.1045 8.65831 15.6867C9.06733 15.2689 9.06733 14.5953 8.65831 14.1775L2.61481 7.99574L8.66666 1.81402C9.06733 1.40474 9.06733 0.722622 8.65831 0.313349Z"
                                        fill="#666666"
                                      />
                                    </svg>

                                    <input
                                      {...field}
                                      id="discount_type"
                                      value="price"
                                      name="discount_type"
                                      type="radio"
                                      checked={field.value === "price"}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "discount_type",
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <label htmlFor="male">قيمة</label>
                                  </div>
                                  {dropdown1 && (
                                    <div
                                      className={`${styles.radioInput} ${
                                        dropdown1 && styles.active
                                      }`}
                                    >
                                      <InputField
                                        name={"discount_value"}
                                        label={"برجاء ادخال مبلغ الخصم"}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="position-relative">
                                  <div
                                    className={`${styles.radioItem} w-100`}
                                    onClick={() => {
                                      setFieldValue(
                                        "discount_type",
                                        "percentage"
                                      );
                                      setDropdown2(!dropdown2);
                                      !dropdown2 &&
                                        dropdown1 &&
                                        setDropdown1(false);
                                    }}
                                  >
                                    <svg
                                      width="9"
                                      height="16"
                                      viewBox="0 0 9 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={`${styles.arrow} ${
                                        dropdown2 && styles.down
                                      }`}
                                    >
                                      <path
                                        d="M8.65831 0.313349C8.24929 -0.10445 7.58985 -0.10445 7.18083 0.313349L0.244161 7.39888C-0.0813869 7.73141 -0.0813869 8.26858 0.244161 8.60112L7.18083 15.6867C7.58985 16.1045 8.24929 16.1045 8.65831 15.6867C9.06733 15.2689 9.06733 14.5953 8.65831 14.1775L2.61481 7.99574L8.66666 1.81402C9.06733 1.40474 9.06733 0.722622 8.65831 0.313349Z"
                                        fill="#666666"
                                      />
                                    </svg>

                                    <input
                                      {...field}
                                      id="discount_type"
                                      value="percentage"
                                      name="discount_type"
                                      type="radio"
                                      checked={field.value === "percentage"}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "discount_type",
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <label htmlFor="female">نسبة</label>
                                  </div>
                                  {dropdown2 && (
                                    <div
                                      className={`${styles.radioInput} ${
                                        dropdown2 && styles.active
                                      }`}
                                    >
                                      <InputField
                                        name={"discount_value"}
                                        label={"برجاء ادخال نسبة الخصم"}
                                      />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <div className={`${styles.addgroupBtn} text-center`}>
                        <MainButton
                          text={"اضافة"}
                          btnType={"submit"}
                          isLoading={isSessionsLoading}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCoupon;
