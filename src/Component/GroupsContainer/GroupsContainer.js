import { useEffect, useState } from "react";
import { useGetGroupsMembersQuery } from "../../features/api";
import ContentContainer from "../ContentContainer/ContentContainer";
import GroupsItem from "../GroupsItem/GroupsItem";
import styles from "./GroupsContainer.module.css";
import MainButton from "../../Common Components/Main Button/MainButton";

// Groups table container and header
const GroupsContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: groupsMembers,
    isFetching: isGroupsMembersFetching,
    error: groupsMembersError,
  } = useGetGroupsMembersQuery(
    `?exclude[]=admin.*&exclude[]=schedule.*&exclude[]=schedule.session.*&exclude[]=schedule.trainer.*&exclude[]=user.*&include[]=schedule.session.name&include[]=schedule.trainer.name&include[]=user.name&page=${page}&per_page=10&sort[]=-id`
  );
  console.log(groupsMembers);
  useEffect(() => {
    setTotalPages(groupsMembers?.data.meta?.total_pages);
    console.log(groupsMembers?.data.meta?.total_pages);
  }, [groupsMembers]);

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
    <ContentContainer
      title={"جميع المجموعات"}
      desc={"يمكنك متابعة جميع المجموعات المحفوظة"}
      mainIcon={"/assets/image/groups.png"}
      btn1={"إضافة مجموعة جديدة"}
      btn2={"disabled"}
    >
      {!isGroupsMembersFetching ? (
        <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
          <table className="w-100">
            <thead className={`fw-bold`}>
              <th className={`p-2 pt-3 pb-3`}>#</th>
              <th className={`p-2 pt-3 pb-3`}>الإسم</th>
              <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
              <th className={`p-2 pt-3 pb-3`}>المدرب</th>
              <th className={`p-2 pt-3 pb-3`}>الحالة</th>
              <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
            </thead>
            <tbody>
              {groupsMembers?.data.user_sessions.map((item, index) => (
                <GroupsItem
                  key={index}
                  inedx={
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
            />
            <p className={`m-0`}>
              صفحة {page} من {totalPages}
            </p>
            <MainButton
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              text={">>"}
            />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </ContentContainer>
  );
};

export default GroupsContainer;
