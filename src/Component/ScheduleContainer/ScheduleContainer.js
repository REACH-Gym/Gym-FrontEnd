import styles from "./ScheduleContainer.module.css";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ContentContainer from "../ContentContainer/ContentContainer";
import { useGetSessionsQuery } from "../../features/api";
import { useEffect, useState } from "react";
import MainButton from "../../Common Components/Main Button/MainButton";

// Schedule table container and header
const ScheduleContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading } = useGetSessionsQuery(
    `?page=${page}&per_page=5&sort[]=-id`
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
            <th className={`p-2 pt-3 pb-3`}>السعر</th>
            <th className={`p-2 pt-3 pb-3`}>المدة</th>
            <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
            <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
          </thead>
          <tbody>
            {data?.data.sessions.map((session, index) => (
              <ScheduleItem
                key={index}
                inedx={
                  data?.data.user_sessions?.indexOf(session) +
                  (page - 1) * 5 +
                  1
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
          />
          <p className="m-0">
            الصفحة {page} من {totalPages}
          </p>
          <MainButton
            onClick={() => setPage(page + 1)}
            text=">>"
            disabled={page === totalPages}
          />
        </div>
      </div>
    </ContentContainer>
  );
};
export default ScheduleContainer;
