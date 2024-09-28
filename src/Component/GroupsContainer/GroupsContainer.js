import { useEffect, useState } from "react";
import { useGetGroupsMembersQuery } from "../../features/api";
import GroupsItem from "../GroupsContainerItem/GroupsItem";
import styles from "./GroupsContainer.module.css";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";

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
    console.log(groupsMembers?.data.meta?.total_pages);
  }, [groupsMembers]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  if (isGroupsMembersFetching) {
    return (
      <div
        className={`fs-3 fw-bold text-primary d-flex justify-content-center align-items-center`}
      >
        جاري التحميل...
      </div>
    );
  }

  if (groupsMembersError) {
    return (
      <div
        className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
      >
        حدث خطأ، برجاء المحاولة مرة أخرى.
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.groupsContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/groups.png"}
            title={"جميع المجموعات"}
            subTitle={"يمكنك متابعة جميع المجموعات المحفوظة"}
          />
          <Filter
            query={"members/sessions/"}
            options={["اسم المستخدم", "المجموعة", "اسم المدرب"]}
            searchResults={setResults}
          />
          <ComponentBtns
            btn1={"+ إضافة عضو لمجموعة"}
            onclick={() => {
              console.log("clicked");
              navigate("/Home/AddGroupMember");
            }}
          />
        </div>
        {!isGroupsMembersFetching ? (
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
                text={"<<"}
                btnWidth="100px"
              />
              <p className={`m-0`}>
                صفحة {page} من {totalPages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                text={">>"}
                btnWidth="100px"
              />
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
      <div
        className={`p-3 ${
          results?.user_sessions?.length > 0 ? "position-fixed" : "d-none"
        }`}
        style={{
          width: "calc(100% - 265px)",
          margin: "0 0 0 10px",
          borderRadius: "25px",
          zIndex: "9999",
          height: "calc(100vh - 180px)",
          backgroundColor: "white",
          overflowY: "auto",
          bottom: 0,
          left: 0,
        }}
      >
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
            {results?.user_sessions?.map((item, index) => (
              <GroupsItem key={index} index={index + 1} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GroupsContainer;
