import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import "./EditMember.css";
import InputField from "../../../Common Components/InputField/InputField";
import { Helmet } from "react-helmet";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function EditMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const member = location.state?.member;
  console.log(member);
  const [loading, setLoading] = useState(false);
  const api = process.env.REACT_APP_DOMAIN;
  const [initialValues, setInitialValues] = useState({
    name: "",
    national_id: "",
    date_of_birth: "",
    gender: "",
    profile_image: "",
    personal_card_image: "",
  });

  useEffect(() => {
    if (member) {
      setInitialValues({
        name: member.name,
        national_id: member.national_id,
        date_of_birth: member.date_of_birth,
        gender: member.gender === "F" ? "انثي" : "ذكر",
      });
    }
  }, [member]);

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    national_id: Yup.string().required("مطلوب"),
    date_of_birth: Yup.date().required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
    // profile_image: Yup.mixed().required("مطلوب"),
    // personal_card_image: Yup.mixed().required("مطلوب"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(selectedImage, selectedProfileImage);
    const profileResponse = await fetch(selectedProfileImage);
    const response = await fetch(selectedImage);
    const blob = await response.blob(); // Convert the response to a Blob
    const profileBlob = await profileResponse.blob(); // Convert the response to a Blob
    const file = new File([blob], "image1.jpg", { type: blob.type });
    const profileFile = new File([profileBlob], "image2.jpg", {
      type: profileBlob.type,
    });
    console.log(file.size);
    console.log(profileFile.size);

    // Step 2: Convert the Blob to a File
    const formattedValues = new FormData();
    formattedValues.append("name", values.name);
    formattedValues.append("national_id", values.national_id);
    formattedValues.append("date_of_birth", values.date_of_birth);
    formattedValues.append("gender", values.gender === "انثي" ? "F" : "M");
    selectedProfileImage?.length > 0 &&
      formattedValues.append("profile_image", profileFile);
    selectedImage?.length > 0 &&
      formattedValues.append("personal_card_image", file);

    console.log(formattedValues);
    try {
      const response = await fetch(`${api}/members/${member.id}`, {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("access"),
          accept: "application/json",
        },
        body: formattedValues,
      });
      const updatedMember = await response.json();
      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/Home/AllMembers", { state: { updatedMember } });
        }, 3000);
      } else {
        console.error("Failed to update member", updatedMember);
        setLoading(false);
        setShowModalError(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating member:", error);
    }
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };

  const [selectedImage, setSelectedImage] = useState(
    member.personal_card_image
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    member.profile_image
  );

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Save the selected file
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    document.getElementById("imageInput").click(); // Trigger the file input
  };

  const handleUploadProfileClick = () => {
    document.getElementById("profileImageInput").click(); // Trigger the file input
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedProfileImage(URL.createObjectURL(file)); // Save the selected file
    }
  };

  return (
    <div className="editMemberContainer">
      <Helmet>
        <title>تعديل بيانات العضو</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between pe-2">
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
        <Form className="editForm">
          <div className="row g-4 mb-5 mt-4">
            <div className="col-12 col-sm-6">
              <InputField name="name" label={"الأسم"} />
            </div>
            <div className="col-12 col-sm-6">
              <InputField
                label={"تاريخ الميلاد"}
                type="date"
                name="date_of_birth"
              />
            </div>
          </div>
          <div className="row g-4 mb-5">
            <div className="col-12 col-sm-6">
              <InputField label={"رقم العضوية"} name="national_id" />
            </div>
            <div className="col-12 col-sm-6">
              <InputField name={"gender"} label={"النوع"} inputType={"select"}>
                <option value="">{"أختر نوع"}</option>
                <option value="انثي">{"انثي"}</option>
                <option value="ذكر">{"ذكر"}</option>
              </InputField>
            </div>
          </div>
          <div className="row g-4 mb-5" style={{ minHeight: 120 }}>
            <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
              <label className="text-light mb-2 align-self-start">
                تحميل الصورة الشخصية
              </label>
              <img
                src={selectedProfileImage}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  width: "fit-content",
                }}
              />
              <div className="btns d-flex justify-content-center align-items-center gap-3">
                <div
                  className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                  onClick={handleUploadProfileClick}
                >
                  تعديل
                </div>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
                <div
                  className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                  onClick={() => setSelectedProfileImage("")}
                >
                  حذف
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
              <label className="text-light mb-2 align-self-start">
                تحميل صورة البطاقة الشخصية
              </label>
              <img
                src={selectedImage}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  width: "fit-content",
                }}
              />
              <div className="btns d-flex justify-content-center align-items-center gap-3">
                <div
                  className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                  onClick={handleUploadClick}
                >
                  تعديل
                </div>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <div
                  className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                  onClick={() => setSelectedImage("")}
                >
                  حذف
                </div>
              </div>
            </div>
          </div>
          <div className="editBtn text-center">
            <MainButton
              text={"حفظ التعديل"}
              btnType={"submit"}
              isLoading={loading}
            />
          </div>
        </Form>
      </Formik>

      <SuccessModal isOpen={showModal}>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          تم تعديل العضو بنجاح
        </p>
      </SuccessModal>
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        <p className="text-center mt-2  text-dark fw-bolder mb-5">
          حدث خطأ أثناء تعديل هذا العضو
        </p>
      </FailedModal>
    </div>
  );
}
export default EditMember;
