import {
  ConfirmedStatus,
  NotConfirmedStatus,
  CloseToFiniteStatus,
} from "../Status/Status";
import styles from "./ReservationItem.module.css";
const ReservationItem = ({ ...row }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{row.num}</td>
      <td className="table-column p-2">{row.name}</td>
      <td className="table-column p-2">{row.membership}</td>
      <td className="table-column p-2">{row.group}</td>
      <td className="table-column p-2">{row.from}</td>
      <td className="table-column p-2">{row.to}</td>
      <td className="table-column p-2">
        {row.status === "confirmed" ? <ConfirmedStatus /> : null}
        {row.status === "notConfirmed" ? <NotConfirmedStatus /> : null}
        {row.status === "CloseToFinish" ? <CloseToFiniteStatus /> : null}
      </td>
      <td className="table-column p-2">{row.rating}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};

export default ReservationItem;
