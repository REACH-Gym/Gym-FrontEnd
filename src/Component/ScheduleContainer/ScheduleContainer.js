import styles from "./ScheduleContainer.module.css";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ContentContainer from "../ContentContainer/ContentContainer";

// Schedule table container and header
const ScheduleContainer = () => {
  const row = {
    num: 1,
    member: "Ahmed",
    measurementDate: "2022-01-01",
    height: "170",
    registerDate: "2022-01-01",
  };
  return (
    <ContentContainer
      title={"جميع المواعيد"}
      desc={"يمكنك متابعة جميع المواعيد هنا"}
      mainIcon={"/assets/image/schedule.png"}
      btn1={"إضافة موعد جديد"}
      btn2={"disabled"}
    >
      <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
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
    </ContentContainer>
  );
};
export default ScheduleContainer;
