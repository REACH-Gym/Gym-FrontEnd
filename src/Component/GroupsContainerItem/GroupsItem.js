import styles from "./GroupsItem.module.css";
import { Active, Expired, Cancled } from "../Status/Status";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const GroupsItem = ({ index, item }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{index}</td>
      <td className="table-column p-2">{item.user.name}</td>
      <td className="table-column p-2">{item.schedule.session.name}</td>
      <td className="table-column p-2">{item.schedule.trainer.name}</td>
      <td className="table-column p-2">
        {item.status === "active" ? <Active /> : null}
        {item.status === "expired" ? <Expired /> : null}
        {item.status === "cancled" ? <Cancled /> : null}
      </td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default GroupsItem;
