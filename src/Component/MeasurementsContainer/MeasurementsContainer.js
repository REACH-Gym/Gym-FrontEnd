import styles from "./MeasurementsContainer.module.css";
import { useState, useMemo, useEffect } from "react";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";
import { useGetMeasurementsQuery  , useAddMeasurementsMutation} from "../../features/api";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
// Measurements table container and header
const MeasurementsContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading, isFetching } = useGetMeasurementsQuery({
    page,
    page_size: 5,
  });
  useEffect(() => {
    setTotalPages(data?.total_pages);
  }, [data]);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  if (isLoading || isFetching) {
    return (
      <div
        className={`fs-3 fw-bold text-primary d-flex justify-content-center align-items-center`}
      >
        جاري التحميل...
      </div>
    );
  }
  if (error) {
    return <div>حدث خطأ، برجاء المحاولة مرة أخرى.</div>;
  }
  return (
    <div className={`${styles.MeasurementsContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/measurments.png"}
          title={" جميع القياسات"}
          subTitle={"يمكنك متابعة جميع القياسات  من هنا"}
        />
        <Filter />
        <ComponentBtns btn1={"+ إضافة قياس جديد "} />
      </div>
      <div className={`${styles.tableContainer} w-100 text-end ps-4 pe-4`}>
            <table className="w-100">
              <thead className={`fw-bold`}>
                <tr>
                  <th className={`p-2 pt-3 pb-3`}>#</th>
                  <th className={`p-2 pt-3 pb-3`}>العضو</th>
                  <th className={`p-2 pt-3 pb-3`}>تاريخ القياس</th>
                  <th className={`p-2 pt-3 pb-3`}>الطول</th>
                  <th className={`p-2 pt-3 pb-3`}>الوزن</th>
                  <th className={`p-2 pt-3 pb-3`}>تاريخ التسجيل</th>
                  <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((e, index) => (
                  <MeasurementsItem
                    key={index}
                    index={data?.data.indexOf(e) + (page - 1) * 5 + 1}
                    item={e}
                  />
                ))}
              </tbody>
            </table>
            <div
              className={`text-center m-auto mt-4 d-flex justify-content-between align-items-center`}
              style={{ width: "350px" }}
            >
              <MainButton
                text={"<<"}
                onClick={() => setPage((prev) => prev - 1)}
                btnWidth="100px"
                disabled={page === 1}
              />
              <p className="m-0">
                الصفحة {page} من {totalPages}
              </p>
              <MainButton
                text={">>"}
                onClick={() => setPage((prev) => prev + 1)}
                btnWidth="100px"
                disabled={page === totalPages ? true : false}
              />
            </div>
          </div>
        </div>
   
  );
};
export default MeasurementsContainer;
