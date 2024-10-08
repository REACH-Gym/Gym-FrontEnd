import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import "./EditMember.css";
import InputField from "../../../Common Components/InputField/InputField";

function EditMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const member = location.state?.member;

  const [initialValues, setInitialValues] = useState({
    name: "",
    phone_number: "",
    national_id: "",
    date_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    if (member) {
      setInitialValues({
        name: member.name,
        phone_number: member.phone_number,
        national_id: member.national_id,
        date_of_birth: member.date_of_birth,
        gender: member.gender === "أنثى" ? "انثى" : "ذكر",
      });
    }
  }, [member]);

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    phone_number: Yup.string().required("مطلوب"),
    national_id: Yup.string().required("مطلوب"),
    date_of_birth: Yup.date().required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/members/${member.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("access"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // The values will now include gender
        }
      );

      if (response.ok) {
        const updatedMember = await response.json();
        navigate("/Home/AllMembers", { state: { updatedMember } });
      } else {
        console.error("Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <div className="editMemberContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={" تعديل عضو "}
          subTitle={"يمكنك تعديل عضو  من هنا"}
        />
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="editForm">
            <div className="row g-4 mb-5 mt-5">
              <div className="col-4 col-lg-6">
                <InputField name="name" label={"الأسم"} />
              </div>
              <div className="col-4 col-lg-6">
                <InputField label={"رقم الهاتف"} name="phone_number" />
              </div>
            </div>
            <div className="row g-4 mb-5">
              <div className="col-4 col-lg-6">
                <InputField label={"رقم العضوية"} name="national_id" />
              </div>
              <div className="col-4 col-lg-6">
                <InputField
                  label={"تاريخ الميلاد"}
                  type="date"
                  name="date_of_birth"
                />
              </div>
              <div className="col-4 col-lg-6">
                <InputField
                  name={"gender"}
                  label={"النوع"}
                  inputType={"select"}
                >
                  <option value="">{"أختر نوع"}</option>
                  <option value="انثى">{"انثى"}</option>
                  <option value="ذكر">{"ذكر"}</option>
                </InputField>
              </div>
            </div>
            <div className="editBtn text-center">
              <MainButton
                text={"حفظ التعديل"}
                btnType={"submit"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditMember;
