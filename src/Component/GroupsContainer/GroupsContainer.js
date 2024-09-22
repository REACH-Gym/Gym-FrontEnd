import { useEffect, useState } from "react";
import { useGetGroupsMembersQuery } from "../../features/api";
import GroupsItem from "../GroupsContainerItem/GroupsItem";
import styles from "./GroupsContainer.module.css";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";

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
    <div className={`${styles.groupsContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/groups.png"}
          title={"جميع المجموعات"}
          subTitle={"يمكنك متابعة جميع المجموعات المحفوظة"}
        />
        <Filter />
        <ComponentBtns btn1={"+ إضافة مجموهة جديدة "} />
      </div>
      {!isGroupsMembersFetching ? (
        <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
          <table className="w-100">
            <thead className={`fw-bold`}>
              <th className={`p-2 pt-3 pb-3`}>#</th>
              <th className={`p-2 pt-3 pb-3`}>الإسم</th>
              <th className={`p-2 pt-3 pb-3`}>السعر</th>
              <th className={`p-2 pt-3 pb-3`}>الخصم(%)</th>
              <th className={`p-2 pt-3 pb-3`}>المدة</th>
              <th className={`p-2 pt-3 pb-3`}>عدد مرات الحجز</th>
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
  );
};

export default GroupsContainer;
