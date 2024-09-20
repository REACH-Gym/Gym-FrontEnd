import styles from "./MeasurementsContainer.module.css";
import { useState, useMemo, useEffect } from "react";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";
import { useGetMeasurementsQuery } from "../../features/api";
import ContentContainer from "../ContentContainer/ContentContainer";
import MainButton from "../../Common Components/Main Button/MainButton";

import {
  useAddMeasurementsMutation,
  useGetMeasurementsQuery,
} from "../../features/api";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
// Measurements table container and header
const MeasurementsContainer = () => {
  const [page, setPage] = useState(1);
  const [measurementsData, setMeasurementsData] = useState([]);
  const { data, error, isLoading } = useGetMeasurementsQuery({
    page,
    page_size: 3,
  });
  console.log(data);
  console.log(measurementsData);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    if (data) {
      setMeasurementsData((prevData) => [...prevData, ...data?.data]);
    }
  }, [data]);

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
              <th className={`p-2 pt-3 pb-3`}>تاريخ التسجيل</th>
              <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.data.map((e, i) => <MeasurementsItem key={i} {...e} />)
              : null}
          </tbody>
        </table>
      </div>
    </div>
    <ContentContainer
      title={"جميع القياسات"}
      desc={"يمكنك إضافة قياس المطلوب"}
      mainIcon={"/assets/image/measurements.png"}
      btn1={"أضف قياس جديد"}
      btn2={"disabled"}
    >
      <div>
        <div className="d-flex w-100">
          <div className={`${styles.tableContainer} w-100 text-end ps-4 pe-4`}>
            <table className="w-100">
              <thead className={`fw-bold`}>
                <tr>
                  <th className={`p-2 pt-3 pb-3`}>#</th>
                  <th className={`p-2 pt-3 pb-3`}>العضو</th>
                  <th className={`p-2 pt-3 pb-3`}>تاريخ القياس</th>
                  <th className={`p-2 pt-3 pb-3`}>الطول</th>
                  <th className={`p-2 pt-3 pb-3`}>تاريخ التسجيل</th>
                  <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? measurementsData.map((e, i) => (
                      <MeasurementsItem key={i} {...e} />
                    ))
                  : null}
              </tbody>
            </table>
            <div className={`text-center mt-4`}>
              <MainButton
                text={"المزيد"}
                onClick={() => setPage((prev) => prev + 1)}
                btnWidth="100px"
                disabled={data?.next === null}
              />
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};
export default MeasurementsContainer;
