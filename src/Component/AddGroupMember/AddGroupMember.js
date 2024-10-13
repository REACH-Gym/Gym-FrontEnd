import InputField from "../../Common Components/InputField/InputField";
import styles from "./AddGroupMember.module.css";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useGetAllMembersQuery,
  useLazyGetSchedulesQuery,
  useGetSessionsQuery,
  usePostSessionMemberMutation,
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
  } = useGetAllMembersQuery();

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
  } = useGetSessionsQuery("");
  const [getSchedules, { data: schedulesData }] = useLazyGetSchedulesQuery();

  const [sessionSchedules, setSesstionSchedules] = useState([]);
  const [sessionPrice, setSessionPrice] = useState(0);

  useEffect(() => {
    if (values.group !== "") {
      setSessionPrice(
        sessions?.data?.sessions?.find(
          (session) => +session.id === +values.group
        )?.price
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
  }, [values.group, getSchedules, sessions?.data?.sessions]);

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
      <div className={`row`}>
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
        <div className={`col-6`}></div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField name="group" label="اسم المجموعة" inputType={"select"}>
            <option value={""}>اختر</option>
            {sessions?.data?.sessions?.map((session, i) => (
              <option value={session.id} key={i}>
                {session.name}
              </option>
            ))}
          </InputField>
        </div>
        <div className={`col-6`}>
          <InputField name="schedule" label="الموعد" inputType={"select"}>
            <option value={""}>اختر</option>
            {sessionSchedules?.map((schedule, i) => (
              <option value={schedulesData?.data?.schedules[i]?.id} key={i}>
                {schedule}
              </option>
            ))}
          </InputField>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-6`}>
          <InputField
            name="start_date"
            label="تاريخ البداية"
            inputType={"input"}
            type={"date"}
          />
        </div>
        <div className={`col-6`}>
          <InputField name="discount" label="الخصم (%)" />
        </div>
      </div>
      <div
        className={`row`}
        style={{ border: "1px solid #f0f0f0", borderRadius: 10 }}
      >
        <div
          className={`col-6 d-flex justify-content-center align-items-end p-3`}
        >
          <div className="ms-5 fs-5" style={{ minWidth: 150 }}>
            <strong>السعر:</strong>{" "}
            {sessionPrice
              ? `${Number(sessionPrice).toFixed(2)} ريال`
              : " لا يوجد "}
          </div>
        </div>
        <div
          className={`col-6 d-flex justify-content-center align-items-end p-3 fs-5`}
        >
          <div style={{ minWidth: 200 }}>
            <strong>السعر بعد الخصم:</strong>
            {sessionPrice > 0 && values.discount > 0
              ? ` ${(sessionPrice * (1 - values.discount / 100)).toFixed(
                  2
                )} ريال`
              : " لا يوجد "}
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
    discount: Yup.number().required("هذا الحقل الزامي").max(100),
    start_date: Yup.date().required("هذا الحقل الزامي"),
  });

  const [postSessionMember, { isError: isSchedulesError }] =
    usePostSessionMemberMutation();
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
        <div className="container bg-white p-4 rounded-4">
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
