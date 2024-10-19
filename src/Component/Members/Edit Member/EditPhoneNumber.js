import React, { useEffect, useState, useRef } from "react";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function EditPhoneNumber() {
  const location = useLocation();
  const member = location.state?.member;
  const valuesRef = useRef(null);

  const [initialValues, setInitialValues] = useState({
    phone_number: "",
  });
  const validationSchema = Yup.object({
    phone_number: Yup.string().max(11).required("هذا الحقل الزامي"),
  });

  useEffect(() => {
    if (member) {
      setInitialValues({
        phone_number: member.phone_number,
      });
    }
  }, [member]);
  const handleSubmit = async (value) => {
    try {
    } catch (error) {}
  };
  return (
    <div className="editMemberContainer">
      <Helmet>
        <title>تعديل رقم الجوال الخاص بالعضو</title>
      </Helmet>
      <div>
        <ComponentTitle
          title={"تعديل رقم الجوال"}
          subTitle={"يمكنك تعديل العضو المطلوب من هنا"}
          MainIcon={"/assets/image/Vector.png"}
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
      >
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
                      value={values.phone}
                      onChange={(value) => setFieldValue("countryCode", value)}
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
  );
}

export default EditPhoneNumber;
