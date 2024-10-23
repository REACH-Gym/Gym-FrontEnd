import { useEffect, useState } from "react";
import { useGetGroupsMembersQuery } from "../../features/api";
import GroupsItem from "../GroupsContainerItem/GroupsItem";
import styles from "./GroupsContainer.module.css";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";

// Groups table container and header
const GroupsContainer = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: groupsMembers,
    isFetching: isGroupsMembersFetching,
    error: groupsMembersError,
  } = useGetGroupsMembersQuery(
    `?exclude[]=admin.*&exclude[]=schedule.*&exclude[]=schedule.session.*&exclude[]=schedule.trainer.*&exclude[]=user.*&include[]=schedule.session.name&include[]=schedule.trainer.name&include[]=user.name&page=${page}&per_page=20&sort[]=-id`
  );
  console.log(groupsMembers);
  useEffect(() => {
    setTotalPages(groupsMembers?.data.meta?.total_pages);
  }, [groupsMembers]);

  if (isGroupsMembersFetching) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (groupsMembersError) {
    if (groupsMembersError?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (groupsMembersError?.status === 401) {
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
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      <div className={`${styles.groupsContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/groups.png"}
            title={"أعضاء المجموعات"}
            subTitle={"يمكنك متابعة جميع المجموعات المحفوظة"}
          />
          <Filter
            query={"members/sessions/"}
            options={["اسم المستخدم", "المجموعة", "اسم المدرب"]}
            searchResults={setResults}
            eStatus={false}
          />
          <ComponentBtns
            btn1={"+ إضافة عضو لمجموعة"}
            onclick={() => {
              console.log("clicked");
              navigate("/Home/AddGroupMember");
            }}
          />
        </div>
        {results?.data?.user_sessions?.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
            style={{ color: "red", height: "60vh" }}
          >
            لم يتم العثور علي نتائج مطابقة
          </div>
        ) : results?.data?.user_sessions?.length > 0 ? (
          <div className={` ${styles.tableContainer} text-end ps-4 pe-4`}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className={`p-2 pt-3 pb-3`}>#</th>
                  <th className={`p-2 pt-3 pb-3`}>الإسم</th>
                  <th className={`p-2 pt-3 pb-3`}>اسم المجموعة</th>
                  <th className={`p-2 pt-3 pb-3`}>المدرب</th>
                  <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                  <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {results?.data?.user_sessions?.map((item, index) => (
                  <GroupsItem key={index} index={index + 1} item={item} />
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
                <th className={`p-2 pt-3 pb-3`}>اسم المجموعة</th>
                <th className={`p-2 pt-3 pb-3`}>المدرب</th>
                <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
              </thead>
              <tbody>
                {groupsMembers?.data.user_sessions.map((item, index) => (
                  <GroupsItem
                    key={index}
                    index={
                      groupsMembers?.data.user_sessions.indexOf(item) +
                      (page - 1) * 5 +
                      1
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
              <p className={`m-0`}>
                صفحة {page} من {totalPages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                text={"التالي"}
                btnWidth="100px"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupsContainer;
