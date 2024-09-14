import React from "react";
import "./AddNewMember.css";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
function AddNewMember() {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      const items = {
        name: value["name"],
        phone_number: value["phone_number"],
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        gender: value["gender"],
      };

      const data = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1OTY5Njg3LCJpYXQiOjE3MjU4ODMyODcsImp0aSI6ImI4NTJlZDYzOTE5ODQzZTBhOTljN2Y1ZmQ1ZmFmOTljIiwidXNlcl9pZCI6Mn0.NLoaALjfMocgMch9ijsZHD3v-qddniL-gettF-if9Jg",
            accept: "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const result = await data.json();
      console.log("Response status:", data.status);
      console.log("Response result:", result);
      localStorage.setItem("loginResult", JSON.stringify(result));

      if (data.ok) {
        toast.success("Member Added Successfully");
        setTimeout(() => {
          navigate("/AllMembers");
        }, 1500);
        console.log(items);
      } else {
        toast.error("failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string().required("هذا الحقل الزامي"),
    password: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });

  const intialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
  };
  return (
    <div>
      <Navbar />

      <div className="d-flex">
        <SidebarBox />
        <div className="addMemberContainer">
          {/*add member */}
          <section className="d-flex align-items-center pe-5">
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

          <Formik
            onSubmit={handleSubmit}
            initialValues={intialValues}
            validationSchema={validationSchema}
          >
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
                    name={"date_of_birth"}
                    label={" تاريخ الميلاد"}
                    inputType={"input"}
                    type={"date"}
                  />
                  <InputField
                    name={"gender"}
                    label={" النوع"}

                    // inputType={"select"}
                  >
                    {/* <option>ذكر</option>
                    <option>انثي</option> */}
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
      <ToastContainer />
    </div>
  );
}
export default AddNewMember;
