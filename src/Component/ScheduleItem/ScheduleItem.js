import styles from "./ScheduleItem.module.css";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const MeasurementsItem = ({ index, session }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{index}</td>
      <td className="table-column p-2">{session.name}</td>
      <td className="table-column p-2">{session.price}</td>
      <td className="table-column p-2">{session.duration}</td>
      <td className="table-column p-2">{session.description}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default MeasurementsItem;
