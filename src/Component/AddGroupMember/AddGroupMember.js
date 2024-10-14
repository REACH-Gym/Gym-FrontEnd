import InputField from "../../Common Components/InputField/InputField";
import styles from "./AddGroupMember.module.css";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useGetAllMembersQuery,
  useLazyGetSchedulesQuery,
  usePostSessionMemberMutation,
  useGetSessionsWithSchedulesQuery,
} from "../../features/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";

const DynamicComponent = () => {
  const { values } = useFormikContext();
  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError,
  } = useGetAllMembersQuery("/?filter{is_active}=true");
  console.log(members);

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
  } = useGetSessionsWithSchedulesQuery("?filter{is_active}=true");
  const [getSchedules, { data: schedulesData }] = useLazyGetSchedulesQuery();
  console.log(sessions);
  const [sessionsWithSchedules, setSessionsWithSchedules] = useState([]);

  useEffect(() => {
    if (sessions) {
      setSessionsWithSchedules([]);
      for (let i = 0; i < sessions?.data?.sessions?.length; i++) {
        if (sessions?.data?.sessions[i].schedules?.length > 0) {
          setSessionsWithSchedules((prev) => [
            ...prev,
            sessions?.data?.sessions[i],
          ]);
        }
      }
    }
  }, [sessions]);

  const [sessionSchedules, setSesstionSchedules] = useState([]);
  const [sessionPrice, setSessionPrice] = useState(0);

  useEffect(() => {
    if (values.group !== "") {
      setSessionPrice(
        sessionsWithSchedules?.find((session) => +session.id === +values.group)
          ?.price
      );
      (async () => {
        try {
          const response = await getSchedules(
            `?filter{session.id}=${values.group}&filter{is_active}=true`
          );
          setSesstionSchedules([]);
          for (let i = 0; i < response?.data.data?.schedules.length; i++) {
            const newArray = [];
            for (const key in response.data.data.schedules[i]) {
              if (
                key === "saturday" ||
                key === "sunday" ||
                key === "monday" ||
                key === "tuesday" ||
                key === "wednesday" ||
                key === "thursday" ||
                key === "friday"
              ) {
                if (response.data.data.schedules[i][key]) {
                  newArray.push(
                    ` [${key}: ${response.data.data.schedules[i][key]}] `
                  );
                }
              }
            }
            setSesstionSchedules((prev) => [...prev, newArray]);
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, [values.group, getSchedules, sessionsWithSchedules]);

  if (isSessionsLoading || isMembersLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (membersError || sessionsError) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold">
        حدث خطأ برجاء المحاولة مرة أخرى.
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className={`col-6`}>
          <div
            className={`${styles.section} col-12 rounded-2 pb-5 pt-3 pe-5 ps-5`}
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
          >
            <div className={`col-12`}>
              <InputField name="name" label="اسم العضو" inputType={"select"}>
                <option value={""}>اختر</option>
                {members?.data?.users?.map((member, i) => (
                  <option value={member.id} key={i}>
                    {member.name}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField
                name="group"
                label="اسم المجموعة"
                inputType={"select"}
              >
                <option value={""}>اختر</option>
                {sessionsWithSchedules?.map((session, i) => (
                  <option value={session.id} key={i}>
                    {session.name}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField name="schedule" label="الموعد" inputType={"select"}>
                <option value={""}>اختر</option>
                {sessionSchedules?.map((schedule, i) => (
                  <option value={schedulesData?.data?.schedules[i]?.id} key={i}>
                    {schedule}
                  </option>
                ))}
              </InputField>
            </div>
            <div className={`col-12`}>
              <InputField
                name="start_date"
                label="تاريخ البداية"
                inputType={"input"}
                type={"date"}
              />
            </div>
          </div>
        </div>
        <div className={`col-6`}>
          <div
            className={`${styles.section} col-12 rounded-2 pb-5 pt-3 pe-5 ps-5`}
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
          >
            <div className={`col-12`}>
              <InputField name="discount" label="الخصم (%)" />
            </div>
            <div className={`col-12`}>
              <InputField name="promo_code" label="برومو كود" />
            </div>
            <div className={`col-12`}>
              <InputField name="payment_method" label="طريقة الدفع" />
            </div>
            <div className={`col-12 mt-4 ps-2 pe-2`}>
              <div className="row gap-3 text-secondary">
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الخصم</span>
                  <span>{sessionPrice} ريال</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الخصم</span>
                  <span>{values.discount}%</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الإجمالي قبل الضريبة</span>
                  <span>{sessionPrice} ريال</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الضريبة</span>
                  <span>15%</span>
                </div>
                <div className="col-12 d-flex justify-content-between align-content-center">
                  <span>الاجمالي</span>
                  <span>
                    {(sessionPrice * (1 - values.discount / 100)).toFixed(2) > 0
                      ? (sessionPrice * (1 - values.discount / 100)).toFixed(2)
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddGroupMember = () => {
  const initialValues = {
    name: 0,
    group: 0,
    schedule: 0,
    discount: 0,
    start_date: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    group: Yup.string().required("هذا الحقل الزامي"),
    schedule: Yup.string().required("هذا الحقل الزامي"),
    discount: Yup.number()
      .max(100, `يجب أن يكون الخصم أقل من 100`)
      .min(1, `يجب أن يكون الخصم أكبر من 0`),
    start_date: Yup.date().required("هذا الحقل الزامي"),
  });

  const [
    postSessionMember,
    { isError: isSchedulesError, isLoading: isSchedulesLoading },
  ] = usePostSessionMemberMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      schedule: values.schedule,
      user: values.name,
      status: "active",
      discount: values.discount,
      start_date: values.start_date,
      end_date: values.end_date,
    };
    try {
      const response = await postSessionMember(data).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/GroupsContainer");
        window.location.reload();
      }, 300);
    } catch (err) {
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
      }
    }
  };

  return (
    <>
      {success && <Success text={"تم إضافة عضو إلى المجموعة بنجاح! "} />}
      {isSchedulesError && <Error text={error} show={isSchedulesError} />}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/groups.png"}
          title={"إضافة عضو للمجموعة"}
          subTitle={"يمكنك إضافة عضو لمجموعة من هنا"}
        />
        <div className="container p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {
              return (
                <Form className={`d-grid gap-3`}>
                  <DynamicComponent />
                  <div className="row text-center mt-4">
                    <MainButton
                      text={"اضافة"}
                      btnWidth={"200px"}
                      btnType={"submit"}
                      isLoading={isSchedulesLoading}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddGroupMember;
