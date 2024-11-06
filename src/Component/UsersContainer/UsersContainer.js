import styles from "./UsersContainer.module.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useEffect, useState } from "react";
import { useGetEmployeesQuery, useUserDataQuery } from "../../features/api";
import UsersItem from "../UsersItem/UsersItem";
import { Commet } from "react-loading-indicators";
import { useDispatch, useSelector } from "react-redux";
import { clear, searchR } from "../../features/searchSlice";

const UsersContainer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const term = useSelector((state) => state.search.term.term);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("name");
  const filter = (filter) => {
    setFilterType(filter);
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userDataError,
  } = useUserDataQuery();
  console.log(userData);
  const {
    data: emplyees,
    isLoading: isEmployeesLoading,
    isFetching: isEmployeesFetching,
    error: employeesError,
  } = useGetEmployeesQuery(
    `?page=${page}&per_page=20&filter{-id}=${
      userData?.data?.user?.id
    }&filter{${filterType}.istartswith}=${term ? term : ""}`
  );

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  const [total_pages, setTotalPages] = useState(0);
  useEffect(() => {
    if (emplyees) {
      setTotalPages(emplyees?.data?.meta?.total_pages);
    }
  }, [emplyees]);

  if (isEmployeesLoading || isUserLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (employeesError || userDataError) {
    if (employeesError.status === 403) {
      return (
        <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold w-100">
          ليس لديك صلاحية الوصول الى هذه الصفحة
        </div>
      );
    } else if (employeesError.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold w-100">
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold w-100">
          حدث خطأ، برجاء المحاولة مرة أخرى.
        </div>
      );
    }
  }

  return (
    <>
      <div className={`${styles.groupsContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/Users.png"}
            title={"جميع المستخدمين"}
            subTitle={"يمكنك متابعة جميع المستخدمين من هنا"}
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
                الإسم
              </div>
              <div
                className={`p-2 ${styles.filter} rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("phone_number");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                رقم الجوال
              </div>
              <div
                className={`p-2 ${styles.filter} rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("national_id");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                رقم العضوية
              </div>
              <div className={`p-2 rounded-2`}>
                <div>الوظيفة</div>
                <div className={`pe-3`}>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "S" }));
                      filter("role");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الوظيفة");
                    }}
                  >
                    مشرف عام
                  </div>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "A" }));
                      filter("role");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الوظيفة");
                    }}
                  >
                    محاسب
                  </div>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "T" }));
                      filter("role");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الوظيفة");
                    }}
                  >
                    مدرب
                  </div>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "R" }));
                      filter("role");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ الوظيفة");
                    }}
                  >
                    موظف استقبال
                  </div>
                </div>
              </div>
              <div className={`p-2 rounded-2`}>
                <div>النوع</div>
                <div className={`pe-3`}>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "M" }));
                      filter("gender");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ النوع");
                    }}
                  >
                    ذكر
                  </div>
                  <div
                    className={`p-2 rounded-2 ${styles.filter}`}
                    onClick={() => {
                      dispatch(searchR({ term: "F" }));
                      filter("gender");
                      setIsDisabled(true);
                      setPlaceHolder("انت الآن تبحث بـ النوع");
                    }}
                  >
                    أنثى
                  </div>
                </div>
              </div>
            </div>
          </Filter>
          <ComponentBtns
            btn1={"+ إضافة عضو لمجموعة"}
            onclick={() => {
              console.log("clicked");
              navigate("/Home/AddGroupMember");
            }}
          />
        </div>
        {isEmployeesFetching ? (
          <div
            className="d-flex justify-content-center align-items-center w-100 "
            style={{ height: "100vh", backgroundColor: "#373636" }}
          >
            <Commet color="#316dcc" size="medium" text="" textColor="" />
          </div>
        ) : emplyees?.data?.users?.length > 0 ? (
          <div
            className={`${styles.tableContainer} text-end ps-4 pe-4`}
            style={{ fontSize: "14px" }}
          >
            <table className="w-100">
              <thead className={`fw-bold`}>
                <th className={`p-2 pt-3 pb-3`}>#</th>
                <th className={`p-2 pt-3 pb-3`}>الإسم</th>
                <th className={`p-2 pt-3 pb-3`}>الجوال</th>
                <th className={`p-2 pt-3 pb-3`}>رقم العضوية</th>
                <th className={`p-2 pt-3 pb-3`}>تاريخ التسجيل</th>
                <th className={`p-2 pt-3 pb-3`}>النوع</th>
                <th className={`p-2 pt-3 pb-3`}>تاريخ الميلاد</th>
                <th className={`p-2 pt-3 pb-3`}>الوظيفة</th>
                <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
              </thead>
              <tbody>
                {emplyees?.data?.users?.map((item, index) => (
                  <UsersItem
                    key={index}
                    index={
                      emplyees?.data?.users?.indexOf(item) + (page - 1) * 5 + 1
                    }
                    item={item}
                  />
                ))}
              </tbody>
            </table>
            <div
              className={`d-flex justify-content-between align-items-center ${styles.pageBtn}`}
            >
              <MainButton
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                text={"السابق"}
                btnWidth="100px"
              />
              <p className={`m-0 text-light`}>
                صفحة {page} من {total_pages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                disabled={page === total_pages}
                text={"التالي"}
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

export default UsersContainer;
