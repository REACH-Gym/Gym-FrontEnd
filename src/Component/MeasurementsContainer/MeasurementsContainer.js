import styles from "./MeasurementsContainer.module.css";
import { useState, useEffect } from "react";
import MeasurementsItem from "../MeasurementsItem/MeasurementsItem";
import { useGetMeasurementsQuery } from "../../features/api";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

// Measurements table container and header
const MeasurementsContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading, isFetching } = useGetMeasurementsQuery({
    page,
    page_size: 20,
  });
  useEffect(() => {
    setTotalPages(data?.total_pages);
  }, [data]);

  const navigate = useNavigate();

  if (isLoading || isFetching) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    if (error?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (error?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`fs-3 w-100 fw-bold text-danger d-flex justify-content-center align-items-center`}
          style={{ height: "100vh" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }
  return (
    <div className={`${styles.MeasurementsContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/measurments.png"}
          title={" جميع القياسات"}
          subTitle={"يمكنك متابعة جميع القياسات  من هنا"}
        />
        <ComponentBtns btn1={"+ إضافة قياس جديد "} />
      </div>
      {data?.data.length > 0 ? (
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
              text={"السابق"}
              onClick={() => setPage((prev) => prev - 1)}
              btnWidth="100px"
              disabled={page === 1}
            />
            <p className="m-0">
              الصفحة {page} من {totalPages}
            </p>
            <MainButton
              text={"التالي"}
              onClick={() => setPage((prev) => prev + 1)}
              btnWidth="100px"
              disabled={page === totalPages ? true : false}
            />
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
          style={{ color: "red", height: "60vh" }}
        >
          لا يوجد نتائج
        </div>
      )}
    </div>
  );
};
export default MeasurementsContainer;
