import ContentContainer from "../ContentContainer/ContentContainer";
import ReservationItem from "../ReservationItem/ReservationItem";
import styles from "./ReservationsContainer.module.css";

const ReservationsContainer = () => {
  const row = {
    num: 1,
    name: "اسم الحجز",
    membership: "رقم العضوية",
    group: "اسم المجموعة",
    from: "من",
    to: "إلى",
    status: "تم",
    rating: "3.5",
  };

  return (
    <ContentContainer
      title={"جميع الحجوزات"}
      desc={"يمكنك متابعة جميع بيانات الحجوزات"}
      mainIcon={"/assets/image/reservation.png"}
      btn2={"disabled"}
    >
      <div className={`${styles.tableContainer} w-100 text-end`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <tr>
              <th className={`p-2 pt-3 pb-3`}>#</th>
              <th className={`p-2 pt-3 pb-3`}>الإسم</th>
              <th className={`p-2 pt-3 pb-3`}>رقم العضوية</th>
              <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
              <th className={`p-2 pt-3 pb-3`}>من</th>
              <th className={`p-2 pt-3 pb-3`}>إلى</th>
              <th className={`p-2 pt-3 pb-3`}>الحالة</th>
              <th className={`p-2 pt-3 pb-3`}>التقييم</th>
              <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
            </tr>
          </thead>
          <tbody>
            <ReservationItem {...row} />
          </tbody>
        </table>
      </div>
    </ContentContainer>
  );
};

export default ReservationsContainer;
