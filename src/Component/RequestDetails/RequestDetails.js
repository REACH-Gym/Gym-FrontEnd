import InputField from "../../Common Components/InputField/InputField";
import styles from "./RequestDetails.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useEditMemberMutation,
  useGetAllMembersQuery,
} from "../../features/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";
import { Commet } from "react-loading-indicators";

const baseUrl = process.env.REACT_APP_DOMAIN;

const RequestDetails = () => {
  const { RequestId } = useParams();

  const { data: userData, isLoading: isUserDataLoading } =
    useGetAllMembersQuery(`/${RequestId}`);
  console.log(userData);

  const [editMember] = useEditMemberMutation();

  const initialValues = {
    name: userData?.data?.user.name,
    phone_number: userData?.data?.user.phone_number,
    national_id: userData?.data?.user.national_id,
    date_of_birth: userData?.data?.user.date_of_birth,
    gender: userData?.data?.user.gender,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10 أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleCancel = async () => {
    try {
      const response = await editMember({
        id: RequestId,
        data: { is_verified: false },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/RejectedRequests");
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(
    userData?.data?.user.personal_card_image
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    userData?.data?.user.profile_image
  );

  useEffect(() => {
    setSelectedProfileImage(userData?.data?.user.profile_image);
    setSelectedImage(userData?.data?.user.personal_card_image);
  }, [
    userData?.data?.user.personal_card_image,
    userData?.data?.user.profile_image,
  ]);

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
  const handleSubmit = async (values) => {
    const profileResponse = await fetch(selectedProfileImage);
    const response = await fetch(selectedImage);
    const blob = await response.blob(); // Convert the response to a Blob
    const profileBlob = await profileResponse.blob(); // Convert the response to a Blob
    const file = new File([blob], "image1.jpg", { type: blob.type });
    const profileFile = new File([profileBlob], "image2.jpg", {
      type: profileBlob.type,
    });
    // Step 2: Convert the Blob to a File
    const formattedValues = new FormData();
    formattedValues.append("name", values.name);
    formattedValues.append("phone_number", values.phone_number);
    formattedValues.append("national_id", values.national_id);
    formattedValues.append("date_of_birth", values.date_of_birth);
    formattedValues.append("gender", values.gender === "انثي" ? "F" : "M");
    formattedValues.append("is_verified", true);
    selectedProfileImage?.length > 0 &&
      formattedValues.append("profile_image", profileFile);
    selectedImage?.length > 0 &&
      formattedValues.append("personal_card_image", file);
    try {
      const response = await editMember({
        id: RequestId,
        data: formattedValues,
      }).unwrap();
      console.log(response);
      setSuccess(true);
      try {
        window.open(`${baseUrl}/privecy/pdf/${RequestId}`, "_blank");
      } catch (error) {
        console.log(error);
        setError("حدث خطأ في طباعة العقد!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/AcceptedRequests");
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      if (
        Object.keys(err.data.error).includes("national_id") &&
        Object.keys(err.data.error).includes("phone_number")
      ) {
        setError("رقم الهاتف ورقم العضوية مسجلين مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("phone_number")) {
        setError("رقم الهاتف مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("national_id")) {
        setError("رقم العضوية مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  if (isUserDataLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      {success && <Success text={"تم إضافة مستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/details.svg"}
          title={"تفاصيل طلب الإشتراك"}
          subTitle={"يمكنك متابعة تفاصيل طلبات الإشتراكات من هنا  "}
        />
        <div
          className="rounded-2"
          style={{ backgroundColor: "#373636", padding: "50px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="name" label="اسم العضو" />
                </div>
                <div
                  className={`col-12 col-md-6 phone-number position-relative`}
                >
                  <InputField
                    name={"phone_number"}
                    label={"رقم الهاتف"}
                    disabled
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="national_id" label="رقم العضوية" />
                </div>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name="date_of_birth"
                    label="تاريخ الميلاد"
                    inputType={"input"}
                    type={"date"}
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name={"gender"}
                    label={"الجنس"}
                    inputType={"select"}
                  >
                    <option value={""}>اختر</option>
                    <option value={"M"}>ذكر</option>
                    <option value={"F"}>انثي</option>
                  </InputField>
                </div>
              </div>
              <div className="row g-4 mt-1 mb-5" style={{ minHeight: 120 }}>
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
              <div className="row text-center mt-4 d-flex justify-content-center gap-5">
                <button type="submit" className={`${styles.acceptButton}`}>
                  <div className={`d-inline-block fw-bold`}>قبول الطلب</div>
                </button>
                <div
                  className={`${styles.cancelButton}`}
                  onClick={handleCancel}
                >
                  <div className={`d-inline-block fw-bold`}>رفض الطلب</div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
