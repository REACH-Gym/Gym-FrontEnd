import styles from "./PaymentMethodItem.module.css";
const PaymentMethodItem = ({ ...row }) => {
  return (
    <tr className={`${styles.tableRow}`}>
      <td className="table-column p-2">{row.num}</td>
      <td className="table-column p-2">{row.name}</td>
      <td className="table-column p-2">{row.account}</td>
      <td className="table-column p-2">{row.commissionAccount}</td>
      <td className="table-column p-2">{row.commission}</td>
      <td className="table-column p-2">
        <span></span>
        <span></span>
        <span></span>
      </td>
    </tr>
  );
};
export default PaymentMethodItem;
