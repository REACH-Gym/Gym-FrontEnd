import { useEffect, useState } from "react";
import { useLazyGetSchedulesQuery } from "../../features/api";
import TrainerSchedule from "../TrainerSchedule/TrainerSchedule";
import styles from "./TrainerScheduleContainer.css";
const TrainerScheduleContainer = () => {
  const {
    data: trainerSchedule,
    isLoading: isTrainerSchedulesLoading,
    error: trainerScheduleError,
  } = useLazyGetSchedulesQuery("?filter{session.id}=1&sort[]=trainer.id");
  console.log(trainerSchedule);
  const [data, setData] = useState({});
  const trainers = {};
  useEffect(() => {
    if (trainerSchedule) {
      for (let i = 0; i < 5; i++) {
        trainers[`${trainerSchedule?.data.schedules[i].trainer.id}`] =
          trainerSchedule?.data.schedules[i].trainer.name;
      }
      console.log(trainers);
      setData(trainers);
      console.log(data);
    }
  }, [trainerSchedule]);
  console.log(trainerSchedule);
  return (
    <div className={`${styles.trainerSchedule} w-100`}>
      {Object.keys(data)?.map((trainer, index) => (
        <TrainerSchedule
          key={index}
          id={trainer}
          trainerSchedule={trainerSchedule}
        />
      ))}
    </div>
  );
};

export default TrainerScheduleContainer;
