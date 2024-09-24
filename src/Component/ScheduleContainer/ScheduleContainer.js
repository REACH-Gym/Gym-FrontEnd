import styles from "./ScheduleContainer.module.css";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useGetSessionsQuery } from "../../features/api";
import { useEffect, useState } from "react";
import MainButton from "../../Common Components/Main Button/MainButton";

// Schedule table container and header
const ScheduleContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading } = useGetSessionsQuery(
    `?page=${page}&per_page=20&sort[]=-id`
  );
  console.log(data);
  useEffect(() => {
    setTotalPages(data?.data.meta?.total_pages);
  }, [data]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center text-primary fs-3 fw-bold">
        جاري التحميل...
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold">
        حدث خطأ، برجاء المحاولة مرة أخرى
      </div>
    );
  }

  return (
    <div className={`${styles.scheduleContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/appointments.png"}
          title={" جميع المواعيد"}
          subTitle={"يمكنك متابعة جميع االمواعيد  من هنا"}
        />
        <Filter />
        <ComponentBtns btn1={"+ إضافة موعد جديد "} />
      </div>
      <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <th className={`p-2 pt-3 pb-3`}>#</th>
            <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
            <th className={`p-2 pt-3 pb-3`}>السعر</th>
            <th className={`p-2 pt-3 pb-3`}>المدة</th>
            <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
            <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
          </thead>
          <tbody>
            {data?.data.sessions.map((session, index) => (
              <ScheduleItem
                key={index}
                index={
                  data?.data.sessions?.indexOf(session) + (page - 1) * 5 + 1
                }
                session={session}
              />
            ))}
          </tbody>
        </table>
        <div
          className={`d-flex justify-content-between m-auto mt-5 align-items-center`}
          style={{ width: "350px" }}
        >
          <MainButton
            onClick={() => setPage(page - 1)}
            text="<<"
            disabled={page === 1}
            btnWidth="100px"
          />
          <p className="m-0">
            الصفحة {page} من {totalPages}
          </p>
          <MainButton
            onClick={() => setPage(page + 1)}
            text=">>"
            disabled={page === totalPages}
            btnWidth="100px"
          />
        </div>
      </div>
    </div>
  );
};
export default ScheduleContainer;
