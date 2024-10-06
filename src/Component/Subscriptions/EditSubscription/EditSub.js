import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import "./EditSub.css";
import InputField from "../../../Common Components/InputField/InputField";

function EditSub() {
  const location = useLocation();
  const navigate = useNavigate();
  const membership = location.state?.membership;

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    membership_duration: "",
    freeze_duration: "",
    description: "",
  });

  useEffect(() => {
    if (membership) {
      setInitialValues({
        name: membership.name || "",
        price: membership.price || "",
        membership_duration: membership.membership_duration || "",
        freeze_duration: membership.freeze_duration || "",
        description: membership.description || "",
      });
    }
  }, [membership]);

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    price: Yup.string().required("هذا الحقل الزامي"),
    membership_duration: Yup.string().required("هذا الحقل الزامي"),
    freeze_duration: Yup.string().required("هذا الحقل الزامي"),
    description: Yup.string().required("هذا الحقل الزامي"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `https://gym-backend-production-65cc.up.railway.app/memberships/${membership.id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access"),
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const updateSub = await response.json();
        navigate("/Home/AllSubscriptions", { state: { updateSub } });
      } else {
        console.error("Failed to update subscription");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="editMemberContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={" تعديل أشتراك "}
          subTitle={"يمكنك تعديل أشتراك من هنا"}
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
                <InputField name="name" label={"أسم الأشتراك"} />
              </div>
              <div className="col-4 col-lg-6">
                <InputField label={"السعر"} name="price" />
              </div>
            </div>
            <div className="row g-4 mb-5">
              <div className="col-4 col-lg-6">
                <InputField label={" المدة"} name="membership_duration" />
              </div>
              <div className="col-4 col-lg-6">
                <InputField label={"اقصى فترة تجميد"} name="freeze_duration" />
              </div>
            </div>
            <div className="col-6 col-lg-6 w-100">
                <InputField label={"ملاحظات"} name="description"/>
              </div>
            <div className="editBtn text-center mt-5">
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
export default EditSub;