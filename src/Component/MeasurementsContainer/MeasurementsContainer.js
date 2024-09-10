import styles from "./MeasurementsContainer.module.css";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";
import {
  useAddMeasurementsMutation,
  useGetMeasurementsQuery,
} from "../../features/api";
import ContentContainer from "../ContentContainer/ContentContainer";

// Measurements table container and header
const MeasurementsContainer = ({ rows }) => {
  const { data, error, isLoading } = useGetMeasurementsQuery();
  console.log(data);
  console.log(isLoading);
  console.log(error);
  // const [addMeasuremenst, { isLoading }] = useAddMeasurementsMutation();

  // const handleSubmit = async () => {
  //   try {
  //     const response = await addMeasuremenst();
  //     console.log(response);
  //     console.log(isLoading);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <ContentContainer
      title={"جميع القياسات"}
      desc={"يمكنك إضافة قياس المطلوب"}
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
                  ? data.data.map((e, i) => <MeasurementsItem key={i} {...e} />)
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};
export default MeasurementsContainer;
