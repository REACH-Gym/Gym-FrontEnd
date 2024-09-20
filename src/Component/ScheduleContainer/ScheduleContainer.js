import styles from "./ScheduleContainer.module.css";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
const ScheduleContainer = () => {
  const row = {
    num: 1,
    member: "Ahmed",
    measurementDate: "2022-01-01",
    height: "170",
    registerDate: "2022-01-01",
  };
  return (
    <div className={`${styles.scheduleContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/appointments.png"}
          title={" جميع المواعيد"}
          subTitle={"يمكنك متابعة جميع االمواعيد  من هنا"}
        />
        <Filter/>
        <ComponentBtns btn1={"+ إضافة موعد جديد "} />
      </div>
      <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <th className={`p-2 pt-3 pb-3`}>#</th>
            <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
            <th className={`p-2 pt-3 pb-3`}>من</th>
            <th className={`p-2 pt-3 pb-3`}>إلى</th>
            <th className={`p-2 pt-3 pb-3`}>الطاقة الإستيعابية</th>
            <th className={`p-2 pt-3 pb-3`}>الطاقة الحالية</th>
            <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
          </thead>
          <tbody>
            <ScheduleItem {...row} />
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ScheduleContainer;
