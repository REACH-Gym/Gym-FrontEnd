import styles from "./TrainerSchedule.module.css";
const TrainerSchedule = ({ id, trainerSchedule }) => {
  // console.log(id, trainerSchedule);
  const schedules = trainerSchedule?.data.schedules.filter((e) => {
    return +id === +e.trainer.id;
  });
  console.log(schedules);
  return (
    <div className={`${styles.trainer}`}>
      <div className={`d-grid gap-3`}>
        <div className={`row`}>
          <div className={`col-4 text-center`}>
            <img
              src="/assets/image/Group 1000011667.png"
              className="w-100"
              style={{ maxWidth: "205px" }}
              alt="Logo"
            />
          </div>
          <div className={`col-2 d-flex justify-content-around`}>
            <span className="">
              <img
                src={"/assets/image/iconamoon_profile.png"}
                width={"24px"}
                alt={"Icon"}
              />
            </span>
            <div>
              <div className="fs-5 mb-2 fw-bold">اسم المدرب</div>
              <div className="fs-5">أيمن إيهاب</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-around`}>
            <span className="">
              <img
                src={"/assets/image/phone.png"}
                width={"24px"}
                alt={"Icon"}
              />
            </span>
            <div>
              <div className="fs-5 mb-2 fw-bold">رقم الجوال</div>
              <div className="fs-5">0123848234</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-around`}>
            <span className="">
              <img src={"/assets/image/date.png"} width={"24px"} alt={"Icon"} />
            </span>
            <div>
              <div className="fs-5 mb-2 fw-bold">تاريخ الإنشاء</div>
              <div className="fs-5">12/23/1223</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-around`}>
            <span className="">
              <img
                src={"/assets/image/iconamoon_profile.png"}
                width={"24px"}
                alt={"Icon"}
              />
            </span>
            <div>
              <div className="fs-5 mb-2 fw-bold">بواسطة</div>
              <div className="fs-5">أيمن إيهاب</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fs-4 fw-bold mt-4 mb-3 me-4`}>المواعيد</div>
      <div className="">
        <table className="w-100 fs-5">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم المجموعة</th>
              <th>السبت</th>
              <th>الأحد</th>
              <th>الإثنين</th>
              <th>الثلاثاء</th>
              <th>الأربعاء</th>
              <th>الخميس</th>
              <th>الجمعة</th>
              <th>الطاقة الحالية</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {schedules?.map((schedule, index) => (
              <tr className={`${styles.scheduleRow}`}>
                <td>{index + 1}</td>
                <td>{schedule.session.name}</td>
                <td>{schedule.saturday ?? "-"}</td>
                <td>{schedule.sunday ?? "-"}</td>
                <td>{schedule.monday ?? "-"}</td>
                <td>{schedule.tuesday ?? "-"}</td>
                <td>{schedule.wednesday ?? "-"}</td>
                <td>{schedule.thursday ?? "-"}</td>
                <td>{schedule.friday ?? "-"}</td>
                <td>{schedule.max_capacity}</td>
                <td>---</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerSchedule;
