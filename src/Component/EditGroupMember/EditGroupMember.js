// import styles from "./EditGroupMember.module.css";
// import InputField from "../../Common Components/InputField/InputField";
// import { Formik, Form, useFormikContext } from "formik";
// import * as Yup from "yup";
// import MainButton from "../../Common Components/Main Button/MainButton";
// import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
// import {
//   useGetAllMembersQuery,
//   useLazyGetSchedulesQuery,
//   useGetSessionsQuery,
//   usePostSessionMemberMutation,
// } from "../../features/api";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DynamicComponent = () => {
//   const { values } = useFormikContext();
//   const {
//     data: members,
//     isLoading: isMembersLoading,
//     error: membersError,
//   } = useGetAllMembersQuery();

//   const {
//     data: sessions,
//     isLoading: isSessionsLoading,
//     error: sessionsError,
//   } = useGetSessionsQuery("");
//   console.log(sessions?.data);
//   const [getSchedules, { data: schedulesData }] = useLazyGetSchedulesQuery();

//   console.log(schedulesData?.data?.schedules);

//   const [sessionSchedules, setSesstionSchedules] = useState([]);

//   useEffect(() => {
//     if (values.group !== "") {
//       (async () => {
//         try {
//           const response = await getSchedules(
//             `?filter{session.id}=${values.group}`
//           );
//           console.log(response.data.data.schedules);
//           setSesstionSchedules([]);
//           for (let i = 0; i < response?.data.data?.schedules.length; i++) {
//             const newArray = [];
//             for (const key in response.data.data.schedules[i]) {
//               if (
//                 key === "saturday" ||
//                 key === "sunday" ||
//                 key === "monday" ||
//                 key === "tuesday" ||
//                 key === "wednesday" ||
//                 key === "thursday" ||
//                 key === "friday"
//               ) {
//                 console.log(key);
//                 console.log(response.data.data.schedules[i][key]);
//                 if (response.data.data.schedules[i][key]) {
//                   newArray.push(
//                     ` [${key}: ${response.data.data.schedules[i][key]}] `
//                   );
//                 }
//               }
//             }
//             setSesstionSchedules((prev) => [...prev, newArray]);
//           }
//         } catch (error) {
//           console.error(error.message);
//         }
//       })();
//     }
//   }, [values.group, getSchedules]);

//   if (isSessionsLoading || isMembersLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center text-primary fs-3 fw-bold">
//         جاري التحميل...
//       </div>
//     );
//   }

//   if (membersError || sessionsError) {
//     return (
//       <div className="d-flex justify-content-center align-items-center error-message fs-3 fw-bold">
//         حدث خطأ برجاء المحاولة مرة أخرى.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={`row`}>
//         <div className={`col-6`}>
//           <InputField name="name" label="اسم العضو" inputType={"select"}>
//             <option value={""}>اختر</option>
//             {members?.data?.users?.map((member, i) => (
//               <option value={member.id} key={i}>
//                 {member.name}
//               </option>
//             ))}
//           </InputField>
//         </div>
//         <div className={`col-6`}>
//           <InputField name="group" label="اسم المجموعة" inputType={"select"}>
//             <option value={""}>اختر</option>
//             {sessions?.data?.sessions?.map((session, i) => (
//               <option value={session.id} key={i}>
//                 {session.name}
//               </option>
//             ))}
//           </InputField>
//         </div>
//       </div>
//       <div className={`row`}>
//         <div className={`col-6`}>
//           <InputField name="schedule" label="الموعد" inputType={"select"}>
//             <option value={""}>اختر</option>
//             {sessionSchedules?.map((schedule, i) => (
//               <option value={schedulesData?.data?.schedules[i]?.id} key={i}>
//                 {schedule}
//               </option>
//             ))}
//           </InputField>
//         </div>
//         <div className={`col-6`}>
//           <InputField name="price" label="السعر" />
//         </div>
//       </div>
//       <div className={`row`}>
//         <div className={`col-6`}>
//           <InputField name="discount" label="الخصم" />
//         </div>
//         <div className={`col-6`}>
//           <InputField name="payed" label="المدفوع" />
//         </div>
//       </div>
//       <div className={`row`}>
//         <div className={`col-6`}>
//           <InputField
//             name="start_date"
//             label="تاريخ البداية"
//             inputType={"input"}
//             type={"date"}
//           />
//         </div>
//         <div className={`col-6`}>
//           <InputField
//             name="end_date"
//             label="تاريخ النهاية"
//             inputType={"input"}
//             type={"date"}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// const EditGroupMember = () => {
//   const initialValues = {
//     name: 0,
//     group: 0,
//     schedule: 0,
//     price: 0,
//     discount: 0,
//     payed: 0,
//     start_date: "",
//     end_date: "",
//   };
//   const validationSchema = Yup.object({
//     name: Yup.string().required("هذا الحقل الزامي"),
//     group: Yup.string().required("هذا الحقل الزامي"),
//     schedule: Yup.string().required("هذا الحقل الزامي"),
//     price: Yup.number().required("هذا الحقل الزامي"),
//     discount: Yup.number().required("هذا الحقل الزامي"),
//     payed: Yup.number().required("هذا الحقل الزامي"),
//     start_date: Yup.date().required("هذا الحقل الزامي"),
//     end_date: Yup.date().required("هذا الحقل الزامي"),
//   });

//   const [postSessionMember] = usePostSessionMemberMutation();
//   const navigate = useNavigate();
//   const handleSubmit = async (values) => {
//     console.log(values);
//     const data = {
//       schedule: values.schedule,
//       user: values.name,
//       status: "active",
//       discount: values.discount,
//       start_date: values.start_date,
//     };
//     try {
//       const response = await postSessionMember(data);
//       console.log(response);
//       navigate("/Home/GroupsContainer");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className={`${styles.addGroupMemberForm}`}>
//       <ComponentTitle
//         MainIcon={"/assets/image/groups.png"}
//         title={"إضافة عضو للمجموعة"}
//         subTitle={"يمكنك إضافة عضو لمجموعة من هنا"}
//       />
//       <div className="container bg-white p-4 rounded-4">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values }) => {
//             return (
//               <Form className={`d-grid gap-3`}>
//                 <DynamicComponent />
//                 <div className="row text-center mt-4">
//                   <MainButton
//                     text={"اضافة"}
//                     btnWidth={"200px"}
//                     btnType={"submit"}
//                   />
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default EditGroupMember;

const EditGroupMember = () => {
  return (
    <div className="d-flex justify-content-center align-items-center fs-1 text-primary fw-bold">
      Edit Group Member
    </div>
  );
};

export default EditGroupMember;
