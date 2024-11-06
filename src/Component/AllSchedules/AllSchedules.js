import styles from "./AllSchedules.module.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useGetSessionsWithSchedulesQuery } from "../../features/api";
import { useEffect, useState } from "react";
import MainButton from "../../Common Components/Main Button/MainButton";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import Warning from "../../Common Components/Warning/Warning";
import AllScheduleItem from "../AllScheduleItem/AllScheduleItem";
import { useDispatch, useSelector } from "react-redux";
import { clear, searchR } from "../../features/searchSlice";

// Schedule table container and header
const AllSchedules = () => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const term = useSelector((state) => state.search.term.term);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("name");
  const filter = (filter) => {
    setFilterType(filter);
  };
  const { data, error, isLoading, isFetching } =
    useGetSessionsWithSchedulesQuery(
      `?page=${page}&per_page=20&filter{${filterType}.istartswith}=${
        term ? term : ""
      }`
    );
  console.log(data);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setTotalPages(data?.data.meta?.total_pages);
    setSessions([]);
    for (let i = 0; data?.data?.sessions?.length > i; i++) {
      if (data?.data?.sessions[i].schedules?.length > 0) {
        setSessions((prev) => [...prev, data?.data?.sessions[i]]);
      }
    }
  }, [data]);

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    if (error?.status === 403) {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (error?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      {confirmation && (
        <Warning
          text={"هل تريد حذف هذا الموعد؟"}
          handleConfirm={setConfirmed}
        />
      )}
      <div className={`${styles.scheduleContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/appointments.png"}
            title={"جميع المواعيد"}
            subTitle={"يمكنك متابعة جميع المواعيد  من هنا"}
          />
          <Filter
            filter={true}
            isDisabled={isDisabled}
            placeHolder={placeHolder}
            handleClear={() => {
              dispatch(searchR({ term: "" }));
              filter("name");
              setIsDisabled(false);
              setPlaceHolder("ابحث هنا...");
            }}
          >
            <div className={`p-2 rounded-2 bg-white`}>
              <div
                className={`p-2 ${styles.filter} rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("name");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                المجموعة
              </div>
              <div className={`p-2 rounded-2`}>
                <div>الحالة</div>
                <div className={`pe-3`}>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: true }));
                      filter("is_active");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الحالة");
                    }}
                  >
                    فعال
                  </div>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: false }));
                      filter("is_active");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الحالة");
                    }}
                  >
                    محذوف
                  </div>
                </div>
              </div>
            </div>
          </Filter>
          <ComponentBtns
            btn1={"+ إضافة موعد جديد "}
            onclick={() => {
              navigate("/Home/AddScheduleForm");
            }}
          />
        </div>
        {isFetching ? (
          <div
            className="d-flex justify-content-center align-items-center w-100"
            style={{ height: "100vh" }}
          >
            <Commet color="#316dcc" size="medium" text="" textColor="" />
          </div>
        ) : data?.data?.sessions?.length > 0 ? (
          <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
            <table className="w-100">
              <thead className={`fw-bold`}>
                <th className={`p-2 pt-3 pb-3`}>#</th>
                <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
                <th className={`p-2 pt-3 pb-3`}>السعر</th>
                <th className={`p-2 pt-3 pb-3`}>المدة</th>
                <th className={`p-2 pt-3 pb-3`}>عدد المواعيد</th>
                <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
                <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
              </thead>
              <tbody>
                {sessions?.map((session, index) => (
                  <AllScheduleItem
                    key={index}
                    index={sessions.indexOf(session) + (page - 1) * 5 + 1}
                    session={session}
                    schedulesLength={session.schedules.length}
                    deleteConfirmation={confirmed}
                    confirmation={setConfirmation}
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
                text="السابق"
                disabled={page === 1}
                btnWidth="100px"
              />
              <p className="m-0 text-light">
                الصفحة {page} من {totalPages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                text="التالي"
                disabled={page === totalPages}
                btnWidth="100px"
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
    </>
  );
};
export default AllSchedules;
