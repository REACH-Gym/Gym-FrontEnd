import styles from "./GroupsItem.module.css";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const GroupsItem = ({ ...row }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{row.num}</td>
      <td className="table-column p-2">{row.name}</td>
      <td className="table-column p-2">{row.price}</td>
      <td className="table-column p-2">{row.discount}</td>
      <td className="table-column p-2">{row.duration}</td>
      <td className="table-column p-2">{row.numOfReservations}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default GroupsItem;
