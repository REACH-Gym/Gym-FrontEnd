import styles from "./UsersContainer.module.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useEffect, useState } from "react";
import { useGetEmployeesQuery } from "../../features/api";
import UsersItem from "../UsersItem/UsersItem";
import { Commet } from "react-loading-indicators";

const UsersContainer = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  // function decodeJWT(token) {
  //   const parts = token?.split(".");
  //   if (parts?.length !== 3) {
  //     throw new Error("JWT must have 3 parts");
  //   }
  //   const payload = parts[1];
  //   const decodedPayload = JSON.parse(
  //     atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  //   );
  //   return decodedPayload;
  // }
  // const decodedToken = decodeJWT(localStorage.getItem("access"));
  // const userId = decodedToken.user_id;
  const {
    data: emplyees,
    isFetching: isEmployeesLoading,
    error: employeesError,
  } = useGetEmployeesQuery(`?page=${page}&per_page=20`);

  const [total_pages, setTotalPages] = useState(0);
  useEffect(() => {
    if (emplyees) {
      setTotalPages(emplyees?.data?.meta?.total_pages);
    }
  }, [emplyees]);

  if (isEmployeesLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (employeesError) {
    if (employeesError.status === 403) {
      return (
        <div className="d-flex justify-content-center align-items-center text-danger fs-3 fw-bold w-100">
          ليس صلاحية الوصول لهذه الصفحة.
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
            query={"employee"}
            options={["اسم المستخدم"]}
            searchResults={setResults}
            status={false}
          />
          <ComponentBtns
            btn1={"+ إضافة عضو لمجموعة"}
            onclick={() => {
              console.log("clicked");
              navigate("/Home/AddGroupMember");
            }}
          />
        </div>
        {results?.data?.users?.length > 0 ? (
          <div className={` ${styles.tableContainer} text-end ps-4 pe-4`}>
            <table className="w-100">
              <thead>
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {results?.data?.users?.map((item, index) => (
                  <UsersItem key={index} index={index + 1} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
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
                text={"<<"}
                btnWidth="100px"
              />
              <p className={`m-0`}>
                صفحة {page} من {total_pages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                disabled={page === total_pages}
                text={">>"}
                btnWidth="100px"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersContainer;
