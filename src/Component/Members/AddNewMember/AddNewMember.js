import React, { useRef, useState } from "react";
import "./AddNewMember.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Modal from "../../../Common Components/Modal/Modal";
function AddNewMember() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [national_idExist,setNational_idExist] = useState(false);
  const [phone_numberExist,setPhone_numberExist] = useState(false);
  const countryCode = "966";
  const setFieldValueRef = useRef(null);
  const valuesRef = useRef(null);
  const handlePhone = () => {
    setFieldValueRef.current(
      `phone_number`,
      `${countryCode}${valuesRef.current[`phone_number`]}`
    );
    console.log(valuesRef);
  };
  const handleSubmit = async (value) => {
    setLoading(true);
    console.log(value);
    try {
      const genderValue = value.gender === "انثي" ? "F" : "M";
      const items = {
        name: value["name"],
        phone_number: value["phone_number"],
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        gender: genderValue,
      };

      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
            accept: "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response result:", result);
      setLoading(false);
      if (response?.status === 400){
        for (let index = 0; index < Object.keys(result?.error).length; index++) {
           if(Object.keys(result?.error)[index] === "national_id" ){
            setNational_idExist(true);
            showModalError(false);
            showModal(false);
             console.log('national id already exist')
           }else if (Object.keys(result?.error)[index] === "phone_number"){
            setPhone_numberExist(true);
            showModalError(false);
            showModal(false);
            console.log('phone number already exist');
           }          
        }
      }
      if (response.ok) {
        console.log(response)
        setShowModal(true);
        setTimeout(() => {
          navigate("/Home/AllMembers");
        }, 3000);
      } else {
        console.log(response)
        setShowModalError(true);
        setLoading(false);

      }
    } catch (error) {
      console.error("Error during submission:", error);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().max(14).required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10أرقام")
      .required("هذا الحقل الزامي"),
    password: Yup.string()
      .min(8, "يحب أن تكون كلمة السر اكثر من 7 أرقام")
      .matches(/[A-Z]/, "يجب أن تحتوي على حروف كبيرة")
      .matches(/[a-z]/, "يجب أن تحتوي على حروف صغيرة")
      .matches(/\d/, "يجب أن تحتوي على أرقام")
      .matches(/[!@#$%^&*]/, "يجب أن تحتوي على رموز")
      .required("هذا الحقل الزامي"),
    notes: Yup.string(),
    date_of_birth: Yup.date().required("هذا الحقل الزامي").max("2-5-3000"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  const [show, setShow] = useState(false);
  const initialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalError = () => {
    setShowModalError(false);
  };
  const handleCloseNational_idModal = ()=>{
    setNational_idExist(false)
  }
  const handleClosePhone_numberModal = ()=>{
    setPhone_numberExist(false)
  }
  return (
    <div className="addMemberContainer">
      <div className="d-flex align-items-center justify-content-between pe-2">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={"اضافة عضو "}
          subTitle={"يمكنك اضافة العضو المطلوب من هنا"}
        />
      </div>
      <div className="">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, setFieldValue }) => {
            setFieldValueRef.current = setFieldValue;
            valuesRef.current = values;
            return (
              <Form className={`addForm pt-4`}>
                <div className={`row g-4 mt-2`}>
                  <div className={`col-4 col-lg-6`}>
                    <InputField name={"name"} label={"الأسم"} />
                  </div>
                  <div
                    className={`col-4 col-lg-6 phone-number position-relative`}
                  >
                    <InputField
                      name={"phone_number"}
                      label={"رقم الهاتف"}
                      onBlur={handlePhone}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 49,
                        left: 20,
                        zIndex: 1000,
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                      }}
                      dir="ltr"
                    >
                      <svg
                        width="25px"
                        height="25px"
                        className="me-2"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        class="iconify iconify--twemoji"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#006C35"
                          d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
                        ></path>
                        <g fill="#FFF">
                          <path d="M8.919 14.05c.632.06.283-1.069.512-1.274c.043-.101.123-.102.129.026v.958c-.006.312.199.403.358.468c.166-.013.276-.007.341.154l.078 1.658s.384.11.402-.933c.019-.612-.122-1.124-.039-1.243c.003-.117.152-.124.256-.067c.165.116.239.26.495.203c.391-.107.625-.297.631-.597c-.023-.285-.055-.57-.178-.855c.017-.052-.075-.186-.058-.238c.07.11.177.101.201 0c-.066-.219-.169-.429-.337-.52c-.138-.122-.34-.097-.414.157c-.034.292.106.64.318.923c.045.111.109.295.081.461c-.113.064-.227.038-.321-.062c0 0-.311-.233-.311-.285c.083-.528.019-.588-.027-.734c-.032-.202-.128-.267-.206-.405c-.078-.082-.183-.082-.233 0c-.138.238-.074.75.026.979c.071.21.181.343.129.343c-.043.119-.131.091-.195-.046c-.092-.284-.11-.707-.11-.898c-.028-.236-.058-.741-.213-.869c-.095-.129-.236-.067-.285.052c-.01.234-.012.469.015.686c.106.379.14.713.192 1.102c.014.521-.301.226-.287-.032c.073-.335.054-.863-.011-.997c-.051-.133-.112-.167-.236-.145c-.098-.008-.352.27-.424.73c0 0-.061.237-.087.448c-.035.238-.191.406-.301-.033c-.095-.319-.153-1.106-.312-.922c-.046.615-.101 1.697.421 1.807z"></path>

                          <path d="M9.87 14.499c-.52.01-1.281.683-1.302 1.056c.548-.264 1.087-.518 1.645-.79c-.09-.135-.005-.256-.343-.266z"></path>

                          <path d="M12.737 16.516c.241-.803-.039-1.395.092-1.392c.277.299.665.04.75-.064c.037-.052.128-.086.192-.018c.217.156.599.082.678-.192a6.03 6.03 0 0 0 .092-.833c-.177.055-.309.092-.321.165l-.037.238c-.015.077-.168.08-.174-.018c-.067-.305-.345-.345-.513.128c-.113.092-.317.11-.339-.027c.027-.317-.101-.36-.357-.211c-.082-.629-.165-1.23-.247-1.859c.107-.003.205.076.302-.046c-.107-.333-.333-1.013-.458-1.062c-.061-.074-.113-.028-.192-.009c-.134.043-.259.159-.22.384c.159.965.263 1.7.421 2.665c.024.113-.07.262-.192.247c-.207-.14-.259-.424-.613-.412c-.257.003-.55.281-.586.55c-.043.213-.058.445 0 .632c.18.216.397.195.586.146c.155-.064.284-.22.338-.183c.037.045.009.558-.732.952c-.449.201-.806.247-.998-.119c-.119-.229.009-1.099-.284-.897c-.867 2.235 2.03 2.545 2.354.092c.031-.101.153-.202.174-.037c-.067 2.222-2.241 2.375-2.61 1.676c-.092-.165-.119-.531-.128-.751c-.055-.437-.284-.269-.32.164c-.037.241-.027.309-.027.54c.115 1.755 2.915 1.001 3.369-.449zm-1.08-1.518c-.018.034-.097.02-.155.02c-.066-.003-.097-.014-.137-.067c-.018-.06.038-.117.063-.162c.031-.053.198-.108.257.04a.168.168 0 0 1-.028.169z"></path>

                          <path d="M13.602 13.009c.174-.064.999-1.007.999-1.007c-.043-.037-.081-.064-.124-.101c-.046-.04-.041-.08 0-.119c.204-.119.139-.38.032-.499a.495.495 0 0 0-.444.004c-.143.137-.177.357-.064.495c.11.052.22.163.147.224c-.337.36-1.261.981-1.154 1.003c.023.03.59.029.608 0zm.611-1.481c.053-.013.121.034.153.104c.032.07.015.137-.037.15h-.002c-.052.013-.12-.034-.152-.104c-.031-.071-.014-.137.038-.15zm-5.351 5.73c-.136.277-.193.087-.205-.068a3.553 3.553 0 0 1 .039-.779c.034-.22 0-.153-.07-.064c-.309.492-.336 1.228-.165 1.447c.09.104.239.15.35.116c.194-.084.279-.478.233-.621c-.066-.101-.117-.117-.182-.031zm10.181-5.208c.356.478.694.965 1.025 1.461c.065.43.112.85.14 1.267c.055.804.071 1.674.021 2.521c.15.006.393-.244.477-.609c.055-.505-.02-1.404-.025-1.702a22.071 22.071 0 0 0-.027-.56c.394.644.778 1.318 1.153 2.067c.137-.064.107-.83.027-.938c-.3-.643-.713-1.279-.845-1.523c-.049-.09-.216-.346-.415-.639a7.506 7.506 0 0 0-.084-.698c-.062-.428.177.047.144-.202c-.077-.428-.315-.717-.593-1.109c-.09-.127-.087-.153-.226.031a.772.772 0 0 0-.066.351a2.458 2.458 0 0 0-.139-.185a51.319 51.319 0 0 0-.455-.388c-.101-.072-.347-.202-.391.014a1.25 1.25 0 0 0 .022.454c.026.107.181.285.257.387zm.74-.024c.019.083.039.166.052.251l.015.081a3.628 3.628 0 0 0-.131-.172c-.164-.194-.028-.152.064-.16z"></path>

                          <path d="M21.919 16.693c-.348.363-.85.81-1.396 1.017c-.059.066.146.349.41.349c.443-.052.833-.301 1.194-.956c.097-.152.267-.479.271-.733c.033-1.486-.074-2.643-.297-3.717a.6.6 0 0 1 .012-.259c.028-.034.126 0 .178-.084c.075-.078-.201-.718-.359-.964c-.056-.11-.075-.184-.168.013c-.098.16-.163.439-.155.699c.211 1.463.276 2.744.414 4.207c.011.141-.01.347-.104.428zm5.83-3.71c-.015-.104-.061-.346-.043-.377c.028-.074.173.008.225-.077c.076-.077-.374-.655-.531-.901c-.057-.11-.076-.184-.169.013c-.098.16-.132.447-.093.699c.235 1.589.41 2.783.446 4.192c-.021.134-.025.206-.088.374c-.139.178-.292.4-.437.508c-.144.107-.451.21-.552.289c-.317.185-.318.396-.06.403c.442-.052.966-.088 1.327-.634c.097-.152.212-.565.217-.819c.033-1.486-.019-2.596-.242-3.67zm-3.351 1.237c.004-.204.023-.474.034-.643c.005-.063.02-.134.08-.15c.061-.016.169.062.17-.004c-.012-.129-.038-.321-.111-.412c-.1-.148-.365-.112-.412.12c.001.086.04.132.033.21c-.012.044-.058.074-.167.022c.018-.016-.071-.139-.071-.139c-.085-.052-.199.003-.272.05a.415.415 0 0 0-.024.33c.12.227.539.612.74.616z"></path>

                          <path d="M24.257 12.481c.293.359.592.723.893 1.093c.065.826.082 1.502.146 2.328c-.009.35-.117.655-.22.699c0 0-.155.09-.259-.009c-.076-.031-.379-.505-.379-.505c-.155-.142-.257-.102-.367 0c-.304.293-.441.843-.647 1.221c-.054.085-.204.157-.371-.006c-.423-.579-.175-1.402-.227-1.19c-.377.425-.211 1.128-.126 1.28c.124.248.225.408.467.531c.22.162.392.06.486-.053c.222-.231.225-.816.329-.934c.072-.213.257-.177.346-.082a.876.876 0 0 0 .315.273c.207.183.454.216.697.049c.166-.093.275-.214.372-.453c.108-.288.049-1.612.027-2.406c.155.2.306.409.459.618c.067.663.105 1.323.083 1.997c-.016.135.47-.4.466-.654c-.002-.205 0-.391 0-.566c.234.352.462.715.676 1.099c.134-.07.09-.825.005-.929c-.247-.414-.576-.845-.803-1.153c-.015-.039-.023-.083-.041-.12c-.091-.211-.034-.381-.077-.605c-.042-.225-.031-.561-.096-.828c-.018-.104-.072-.438-.056-.469c.026-.075.126.002.175-.084c.073-.08-.253-.925-.419-1.167c-.06-.108-.168-.071-.302.105c-.123.116-.077.38-.03.631c.117.608.215 1.191.299 1.768a57.866 57.866 0 0 0-.545-.713l-.008-.044c0-.011-.027-.524-.051-.646c-.004-.049-.016-.064.036-.058c.055.046.062.049.097.065c.056.01.105-.085.072-.172l-.517-.952c-.041-.041-.095-.085-.16.011a.374.374 0 0 0-.128.283c.016.225.055.455.07.681l.022.122c-.023-.027-.051-.061-.063-.073c-.439-.462.202-.075-.084-.432c-.242-.266-.312-.349-.52-.509c-.104-.067-.167-.195-.201.023a4.553 4.553 0 0 0-.015.575c0 .092.093.26.174.36zm-8.901 1.079c.252.104.413-.376.517-.902c.07-.148.124-.164.16-.088c-.009.7.05.855.23 1.068c.401.31.733.039.76.013l.312-.312c.069-.073.162-.078.26-.013c.096.086.083.236.287.34c.172.069.54.016.625-.132c.115-.196.143-.264.195-.338c.082-.109.222-.06.222-.026c-.013.061-.095.122-.039.231c.098.073.12.026.178.01c.204-.098.356-.54.356-.54c.009-.165-.083-.151-.143-.117c-.078.047-.083.063-.161.111c-.1.015-.293.081-.388-.067c-.098-.178-.1-.426-.174-.605c0-.013-.13-.283-.009-.3c.061.011.19.045.211-.063c.063-.106-.137-.408-.273-.561c-.119-.13-.284-.146-.443-.013c-.112.103-.096.217-.118.326a.508.508 0 0 0 .105.443c.111.219.314.502.247.898c0 0-.118.188-.325.164c-.086-.019-.226-.056-.3-.606c-.056-.417.014-1-.163-1.273c-.064-.165-.11-.324-.266-.042c-.042.111-.222.279-.091.626c.107.219.15.576.102.974c-.074.113-.09.151-.187.264c-.136.146-.283.109-.396.054c-.106-.071-.188-.108-.236-.334c.009-.36.029-.95-.037-1.075c-.097-.194-.257-.124-.326-.065c-.329.301-.491.808-.59 1.211c-.091.294-.188.21-.256.091c-.166-.156-.177-1.373-.378-1.172c-.323.914.182 1.918.532 1.82z"></path>

                          <path d="M20.137 15.524l-.096-.055l-1.881-.009c-.097-.037-.068-.069 0-.095c.449-.061 1.248-.191 1.301-.958c-.009-.399-.172-.661-.662-.733c-.359.028-.616.377-.575.76c-.017.104.034.306-.071.329c-.691.063-1.444.495-1.469.805c-.042.029-.136-.055-.124-.187a3.694 3.694 0 0 0-.475-1.606c-.218-.218-.15-.146-.296-.043c-.094.108-.111.182-.106.397c0 .008.176.499.325.843c.099.353.192.756.125 1.137c-.232.504-.699.956-1.149 1.201c-.232.075-.431.048-.48-.004c-.143-.096-.136-.273-.125-.276c.379-.265.813-.478 1.153-1.191c.1-.272.13-.437.031-.858a.814.814 0 0 0-.197-.398c.061-.04.236.093.263.014a1.253 1.253 0 0 0-.331-.61c-.135-.123-.282-.137-.406-.024c-.14.078-.17.356-.103.6c.074.184.275.215.419.584c0 .008.052.276-.022.381c-.059.184-.824.785-.866.812c-.021.026-.012-.013-.015-.113c-.005-.122.049-.41.034-.412c-.249.161-.332.654-.377.8c-.63.435-1.343.759-1.755 1.201c-.215.335 1.478-.385 1.675-.472c.044.032.039.183.157.318c.176.238.548.385.913.294c.61-.221.963-.637 1.321-1.098c.051-.075.131-.132.205-.075c.246.551.957.941 1.874.982c.213-.259.11-.384.024-.438c0-.008-.453-.18-.522-.352c-.042-.156.06-.293.264-.397c.589-.071 1.168-.15 1.729-.33c.006-.188.115-.47.19-.592c.072-.124.111-.087.1-.132zm-1.547-1.172c.028-.047.121-.045.208.006c.087.05.136.13.107.177c-.028.048-.122.045-.209-.006c-.087-.05-.134-.129-.106-.177zm-.757 1.9c-.202.069-.396.123-.396.415c.075.406-.103.267-.208.211c-.124-.089-.473-.304-.523-.768c-.008-.111.079-.204.218-.204c.209.057.518.061.786.089c.219.014.328.186.123.257zm-6.967-4.505c.216.104.624.06.606-.29c0-.031-.008-.135-.011-.163c-.044-.103-.164-.078-.192.029c-.009.035.015.091-.016.109c-.018.018-.087.007-.084-.089c0-.031-.023-.064-.036-.083c-.014-.009-.022-.012-.047-.012c-.03.001-.03.009-.046.035c-.007.025-.017.051-.017.08c-.004.034-.017.046-.042.052c-.028 0-.022.003-.044-.012c-.014-.015-.031-.021-.031-.046a.276.276 0 0 0-.014-.086c-.012-.016-.031-.023-.053-.029c-.118 0-.126.135-.119.187c-.011.009-.015.251.146.318z"></path>

                          <path d="M17.512 14.027c0-.031-.023-.063-.036-.083c-.014-.009-.022-.012-.047-.012c-.03.001-.029.009-.046.035c-.007.026-.017.051-.017.08c-.003.035-.017.047-.042.052c-.028 0-.022.003-.045-.011c-.014-.015-.031-.021-.031-.046a.271.271 0 0 0-.014-.086c-.012-.016-.031-.023-.053-.028c-.118 0-.126.135-.12.186c-.009.01-.014.251.147.319c.217.103.732.043.606-.29a2.88 2.88 0 0 0-.011-.164c-.044-.103-.165-.077-.192.029c-.008.035.016.091-.016.109c-.016.018-.086.007-.083-.09zm3.397-.707c.216.104.623.06.605-.289a2.88 2.88 0 0 0-.011-.164c-.044-.103-.164-.077-.191.029c-.009.035.015.091-.017.109c-.018.018-.087.008-.084-.089c0-.031-.023-.064-.036-.083c-.014-.009-.022-.012-.048-.012c-.03.002-.029.009-.046.035c-.007.026-.017.051-.017.08c-.004.035-.017.047-.042.052c-.028 0-.022.003-.045-.011c-.014-.015-.03-.021-.03-.046a.283.283 0 0 0-.014-.087c-.013-.016-.031-.023-.054-.028c-.118 0-.126.135-.119.186c-.007.01-.012.251.149.318zm.146-1.352c.077.216-.059.422.022.452c.073.034.177-.223.215-.46c.045-.192-.092-.585-.286-.666c-.118-.028-.286.042-.232.2c-.027.076.238.334.281.474zm1.995 5.064c.151.001.325-.345.399-.688c.041-.472-.028-.759-.04-1.037c-.013-.277-.313-2.392-.375-2.602c-.073-.397.293-.053.253-.284c-.127-.291-.442-.714-.542-.967c-.06-.108-.034-.204-.168-.028c-.123.405-.166.735-.119.987c.318 1.66.644 3.04.592 4.619zm3.756-4.34c.035.108-.053.457.02.489c.067.036.161-.241.196-.498c.019-.141-.084-.633-.261-.721c-.108-.03-.261.045-.211.217c-.025.083.217.361.256.513zm-13.119 3.656c.065.027.154-.177.188-.366c.019-.104-.081-.465-.25-.53c-.104-.022-.246.006-.202.16c-.005.083.23.183.244.376c.034.08-.05.337.02.36zm-4.556-4.615c.033.083-.033.348.036.373c.063.028.152-.184.185-.379c.019-.108.004-.474-.246-.549c-.103-.023-.246.034-.199.165c-.024.062.187.274.224.39zm4.902 1.173c-.191.104-.266.412-.146.591c.111.159.287.1.311.1c.188.023.299-.352.299-.352s.006-.105-.217.094c-.094.018-.106-.017-.129-.071a.456.456 0 0 1 .029-.292c.032-.093-.04-.134-.147-.07zm1.442-1.153a.257.257 0 0 0 .118-.174c.029-.146-.155.069-.178-.094c-.041-.151.077-.213.189-.359c.004-.101.002-.172-.135-.09c-.096.065-.288.263-.294.491c-.006.129-.03.128.055.21c.061.089.122.08.245.016zm1.299.078c.124-.336.124-.478.133-.621c-.038-.217-.185-.21-.282.031c-.042.091-.091.57-.083.57c-.033.143.149.204.232.02zm8.17 2.383s-1.003.713-1.027.738c-.1.088-.05.4 0 .364c.071.028 1.08-.657 1.06-.737c.047.002.07-.401-.033-.365zm-.123 1.934c.067.036.244-.183.237-.456c.02-.141-.051-.658-.227-.746c-.108-.03-.252.062-.202.233c-.025.082.124.369.163.521c.035.109-.044.416.029.448zm-5.68 1.496c0 .009.085.082.185.024c.21-.081.342-.159.636-.224c.077-.001.072-.208-.05-.215c-.159.008-.307.016-.466.142c-.098.022-.114-.037-.136-.091c-.024-.133.055-.225.038-.324c.006.006-.091-.083-.19-.033c-.005 0-.221.146-.29.248c-.043.033-.038.061-.025.116c.033.076.092.053.158.017c.088-.012.13.046.123.151c-.042.133.017.182.017.189zm6.551.166c-.033.057-.055.143.047.17c.188.053.621-.229.621-.234c.07-.053.047-.152.041-.152c-.041-.047-.133-.02-.195-.027c-.029 0-.127-.015-.08-.101a.598.598 0 0 0 .078-.151c.029-.065.004-.108-.102-.143c-.107-.02-.15-.01-.269 0c-.064.014-.086.042-.098.12c.005.118.076.112.15.159c.043.055.071.105-.003.194c-.07.065-.119.101-.19.165zM25.5 23H24v-.5a.5.5 0 0 0-1 0v.5H11s0 1 3 1h9v.5a.5.5 0 0 0 1 0V24h1v.5a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5z"></path>
                        </g>
                      </svg>
                      +966
                    </span>
                  </div>
                </div>
                <div className={`row g-4 mb-5`}>
                  <div className={`col-4 col-lg-6`}>
                    <InputField name={"national_id"} label={"رقم العضوية"} />
                  </div>
                  <div className={`col-4 col-lg-6 position-relative`}>
                    <label
                      className="mb-2 mt-2 text-secondary"
                      htmlFor={"password"}
                    >
                      كلمة السر
                    </label>
                    <Field
                      as="input"
                      type={show ? "text" : "password"}
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                      id={"password"}
                      name={"password"}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 51,
                        left: 25,
                        cursor: "pointer",
                      }}
                      onClick={() => setShow(!show)}
                    >
                      {!show ? (
                        <img
                          src="/assets/image/close eye.png"
                          alt="hide password"
                          width={"20px"}
                          height={"20px"}
                        />
                      ) : (
                        <img
                          src="/assets/image/open eye.png"
                          alt="show password"
                          width={"20px"}
                          height={"20px"}
                        />
                      )}
                    </span>
                    <ErrorMessage
                      name={"password"}
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div className={`row g-4 mb-5`}>
                  <div className={`col-4 col-lg-6`}>
                    <InputField
                      name={"notes"}
                      label={"ملاحظات"}
                      className="note"
                    />
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
                <div className={`addmemberBtn m-auto`}>
                  <MainButton
                    text={"اضافة"}
                    btnType={"submit"}
                    isLoading={loading}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* suucess ading member */}
      <Modal isOpen={showModal}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt="add memeber"
              width={"90px"}
              height={"90px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            لقد تم إضافة العضو بنجاح
          </p>
        </div>
      </Modal>
      {/* failed adding member */}
      <Modal isOpen={showModalError}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleCloseModalError}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt="delete member"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            فشلت محاولة إضافة العضو
          </p>
        </div>
      </Modal>
      {/* nationa id exist */}
      <Modal isOpen={national_idExist}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleCloseNational_idModal}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt="delete member"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! رقم العضوية موجود من قبل 
          </p>
        </div>
      </Modal>
      {/* phone number exist */}
       <Modal isOpen={phone_numberExist}>
        <div>
          <div className="d-flex justify-content-end">
            <button
              className="border-0 pt-4 ps-4 failed fw-bolder"
              onClick={handleClosePhone_numberModal}
            >
              X
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt="delete member"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! رقم الجوال موجود من قبل 
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default AddNewMember;