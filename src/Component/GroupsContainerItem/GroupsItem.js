import styles from "./GroupsItem.module.css";
import { Active, Expired, Cancled } from "../Status/Status";
import { useNavigate } from "react-router-dom";
const SubMenu = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.subMenu}`}>
      <div
        className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5"
        onClick={() => {
          navigate(`/Home/EditGroupMember/${id}/`);
        }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ alignSelf: "center" }}
        >
          <path
            d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
            fill="#4F4F4F"
          />
          <path
            d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
            fill="#4F4F4F"
          />
        </svg>
        <div className={`d-inline-block`}>تعديل</div>
      </div>
      <div className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center fs-5">
        <svg
          width="25"
          height="25"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ alignSelf: "center" }}
        >
          <path
            d="M3 9.5C3 9.76522 3.10536 10.0196 3.29289 10.2071C3.48043 10.3946 3.73478 10.5 4 10.5H8C8.26522 10.5 8.51957 10.3946 8.70711 10.2071C8.89464 10.0196 9 9.76522 9 9.5V3.5H3V9.5ZM4 4.5H8V9.5H4V4.5ZM7.75 2L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75Z"
            fill="#4F4F4F"
          />
        </svg>
        <div className={`d-inline-block`}>حذف</div>
      </div>
    </div>
  );
};
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
        {item.status === "cancelled" ? <Cancled /> : null}
      </td>
      <td className={`${styles.tableColumn} position-relative p-2`}>
        <span></span>
        <span></span>
        <span></span>
        <SubMenu id={item.id} />
      </td>
    </tr>
  );
};

export default GroupsItem;
