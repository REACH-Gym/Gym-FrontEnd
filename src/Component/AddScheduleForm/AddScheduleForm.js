import styles from "./AddScheduleForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { useRef, useState } from "react";
import {
  useGetEmployeesQuery,
  usePostScheduleMutation,
  useGetSessionsQuery,
} from "../../features/api";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";

const daysOfWeek = [
  "السبت",
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
];

const AddScheduleForm = () => {
  const validationSchema = Yup.object({
    session: Yup.string().required("هذا الحقل إلزامي"),
    max_capacity: Yup.number().required("هذا الحقل إلزامي"),
    trainer: Yup.string().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    session: "",
    max_capacity: "",
    trainer: "",
  };
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [days, setDays] = useState([]);
  const valuesRef = useRef(null);
  const setValuesRef = useRef(null);
  const handleDelete = (length, day) => {
    console.log(weekDays[day]);
    setAvailableDays((prev) => [...prev, weekDays[day]]);
    console.log(valuesRef.current);
    const { [day]: removed, ...rest } = valuesRef.current;
    setValuesRef.current(rest);
    setDays((prev) => prev.filter((item, i) => i !== length));
  };
  const [availableDays, setAvailableDays] = useState([...daysOfWeek]);
  const handleAdd = (setFieldValue) => {
    console.log("Day: ", day);
    console.log("Time: ", time);
    const weekDays = {
      saturday: "السبت",
      sunday: "الاحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الاربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
    };
    if (day && time) {
      setFieldValue(day, time);
      console.log(day);
      setAvailableDays([
        ...availableDays.filter((dayOfWeek) => dayOfWeek !== weekDays[day]),
      ]);
      setDays((prev) => [
        ...prev,
        <>
          <div className={`col-6`}>
            <label className={`text-secondary mb-2 mt-2`}>اليوم</label>
            <input
              type="text"
              disabled
              value={weekDays[day]}
              style={{
                width: "100%",
                backgroundColor: "#F4F4F4",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                outline: "none",
                height: "52px",
              }}
            />
          </div>
          <div className={`col-5`}>
            <div>
              <label className={`text-secondary mb-2 mt-2`}>الساعة</label>
              <input
                type="time"
                value={time}
                disabled
                style={{
                  width: "100%",
                  backgroundColor: "#F4F4F4",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  outline: "none",
                  height: "52px",
                }}
              />
            </div>
          </div>
          <div
            className={`col-1 text-danger fs-3 fw-bold d-flex justify-content-center align-items-end pb-2`}
            onClick={() => handleDelete(days.length, day)}
            style={{ cursor: "pointer" }}
          >
            -
          </div>
        </>,
      ]);
      console.log(days);
    } else {
      alert("يجب إدخال اليوم والوقت");
    }
  };

  const [postSchedule] = usePostScheduleMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values);
    if (Object.keys(values).length < 4) {
      alert("يجب أدخال اليوم والوقت والمجموعة");
    } else {
      try {
        const response = await postSchedule(values);
        console.log(response);
        navigate("/Home/ScheduleContainer");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const {
    data: trainers,
    isLoading: isEmployeesLoading,
    error: employeesError,
  } = useGetEmployeesQuery("?role=T");

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
  } = useGetSessionsQuery(
    "?exclude[]=*&include[]=name&include[]=id&filter{is_active}=true"
  );
  console.log(sessions);

  const weekDays = {
    saturday: "السبت",
    sunday: "الاحد",
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الاربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
  };
  console.log(availableDays);

  if (isEmployeesLoading || isSessionsLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (employeesError || sessionsError) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold">
        حدث خطأ، برجاء المحاولة مرة أخرى.
      </div>
    );
  }

  return (
    <div className={`${styles.schedulFormeContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/appointments.png"}
          title={"اضافه موعد جديد"}
          subTitle={"يمكنك اضافه موعد جديد من هنا"}
        />
      </div>
      <div
        style={{ height: "100%" }}
        className="  justify-content-center align-items-center mt-3"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, setValues }) => {
            valuesRef.current = values;
            setValuesRef.current = setValues;
            return (
              <Form className={`${styles.groupForm} d-grid gap-3 p-4`}>
                <div className="row">
                  <div className="col-6">
                    <InputField
                      name="session"
                      label="المجموعة"
                      inputType={"select"}
                    >
                      <option value="">إختر</option>
                      {sessions?.data.sessions.map((session, index) => (
                        <option key={index} value={session.id}>
                          {session.name}
                        </option>
                      ))}
                    </InputField>
                  </div>
                  <div className="col-6">
                    <InputField
                      name="max_capacity"
                      label="الطاقة الإستيعابية"
                    />
                  </div>
                </div>
                <div className={`row`}>
                  <div className="col-6">
                    <InputField
                      name={"trainer"}
                      label={"المدرب"}
                      inputType={"select"}
                    >
                      <option value={""}> إختر </option>
                      {trainers?.data?.map((trainer, index) => (
                        <option key={index} value={trainer.id}>
                          {trainer.name}
                        </option>
                      ))}
                    </InputField>
                  </div>
                </div>
                <div className={`row mt-4`}>
                  <div className="col-12 fw-bold fs-5">الموعد</div>
                </div>
                <div className={`row`}>
                  <div className="col-6">
                    <label className={`text-secondary mb-2 mt-2`}>اليوم</label>
                    <select
                      onChange={(e) => setDay(e.target.value)}
                      value={day}
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                    >
                      <option value="">اختر</option>
                      {availableDays.map((day, index) => (
                        <option
                          key={index}
                          value={Object.keys(weekDays).find(
                            (key) => weekDays[key] === day
                          )}
                        >
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-5">
                    <label className={`text-secondary mb-2 mt-2`}>الساعة</label>
                    <input
                      type="time"
                      onChange={(e) => setTime(e.target.value)}
                      value={time}
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                    />
                  </div>
                  <div
                    className="col-1 fs-3 fw-bold text-primary d-flex justify-content-center align-items-end pb-2"
                    onClick={() => handleAdd(setFieldValue)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </div>
                </div>
                <div className="row" id="days">
                  {days}
                </div>
                <div className="row text-center">
                  <MainButton
                    text="إضافة"
                    btnType="submit"
                    btnWidth={"200px"}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddScheduleForm;
