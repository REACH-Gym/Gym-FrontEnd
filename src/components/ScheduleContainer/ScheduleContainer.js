import styles from "./ScheduleContainer.module.css";
// import ScheduleItem from "../ScheduleItem/ScheduleItem";
import AddScheduleForm from "../AddScheduleForm/AddScheduleForm";

// Schedule table container and header
const ScheduleContainer = ({ rows }) => {
  return (
    <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
      {/* <table className="w-100">
        <thead className={`fw-bold`}>
          <th className={`p-2 pt-3 pb-3`}>#</th>
          <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
          <th className={`p-2 pt-3 pb-3`}>من</th>
          <th className={`p-2 pt-3 pb-3`}>إلى</th>
          <th className={`p-2 pt-3 pb-3`}>الطاقة الإستيعابية</th>
          <th className={`p-2 pt-3 pb-3`}>الطاقة الحالية</th>
          <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
        </thead>
        <tbody>
          <ScheduleItem {...row} />
        </tbody>
      </table> */}
      <AddScheduleForm />
    </div>
  );
};
export default ScheduleContainer;
