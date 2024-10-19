import React from "react";
import { Helmet } from "react-helmet";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Formik, Form } from "formik";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import * as Yup from "yup";

function ChangePassword() {
  const handleSubmit = () => {};
  const validationSchema = Yup.object({});
  const initialValues = {};
  return (
    <div className="changePasswordContainer">
      <Helmet>
        <title>تغير كلمة السر</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          title={"الاعدادات"}
          subTitle={"يمكنك تغيير كلمة السر من هنا"}
          MainIcon={"/assets/image/settings.png"}
        />
      </div>
      <div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="changePassForm mt-4">
            <div className={`row g-4  mb-5 pt-5 `}>
              <div className={`col-6 col-lg-6`}>
                <InputField name={"password"} label={"كلمة السر القديمة"} />
              </div>
              <p style={{color:"#3572EF"}}>هل نسيت كلمة السر؟</p>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-6 col-lg-6`}>
                <InputField
                  name={"new_password"}
                  label={"كلمة السر الجديدة"}
                />
              </div>
            </div>
            <div className={`row g-4 mb-5`}>
              <div className={`col-6 col-lg-6`}>
                <InputField
                  name={"confirm_new_password"}
                  label={"تأكيد كلمة السر الجديدة"}
                />
              </div>
            </div>
            <div className=" saveInfo">
              <MainButton text={"حفظ"} btnType={"submit"} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default ChangePassword;