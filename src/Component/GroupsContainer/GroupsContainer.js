import { Link } from "react-router-dom";
import { useGetMembersSessionsQuery } from "../../features/api";
import ContentContainer from "../ContentContainer/ContentContainer";
import GroupsItem from "../GroupsContainerItem/GroupsItem";
import styles from "./GroupsContainer.module.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
const row = {
  num: 1,
  name: "Ahmed",
  price: "170",
  notes: "10",
  duration: "10",
};
// Groups table container and header
const GroupsContainer = () => {
  const {
    data: members,
    isLoading: isMembersSessionsLoading,
    error: membersSessionsError,
  } = useGetMembersSessionsQuery(
    "?exclude[]=admin.*&exclude[]=schedule.*&exclude[]=schedule.session.*&exclude[]=schedule.trainer.*&exclude[]=user.*&include[]=user.name&include[]=schedule.session.name&include[]=schedule.trainer.name"
  );

  console.log(members);

  if (membersSessionsError) {
    return (
      <div className="text-center mt-5">
        <h3>حدث خطأ، حاول مجدداً</h3>
      </div>
    );
  }

  if (isMembersSessionsLoading) {
    return (
      <div className="text-center d-flex justify-content-center align-items-center">
        جاري التحميل...
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
      <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <th className={`p-2 pt-3 pb-3`}>#</th>
            <th className={`p-2 pt-3 pb-3`}>الإسم</th>
            <th className={`p-2 pt-3 pb-3`}>السعر</th>
            <th className={`p-2 pt-3 pb-3`}>المدة</th>
            <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
            <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
          </thead>
          <tbody>
            <GroupsItem {...members} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupsContainer;
