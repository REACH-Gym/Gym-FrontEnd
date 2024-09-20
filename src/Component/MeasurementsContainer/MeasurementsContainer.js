import styles from "./MeasurementsContainer.module.css";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";
import {
  useAddMeasurementsMutation,
  useGetMeasurementsQuery,
} from "../../features/api";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
// Measurements table container and header
const MeasurementsContainer = ({ rows }) => {
  const { data, error, isLoading } = useGetMeasurementsQuery();
  console.log(data);
  console.log(isLoading);
  console.log(error);
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
  );
};
export default MeasurementsContainer;
