import React from "react";
import "./EditMember.css";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import MainButton from "../../../Common Components/Main Button/MainButton";
import InputField from "../../../Common Components/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
function EditMember() {
  const { id } = useParams();
  const access_token = localStorage.getItem("access");
  const handleSubmit = async (value) => {
    try {
      const items = {
        name: value["name"],
        phone_number: value["phone_number"],
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        genderValue: value.gender === "أنثي" ? "F" : "M",
      };
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/members/${id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(items),
        }
      );
      const result = await response.json();
      console.log(result);
      console.log(result.data);
      if (response.ok) {
        console.log("successe");
      } else {
        console.error("falied");
      }
    } catch (error) {
      console.error("An Error Ocurred!", error);
    }
  };
  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string().required("هذا الحقل الزامي"),
    password: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    date_of_birth: Yup.string().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  return (
    <div className="addMemberContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={"تعديل بيانات عضو "}
          subTitle={"يمكنك تعديل بيانات العضو المطلوب من هنا"}
        />
      </div>
      <div className="">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true} // Ensure the form updates with fetched data
        >
          <Form className={`addForm mt-3 mb-5`}>
            {/* upload user image */}
            <div className="mt-5 d-flex flex-column align-items-center  mb-4 position-relative">
              <div className="position-relative">
                <img
                  src="/assets/image/user image.png"
                  alt="user img"
                  width={"84.55px"}
                  height={"84.55px"}
                />
              </div>
              <div className="position-absolute  upload-image">
                <img
                  src="/assets/image/Frame 119.png"
                  alt="upload img"
                  className="mb-1"
                  width={"25px"}
                  height={"25px"}
                />
              </div>
              <Link to={"/"} className="text-decoration-none mt-3">
                <p style={{ color: "#3572EF" }}>تعديل الصورة</p>
              </Link>
            </div>
            {/* end of upload user image */}

            {/* name & number */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"name"} label={"الأسم"} />
              </div>
              <div className={`col-4 col-lg-6 phone-number`}>
                <InputField name={"phone_number"} label={"رقم الهاتف"} />
              </div>
            </div>
            {/* end of name & number */}

            {/* nationalId & password */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"national_id"} label={"رقم العضوية"} />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"password"}
                  label={"كلمة السر"}
                  type="password"
                />
              </div>
            </div>
            {/* end of nationalId & password */}

            {/* notes & date & gender */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"notes"} label={"ملاحظات"} className="note" />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"date_of_birth"}
                  label={"تاريخ الميلاد"}
                  inputType={"input"}
                  type={"date"}
                />
                <InputField
                  name={"gender"}
                  label={"النوع"}
                  inputType={"select"}
                >
                  <option value="">{"أختر نوع"}</option>
                  <option value="انثي">{"انثي"}</option>
                  <option value="ذكر">{`ذكر`}</option>
                </InputField>
              </div>
            </div>
            {/* end of notes & date & gender */}

            {/* button to confirm add member */}
            <div className={`addmemberBtn m-auto`}>
              <MainButton text={"تعديل"} btnType={"submit"} />
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}
export default EditMember;
