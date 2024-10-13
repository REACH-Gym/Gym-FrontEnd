import { useEffect, useState } from "react";
import { useLazyGetSchedulesQuery } from "../../features/api";
import TrainerSchedule from "../TrainerSchedule/TrainerSchedule";
import styles from "./TrainerScheduleContainer.module.css";
import { useParams } from "react-router-dom";
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
  }, [getSchedules]);
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
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 fs-1 fw-bold text-danger">
        حدث خطأ برجاء المحاولة مرة أخرى لاحقا.
      </div>
    );
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
