import styles from "./MeasurementsItem.module.css";
import Navbar from "../Navbar/Navbar";
import SidebarBox from "../Sidebar/Sidebar";
// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const MeasurementsItem = ({ ...row }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{row.num}</td>
      <td className="table-column p-2">{row.member}</td>
      <td className="table-column p-2">{row.measurementDate}</td>
      <td className="table-column p-2">{row.height}</td>
      <td className="table-column p-2">{row.registerDate}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default MeasurementsItem;
