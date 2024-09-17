import styles from "./GroupsItem.module.css";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const GroupsItem = ({ ...members }) => {
  console.log(members);
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">1</td>
      <td className="table-column p-2">
        {members.data.user_sessions[2].user.name}
      </td>
      <td className="table-column p-2"></td>
      <td className="table-column p-2"></td>
      <td className="table-column p-2"></td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default GroupsItem;
