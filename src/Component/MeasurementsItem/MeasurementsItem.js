import styles from "./MeasurementsItem.module.css";
// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const MeasurementsItem = ({ index, item }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{index}</td>
      <td className="table-column p-2">{item.name}</td>
      <td className="table-column p-2">{item.month}</td>
      <td className="table-column p-2">{item.height}</td>
      <td className="table-column p-2">{item.weight}</td>
      <td className="table-column p-2">{item.month}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default MeasurementsItem;
