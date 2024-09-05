import styles from "./MeasurementsContainer.module.css";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";

const row = {
  num: 1,
  member: "Ahmed",
  measurementDate: "2022-01-01",
  height: "170",
  registerDate: "2022-01-01",
};

// Measurements table container and header
const MeasurementsContainer = ({ rows }) => {
  return (
    <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
      <table className="w-100">
        <thead className={`fw-bold`}>
          <th className={`p-2 pt-3 pb-3`}>#</th>
          <th className={`p-2 pt-3 pb-3`}>العضو</th>
          <th className={`p-2 pt-3 pb-3`}>تاريخ القياس</th>
          <th className={`p-2 pt-3 pb-3`}>الطول</th>
          <th className={`p-2 pt-3 pb-3`}>تاريخ التسجيل</th>
          <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
        </thead>
        <tbody>
          <MeasurementsItem {...row} />
        </tbody>
      </table>
    </div>
  );
};
export default MeasurementsContainer;
