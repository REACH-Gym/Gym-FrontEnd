import styles from "./EditSchedule.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  useGetEmployeesQuery,
  useLazyGetSchedulesQuery,
  usePatchScheduleMutation,
} from "../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";

const daysOfWeek = [
  "السبت",
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
];
const weekDays = {
  saturday: "السبت",
  sunday: "الاحد",
  monday: "الاثنين",
  tuesday: "الثلاثاء",
  wednesday: "الاربعاء",
  thursday: "الخميس",
  friday: "الجمعة",
};
const EditSchedule = () => {
  const {
    data: trainers,
    isFetching: isEmployeesLoading,
    error: employeesError,
  } = useGetEmployeesQuery("?filter{role}=T");
  console.log(trainers);

  const [getSchedule, { isFetching: isScheduleLoading, error: scheduleError }] =
    useLazyGetSchedulesQuery();

  const [response, setResponse] = useState({});
  const { ScheduleId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getSchedule(`${ScheduleId}`).unwrap();
        console.log(response);
        setResponse({ ...response?.data?.schedule });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [ScheduleId, getSchedule]);

  const validationSchema = Yup.object({
    session: Yup.string().required("هذا الحقل إلزامي"),
    max_capacity: Yup.number()
      .min(0, "يجب أن يكون أكبر من صفر")
      .required("هذا الحقل إلزامي"),
    trainer: Yup.string().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    session: response?.session?.id,
    max_capacity: response?.max_capacity,
    trainer: response?.trainer?.id,
  };

  const setFieldValueRef = useRef(null);
  const resetFormRef = useRef(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case "setSchedule":
        return [
          ...state,
          {
            day: action.payload.day,
            time: action.payload.time,
            id: action.payload.id,
          },
        ];
      case "editScheduleDay":
        return state.map((day) =>
          day.id === action.payload.id
            ? { ...day, day: action.payload.day }
            : day
        );
      case "editScheduleTime":
        return state.map((day) =>
          day.id === action.payload.id
            ? { ...day, time: action.payload.time }
            : day
        );
      case "deleteSchedule":
        return state.filter((day) => day.id !== action.payload.id);
      case "reset":
        return [];
      default: {
        return state;
      }
    }
  };

  const initialValue = [];
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [sessionName, setSessionName] = useState("");

  const [patchSchedule, { isLoading: isPatchScheduleLoading }] =
    usePatchScheduleMutation();

  useEffect(() => {
    console.log(response);
    const weekDays = {
      saturday: "السبت",
      sunday: "الاحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الاربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
    };
    if (Object.keys(response).length > 0) {
      console.log(response?.session?.id);
      setSessionName(response?.session?.name);
      let counter = 0;
      dispatch({ type: "reset" });
      for (let i = 0; i < Object.keys(response).length; i++) {
        if (
          Object.keys(weekDays).includes(Object.keys(response)[i]) &&
          response[`${Object.keys(response)[i]}`] !== null
        ) {
          counter++;
          console.log(Object.keys(response)[i]);
          console.log(response[`${Object.keys(response)[i]}`]);
          dispatch({
            type: "setSchedule",
            payload: {
              id: counter,
              day: Object.keys(response)[i],
              time: response[`${Object.keys(response)[i]}`],
            },
          });
        } else {
          continue;
        }
      }
    }
  }, [response]);
  console.log(state);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      resetFormRef.current();
      setFieldValueRef.current("session", response?.session?.id);
      setFieldValueRef.current("max_capacity", values.max_capacity);
      setFieldValueRef.current("trainer", values.trainer);
      for (let i = 0; i < state.length; i++) {
        values[state[i].day] = state[i].time;
      }
      for (let i = 0; i < Object.keys(response).length; i++) {
        if (!Object.keys(values).includes(Object.keys(response)[i])) {
          values[Object.keys(response)[i]] = null;
        }
      }
      console.log(values);
      const filterdValues = Object.keys(values).filter(
        (value) => values[value] !== null
      );
      console.log(filterdValues);
      if (filterdValues.length > 4) {
        try {
          const patchResponse = await patchSchedule({
            id: ScheduleId,
            data: values,
          }).unwrap();
          console.log(patchResponse);
          setSuccess(true);
          setTimeout(() => {
            navigate(`/Home/SessionDetails/${response?.session?.id}/`);
            setSuccess(false);
          }, 1000);
        } catch (error) {
          if (error.originalStatus === 403) {
            setError("ليس لديك الصلاحية لإضافة مجموعة.");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (error.originalStatus === 401) {
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
      } else {
        setError("يجب أن يحتوي الموعد على يوم واحد على الاقل");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [disabled, setDisabled] = useState(
    Object.keys(weekDays).reduce((acc, day, i) => {
      acc[`day${i + 1}`] = true; // Initially, all select elements are disabled
      return acc;
    }, {})
  );
  const handleEdit = (day) => {
    setDisabled((prevState) => ({
      ...prevState,
      [day]: !prevState[day], // Toggle the disabled state for the clicked day
    }));
  };

  const handleDelete = (dayId) => {
    console.log(dayId);
    dispatch({ type: "deleteSchedule", payload: { id: dayId } });
  };

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const handleAdd = () => {
    if (day?.length > 0 && time?.length > 0) {
      dispatch({
        type: "setSchedule",
        payload: {
          id: state.length + 1,
          day,
          time,
        },
      });
      setDay("");
      setTime("");
    }
  };

  if (isEmployeesLoading || isScheduleLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (employeesError || scheduleError) {
    if (employeesError?.status === 403 || scheduleError?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (
      employeesError?.status === 401 ||
      scheduleError?.status === 401
    ) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }
  return (
    <>
      {success && <Success text={"تم تعديل الموعد بنجاح"} show={success} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      <div className={`${styles.schedulFormeContainer}`}>
        <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/appointments.png"}
            title={"اضافه موعد جديد"}
            subTitle={"يمكنك اضافه موعد جديد من هنا"}
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, resetForm }) => {
            setFieldValueRef.current = setFieldValue;
            resetFormRef.current = resetForm;
            return (
              <Form className={`${styles.groupForm} d-grid gap-3 p-4`}>
                <div className="row">
                  <div className="col-6">
                    <label className="text-light mb-2 mt-2">اسم المجموعة</label>
                    <input
                      type="text"
                      disabled
                      value={sessionName}
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
                      {trainers?.data?.users?.map((trainer, index) => (
                        <option key={index} value={trainer.id}>
                          {trainer.name}
                        </option>
                      ))}
                    </InputField>
                  </div>
                </div>
                <div className={`row mt-4`}>
                  <div className="col-12 fw-bold fs-5 text-light">الموعد</div>
                </div>
                <div className={`row`}>
                  <div className="col-5">
                    <label className={`text-light mb-2 mt-2`}>اليوم</label>
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value={""}>إختر</option>
                      {daysOfWeek.map((day, i) => (
                        <option
                          key={i}
                          value={Object.keys(weekDays).find(
                            (weekDay) => weekDays[weekDay] === day
                          )}
                        >
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-5">
                    <label className={`text-light mb-2 mt-2`}>الساعة</label>
                    <input
                      type="time"
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        outline: "none",
                        height: "52px",
                      }}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div
                    className="col-1 fs-3 fw-bold text-primary d-flex justify-content-center align-items-end pb-3"
                    style={{ cursor: "pointer" }}
                    onClick={handleAdd}
                  >
                    <img
                      src="/assets/image/correct-signal-svgrepo-com.png"
                      alt="confirm"
                      width={25}
                    />
                  </div>
                </div>
                {state?.map((currentDay, index) => (
                  <div key={index} className={`row`}>
                    <div className="col-5">
                      <label className={`text-light mb-2 mt-2`}>اليوم</label>
                      <select
                        style={{
                          width: "100%",
                          backgroundColor: "#F4F4F4",
                          border: "none",
                          borderRadius: "5px",
                          padding: "10px",
                          outline: "none",
                          height: "52px",
                        }}
                        value={state[index].day}
                        onChange={(e) => {
                          dispatch({
                            type: "editScheduleDay",
                            payload: {
                              id: index + 1,
                              day: e.target.value,
                            },
                          });
                        }}
                        disabled={disabled[`day${index + 1}`]}
                      >
                        {daysOfWeek.map((day, i) => (
                          <option
                            key={i}
                            value={Object.keys(weekDays).find(
                              (weekDay) => weekDays[weekDay] === day
                            )}
                          >
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-5">
                      <label className={`text-light mb-2 mt-2`}>الساعة</label>
                      <input
                        type="time"
                        style={{
                          width: "100%",
                          backgroundColor: "#F4F4F4",
                          border: "none",
                          borderRadius: "5px",
                          padding: "10px",
                          outline: "none",
                          height: "52px",
                        }}
                        value={state[index].time}
                        onChange={(e) => {
                          dispatch({
                            type: "editScheduleTime",
                            payload: {
                              id: index + 1,
                              time: e.target.value,
                            },
                          });
                        }}
                        disabled={disabled[`day${index + 1}`]}
                      />
                    </div>
                    {disabled[`day${index + 1}`] ? (
                      <div
                        className="col-1 fs-3 fw-bold text-primary d-flex justify-content-center align-items-end pb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(`day${index + 1}`)}
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                            fill="#4F4F4F"
                          />
                          <path
                            d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                            fill="#4F4F4F"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="col-1 fs-3 fw-bold text-primary d-flex justify-content-center align-items-end pb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(`day${index + 1}`)}
                      >
                        <svg
                          fill="#000000"
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          id="check-mark-square-2"
                          data-name="Flat Line"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon flat-line"
                        >
                          <polyline
                            id="primary"
                            points="21 5 12 14 8 10"
                            style={{
                              fill: "none",
                              stroke: "rgb(0, 0, 0)",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          ></polyline>
                          <path
                            id="primary-2"
                            data-name="primary"
                            d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16"
                            style={{
                              fill: "none",
                              stroke: "green",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          ></path>
                        </svg>
                      </div>
                    )}
                    <div
                      className="col-1 fs-3 fw-bold text-primary d-flex justify-content-center align-items-end pb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(state[index].id);
                      }}
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 9.5C3 9.76522 3.10536 10.0196 3.29289 10.2071C3.48043 10.3946 3.73478 10.5 4 10.5H8C8.26522 10.5 8.51957 10.3946 8.70711 10.2071C8.89464 10.0196 9 9.76522 9 9.5V3.5H3V9.5ZM4 4.5H8V9.5H4V4.5ZM7.75 2L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75Z"
                          fill="#dc3545"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                <div className="row text-center">
                  <MainButton
                    text="تعديل"
                    btnType="submit"
                    btnWidth={"200px"}
                    isLoading={isPatchScheduleLoading}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EditSchedule;
