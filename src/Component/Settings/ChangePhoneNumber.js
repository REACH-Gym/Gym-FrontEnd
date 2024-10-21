import { React, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Form, Formik} from "formik";
import MainButton from "../../Common Components/Main Button/MainButton";
import InputField from "../../Common Components/InputField/InputField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
function ChangePhoneNumber() {
  const navigate = useNavigate();
  const valuesRef = useRef();
  const [loading , setLoading] =  useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    const item = {
      phone_number: value['phone_number'],
    }
    try {
      const response = await fetch('https://gym-backend-production-65cc.up.railway.app/auth/request-otp',{
        method:"POST",
        headers:{
          Authorization:localStorage.getItem('access'),
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(item)
      })
      const result = await response.json();
      console.log(result);
      if(response.ok){
        console.log('success send otp');
        localStorage.setItem("phone_number of Dashboard User", value["phone_number"]);
        setTimeout(() => {
          navigate('/home/VerifyOtp');
        }, 1500);
      }else{
        console.log('failed send otp');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const intialValues = {
    phone_number:"",
  }
  const validationSchema =Yup.object({
    phone_number: Yup.string().max(11).required("يرجي ادخال رقم الهاتف"),
  })
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
        <Formik onSubmit={handleSubmit} initialValues={intialValues} validationSchema={validationSchema}>
          {({ values, handleChange, setFieldValue }) => {
            valuesRef.current = values;
            return (
              <Form className="containerForm">
                <div className="mt-5">
                <div className="phoneNumber">
                <InputField label={'رقم الجوال'} name={'phone_number'}/>
                </div>
                <div className="saveChange text-center mt-5">
                  <MainButton text={"تأكيد"} btnType={"submit"} isLoading={loading}/>
                </div>
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