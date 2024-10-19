import { React, useRef } from "react";
import { Helmet } from "react-helmet";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Form, Formik, Field, ErrorMessage } from "formik";
import MainButton from "../../Common Components/Main Button/MainButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
function ChangePhoneNumber() {
  const valuesRef = useRef();
  return (
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
        <Formik>
          {({ values, handleChange, setFieldValue }) => {
            valuesRef.current = values;
            return (
              <Form className="containerForm">
                <div className="mt-5">
                  <label
                    className="mb-2 mt-2 text-secondary"
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
                        backgroundColor: "#F4F4F4",
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
                        value={values}
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
                    name={"phone_number"}
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="saveChange text-center mt-5">
                  <MainButton text={"حفظ"} btnType={"submit"} />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
export default ChangePhoneNumber;