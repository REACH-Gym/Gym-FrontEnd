import InputField from "../../Common Components/InputField/InputField";
import styles from "./OfferDetails.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { useEditOfferMutation, useGetOfferQuery } from "../../features/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";
import { Commet } from "react-loading-indicators";

const OfferDetails = () => {
  const { data: offer, isLoading } = useGetOfferQuery("");
  const [editOffer] = useEditOfferMutation();
  const [editable, setEditable] = useState(false);
  const initialValues = {
    offerDays: offer?.data.free_days,
  };
  const validationSchema = Yup.object({
    offerDays: Yup.string().required("هذا الحقل الزامي"),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (values) => {
    const data = {
      free_days: values.offerDays,
    };
    console.log(data);
    try {
      const response = await editOffer(data).unwrap();
      console.log(response);
      setEditable(false);
      setSuccess("تم تعديل العرض بنجاح!");
      setTimeout(() => {
        setSuccess("");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const handleActivation = async () => {
    if (offer.data.is_active) {
      const data = { is_active: false };
      try {
        const response = await editOffer(data);
        console.log(response);
        setSuccess("تم تعطيل العرض بنجاح!");
        setTimeout(() => {
          setSuccess("");
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
        if (error.originalStatus === 403) {
          setError("ليس لديك الصلاحية لإضافة مجموعة.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    } else {
      const data = { is_active: true };
      try {
        const response = await editOffer(data);
        console.log(response);
        setSuccess("تم تفعيل العرض بنجاح|");
        setTimeout(() => {
          setSuccess("");
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
        if (error.originalStatus === 403) {
          setError("ليس لديك الصلاحية لإضافة مجموعة.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
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
    <>
      {success.length > 0 && <Success text={success} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/Users.png"}
          title={"تفاصيل طلب الإشتراك"}
          subTitle={"يمكنك متابعة تفاصيل طلبات الإشتراكات من هنا  "}
        />
        <div
          className="rounded-2"
          style={{ backgroundColor: "#373636", padding: "50px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name="offerDays"
                    label="عدد الإيام الخاصة بالعرض"
                    inputType={"select"}
                    disabled={!editable}
                  >
                    <option value={""}>اختر</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                  </InputField>
                </div>
              </div>
              <div className="row text-center mt-4 d-flex justify-content-center gap-5 mt-5">
                {editable ? (
                  <button className={`${styles.acceptButton} bg-primary`}>
                    حفظ
                  </button>
                ) : (
                  <div
                    className={`${styles.acceptButton} bg-primary`}
                    type="button"
                    onClick={() => {
                      setEditable(true);
                    }}
                  >
                    تعديل
                  </div>
                )}
                {offer.data.is_active ? (
                  <div
                    className={`${styles.cancelButton} bg-danger`}
                    onClick={handleActivation}
                  >
                    <div className={`d-inline-block fw-bold`}>
                      إلغاء التفعيل
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${styles.cancelButton}`}
                    onClick={handleActivation}
                  >
                    <div className={`d-inline-block fw-bold`}>تفعيل</div>
                  </div>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
