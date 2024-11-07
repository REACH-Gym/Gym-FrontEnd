import { useNavigate } from "react-router-dom";
import styles from "./TrainerSchedule.module.css";
import { usePatchScheduleMutation } from "../../features/api";
import { useRef, useState } from "react";
import { Active, Deleted } from "../Status/Status";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import Warning from "../../Common Components/Warning/Warning";

const TrainerScheduleItem = ({ index, schedule }) => {
  const navigate = useNavigate();
  const [deleteSchedule, { isLoading: isDeleteLoading }] =
    usePatchScheduleMutation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteSchedule({
        id: schedule.id,
        data: { is_active: false },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
    setPopup(false);
  };
  const handleActivate = async () => {
    try {
      const response = await deleteSchedule({
        id: schedule.id,
        data: { is_active: true },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
    setPopup(false);
  };
  const [showOptions, setShowOptions] = useState(false);
  const options = useRef(null);
  const handleOptions = () => {
    document.addEventListener("click", (e) => {
      console.log(e.target);
      if (!e.target.classList.contains(`tableColumn${index}`)) {
        setShowOptions(false);
        document.removeEventListener("click", handleOptions);
      } else {
        setShowOptions(true);
        document.removeEventListener("click", handleOptions);
      }
    });
  };
  return (
    <>
      {success && (
        <Success
          text={schedule.is_active ? "تم حذف الموعد." : "تم تفعيل الموعد."}
        />
      )}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      {popup && (
        <Warning
          text={
            schedule.is_active
              ? "هل تريد حذف هذا الموعد؟"
              : "هل تريد تفعيل هذا الموعد؟"
          }
          handleCancel={() => {
            setPopup(false);
          }}
          handleConfirm={schedule.is_active ? handleDelete : handleActivate}
          isLoading={isDeleteLoading}
        />
      )}
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
        <td>{schedule.is_active === false ? <Deleted /> : <Active />}</td>
        <td>{schedule.max_capacity}</td>
        <td
          className={`${styles.tableColumn} tableColumn${index} position-relative p-2 p-2`}
          onClick={handleOptions}
        >
          <span></span>
          <span></span>
          <span></span>
          <div
            className={`${showOptions ? "d-block" : "d-none"}`}
            ref={options}
          >
            <div className={`${styles.subMenu} `}>
              {schedule.is_active ? (
                <>
                  <div
                    className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                    onClick={() => {
                      navigate(`/Home/EditSchedule/${schedule.id}/`);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ alignSelf: "center" }}
                    >
                      <path
                        d="M3.5 8.50645L5.7065 8.49895L10.5225 3.72895C10.7115 3.53995 10.8155 3.28895 10.8155 3.02195C10.8155 2.75495 10.7115 2.50395 10.5225 2.31495L9.7295 1.52195C9.3515 1.14395 8.692 1.14595 8.317 1.52045L3.5 6.29145V8.50645ZM9.0225 2.22895L9.817 3.02045L9.0185 3.81145L8.2255 3.01895L9.0225 2.22895ZM4.5 6.70845L7.515 3.72195L8.308 4.51495L5.2935 7.50045L4.5 7.50295V6.70845Z"
                        fill="white"
                      />
                      <path
                        d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                        fill="white"
                      />
                    </svg>

                    <div className={`d-inline-block`}>تعديل</div>
                  </div>
                </>
              ) : null}
              {schedule.is_active ? (
                <div
                  className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ alignSelf: "center" }}
                  >
                    <path
                      d="M3 9.5C3 9.76522 3.10536 10.0196 3.29289 10.2071C3.48043 10.3946 3.73478 10.5 4 10.5H8C8.26522 10.5 8.51957 10.3946 8.70711 10.2071C8.89464 10.0196 9 9.76522 9 9.5V3.5H3V9.5ZM4 4.5H8V9.5H4V4.5ZM7.75 2L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75Z"
                      fill="white"
                    />
                  </svg>
                  <div className={`d-inline-block`}>حذف</div>
                </div>
              ) : (
                <div
                  className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ alignSelf: "center" }}
                  >
                    <path
                      d="M12 2.84952C17.0537 2.84952 21.1505 6.94634 21.1505 12C21.1505 17.0537 17.0537 21.1505 12 21.1505C6.94631 21.1505 2.84949 17.0537 2.84949 12C2.84949 6.94634 6.94631 2.84952 12 2.84952Z"
                      stroke="white"
                      stroke-width="1.69905"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11.085 14.7452L9.25489 12.9151C8.74953 12.4097 8.74953 11.5903 9.25489 11.0849L11.085 9.25485C11.5904 8.74948 12.4097 8.74948 12.9151 9.25485L14.7452 11.0849C15.2506 11.5903 15.2506 12.4097 14.7452 12.9151L12.9151 14.7452C12.4097 15.2505 11.5904 15.2505 11.085 14.7452Z"
                      stroke="white"
                      stroke-width="1.69905"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div className={`d-inline-block`}>تفعيل</div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

const TrainerSchedule = ({ id, trainerSchedule }) => {
  // console.log(id, trainerSchedule);
  const schedules = trainerSchedule?.data?.data?.schedules?.filter((e) => {
    return +id === +e.trainer.id;
  });
  console.log(schedules);
  return (
    <div className={`${styles.trainer}`}>
      <div className={`d-grid gap-3`}>
        <div className={`row text-light`}>
          <div className={`col-4 text-center`}>
            <img
              src="/assets/image/Group 1000011864.png"
              className="w-75 d-block"
              style={{ padding: "6px" }}
              width={"50px"}
              height={"60px"}
              alt="Logo"
            />
          </div>
          <div
            className={`col-2 d-flex justify-content-start gap-3 text-light `}
          >
            <span className="">
              <img
                src={"/assets/image/Group.png"}
                width={"24px"}
                alt={"Icon"}
              />
            </span>
            <div className="me-2 text-light">
              <div className="mb-2 fw-bold">اسم المدرب</div>
              <div className="">{schedules[0]?.trainer?.name}</div>
            </div>
          </div>
          <div
            className={`col-2 d-flex justify-content-start gap-3 text-light`}
          >
            <span className="">
              <img src={"/assets/image/img1.png"} width={"24px"} alt={"Icon"} />
            </span>
            <div className="me-2">
              <div className="mb-2 fw-bold">رقم الجوال</div>
              <div className="">{schedules[0]?.trainer?.phone_number}</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-start gap-3`}>
            <span className="">
              <img src={"/assets/image/img2.png"} width={"24px"} alt={"Icon"} />
            </span>
            <div className="me-2">
              <div className="mb-2 fw-bold">تاريخ الإنشاء</div>
              <div className="">{schedules[0].session.created_at}</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-start gap-3`}>
            <span className="">
              <img
                src={"/assets/image/Group.png"}
                width={"24px"}
                alt={"Icon"}
              />
            </span>
            <div className="me-2">
              <div className="mb-2 fw-bold">بواسطة</div>
              <div className="">المشرف</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fs-4 fw-bold mt-4 mb-5 me-4 text-light`}>المواعيد</div>
      <div className="">
        <table className="w-100">
          <thead>
            <tr className="text-light">
              <th>#</th>
              <th>اسم المجموعة</th>
              <th>السبت</th>
              <th>الأحد</th>
              <th>الإثنين</th>
              <th>الثلاثاء</th>
              <th>الأربعاء</th>
              <th>الخميس</th>
              <th>الجمعة</th>
              <th>الحالة</th>
              <th>الطاقة الحالية</th>
              <th className="text-center">خيارات</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {schedules?.map((schedule, index) => (
              <TrainerScheduleItem
                key={index}
                index={index}
                schedule={schedule}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerSchedule;
