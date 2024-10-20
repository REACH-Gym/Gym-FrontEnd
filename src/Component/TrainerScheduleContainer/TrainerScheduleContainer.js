import { useEffect, useState } from "react";
import { useLazyGetSchedulesQuery } from "../../features/api";
import TrainerSchedule from "../TrainerSchedule/TrainerSchedule";
import styles from "./TrainerScheduleContainer.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
const TrainerScheduleContainer = () => {
  const { sessionId } = useParams();
  console.log(sessionId);
  const [
    getSchedules,
    { isFetching: isTrainerSchedulesLoading, error: trainerScheduleError },
  ] = useLazyGetSchedulesQuery();
  const [results, setResults] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getSchedules(
          `?filter{session.id}=${sessionId}&sort[]=trainer.id`
        );
        console.log(response.data.data.schedules);
        setResults(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getSchedules, sessionId]);
  const [data, setData] = useState({});
  useEffect(() => {
    const trainers = {};
    if (results) {
      for (let i = 0; i < results?.data?.data?.schedules?.length; i++) {
        trainers[`${results?.data?.data?.schedules[i]?.trainer.id}`] =
          results?.data?.data?.schedules[i]?.trainer.name;
      }
      console.log(trainers);
      setData(trainers);
    }
  }, [results]);
  console.log(Object.keys(data).length);
  console.log(results);

  const navigate = useNavigate();

  if (isTrainerSchedulesLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (trainerScheduleError) {
    if (trainerScheduleError?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (trainerScheduleError?.status === 401) {
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
    <div className={`${styles.trainerSchedule} w-100`}>
      <ComponentTitle
        MainIcon={"/assets/image/appointments.png"}
        title={"تفاصيل الموعد"}
        subTitle={"يمكنك متابعة تفاصيل الإشتراك من هنا"}
      />
      {Object.keys(data).length > 0 ? (
        Object.keys(data)?.map((trainer, index) => (
          <TrainerSchedule key={index} id={trainer} trainerSchedule={results} />
        ))
      ) : (
        <div className="text-center mt-5 fs-1 fw-bold text-primary">
          ليس هناك مواعيد متاحة لهذه المجموعة
        </div>
      )}
    </div>
  );
};

export default TrainerScheduleContainer;
