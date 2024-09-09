import styles from "./ScheduleItem.module.css";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const MeasurementsItem = ({ ...row }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{row.num}</td>
      <td className="table-column p-2">{row.group}</td>
      <td className="table-column p-2">{row.from}</td>
      <td className="table-column p-2">{row.to}</td>
      <td className="table-column p-2">{row.capacity}</td>
      <td className="table-column p-2">{row.currentCapacity}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default MeasurementsItem;
