import { React, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Error from "../../Common Components/Error/Error";
function ChangePhoneNumber() {
  const navigate = useNavigate();
  const valuesRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const handleSubmit = async (value) => {
    setLoading(true);
    const item = {
      phone_number: `${value["countryCode"]}${value["phone_number"]}`,
    };
    try {
      const response = await fetch(`${api}/auth/request-otp`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("access"),
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log("success send otp");
        setLoading(false);
        localStorage.setItem(
          "phone_number of Dashboard User",
          value["phone_number"]
        );
        setTimeout(() => {
          navigate("/home/VerifyOtp");
        }, 1500);
      } else {
        console.log(result);
        if (
          result.error.detail === "failed to send otp check your phone number"
        ) {
          setLoading(false);
          setError("يرجى التحقق من رقم الهاتف");
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else if (result?.status === 403) {
          setLoading(false);
          setError("ليس لديك صلاحية تغيير رقم الهاتف");
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else if (result?.status === 401) {
          setLoading(false);
          setError("انت غير مسجل الدخول، يرجى تسجيل الدخول");
          navigate("/");
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          setLoading(false);
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const intialValues = {
    phone_number: "",
    countryCode: "966",
  };
  const validationSchema = Yup.object({
    phone_number: Yup.string().required("يرجي ادخال رقم الهاتف"),
    countryCode: Yup.string().required("يرجي ادخال كود الدولة"),
  });
  return (
    <>
      {error.length > 0 && <Error text={error} show={error.length > 1} />}
      <div className="changePhoneNumberContainer">
        <Helmet>
          <title>تغير رقم الجوال </title>
        </Helmet>
        <div className="d-flex align-items-center justify-content-between pe-2">
          <ComponentTitle
            title={"الاعدادات"}
            subTitle={"يمكنك تغيير  قم الجوال من هنا"}
            MainIcon={"/assets/image/settings.png"}
          />
        </div>

        <div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={intialValues}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, setFieldValue }) => {
              valuesRef.current = values;
              return (
                <Form className="containerForm">
                  <div className="mt-5">
                    <div className="phoneNumber">
                      <label
                        className="mb-2 mt-2 text-light"
                        htmlFor={"phone_number"}
                      >
                        رقم الهاتف
                      </label>
                      <div className={`position-relative`}>
                        <Field
                          name={"phone_number"}
                          id={"phone_number"}
                          style={{
                            width: "100%",
                            backgroundColor: "rgb(222, 226, 230)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "10px",
                            outline: "none",
                            height: "52px",
                          }}
                        />
                        <div className={`countryCode`}>
                          <PhoneInput
                            country={"sa"} // Default country
                            value={values.phone}
                            onChange={(value) =>
                              setFieldValue("countryCode", value)
                            }
                            inputProps={{
                              name: "countryCode",
                              required: true,
                              autoFocus: true,
                            }}
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="saveChange text-center mt-5">
                      <ErrorMessage
                        name="countryCode"
                        component="div"
                        className="error-message"
                      />
                      <MainButton
                        text={"تأكيد"}
                        btnType={"submit"}
                        isLoading={loading}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default ChangePhoneNumber;
