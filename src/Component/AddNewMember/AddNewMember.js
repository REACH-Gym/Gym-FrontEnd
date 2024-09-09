import React from "react";
import "./AddNewMember.css";
import SidebarBox from "../Sidebar/Sidebar";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function AddNewMember() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const intialValues = {
    name: "",
    phone: "",
    nationalId: "",
    password: "",
    notes: "",
    birthDate: "",
    gender: "",
  };
  return (
    <div>
      <Navbar />

      <div className="d-flex">
        <SidebarBox />
        <div className="addMemberContainer">
          {/*add member */}
          <section className="d-flex align-items-center">
            <div className="ms-3 mb-3 bg-light p-2 rounded">
              <img
                src="/assets/image/Vector.png"
                alt="home logo"
                width={"21.08px"}
                height={"13.42"}
              />
            </div>
            <div>
              <p className="mb-0">إضافة عضو </p>
              <p className="fw-lighter">يمكنك إضافة العضو المطلوب من هنا</p>
            </div>
          </section>
          {/*end of add member */}

          <Formik onSubmit={handleSubmit} initialValues={intialValues}>
            <Form className={`addForm mt-5 mb-5`}>
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
                  <InputField name={"phone"} label={"رقم الهاتف"} />
                </div>
              </div>
              {/* end of name & password */}

              {/* nationalId & number */}
              <div className={`row g-4 mb-5`}>
                <div className={`col-4 col-lg-6`}>
                  <InputField name={"nationalId"} label={"رقم العضوية"} />
                </div>
                <div className={`col-4 col-lg-6`}>
                  <InputField name={"password"} label={"كلمة السر"} />
                </div>
              </div>
              {/* end of nationalId & password */}

              {/* notes & date & gender */}
              <div className={`row g-4 mb-5`}>
                <div className={`col-4 col-lg-6`}>
                  <InputField
                    name={"notes"}
                    label={"ملاحظات"}
                    className="p-5"
                  />
                </div>
                <div className={`col-4 col-lg-6`}>
                  <InputField
                    name={"date"}
                    label={" تاريخ الميلاد"}
                    inputType={"input"}
                    type={"date"}
                  />
                  <InputField
                    name={"gender"}
                    label={" النوع"}
                    inputType={"select"}
                  >
                    <option>ذكر</option>
                    <option>انثي</option>
                  </InputField>
                </div>
              </div>
              {/* end of notes & date & gender */}

              {/* button to confirm add memeber */}
              <div className={`addmemberBtn m-auto`}>
                <MainButton text={"اضافة"} btnType={"submit"} />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddNewMember;
