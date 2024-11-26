import { useNavigate } from "react-router-dom";
import styles from "./RequestItem.module.css";
import { usePatchSessionMutation } from "../../features/api";
import { useRef, useState } from "react";
import Warning from "../../Common Components/Warning/Warning";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import { Active, Deleted } from "../Status/Status";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const RequestItem = ({ index, session, requests = true, handleClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [popup, setPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // const options = useRef(null);
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
  const navigate = useNavigate();
  const [deleteSession, { isLoading: isDeleteLoading }] =
    usePatchSessionMutation();

  const handleCancel = () => {
    setPopup(false);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteSession({
        id: session.id,
        data: { is_active: false },
      }).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
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
      const response = await deleteSession({
        id: session.id,
        data: { is_active: true },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
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
  return (
    <>
      {success && (
        <Success
          text={session.is_active ? "تم حذف المجموعة." : "تم تفعيل المجموعة."}
        />
      )}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      {popup && (
        <Warning
          text={
            session.is_active
              ? "هل تريد حذف هذه المجموعة بالكامل؟"
              : "هل تريد تفعيل هذه المجموعة؟"
          }
          handleCancel={handleCancel}
          handleConfirm={session.is_active ? handleDelete : handleActivate}
          isLoading={isDeleteLoading}
        />
      )}
      <tr className={`${styles.tableRow}`}>
        <td className="table-column p-2">{index}</td>
        <td className="table-column p-2">{session.name}</td>
        <td className="table-column p-2">{session.price}</td>
        <td className="table-column p-2">{session.duration}</td>
        <td className="table-column p-2">{session.freeze_duration}</td>
        <td className="table-column p-2">{session.freeze_duration}</td>
        {requests ? (
          <td className="table-column p-2 text-center">
            <button className={`${styles.cancelButton}`} onClick={handleClick}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8306 0.219191C11.5703 -0.0411625 11.1482 -0.0411625 10.8878 0.219191L6.0249 5.08212L1.162 0.219191C0.901651 -0.0411625 0.479537 -0.0411625 0.219191 0.219191C-0.0411626 0.479537 -0.0411626 0.901651 0.219191 1.162L5.0821 6.02492L0.219204 10.8878C-0.0411492 11.1482 -0.0411492 11.5703 0.219204 11.8307C0.479551 12.091 0.901664 12.091 1.16201 11.8307L6.0249 6.96772L10.8878 11.8307C11.1482 12.091 11.5703 12.091 11.8306 11.8307C12.091 11.5703 12.091 11.1482 11.8306 10.8878L6.9677 6.02492L11.8306 1.162C12.091 0.901651 12.091 0.479537 11.8306 0.219191Z"
                  fill="#FAFAFA"
                />
              </svg>
              {"    "}
              رفض
            </button>
          </td>
        ) : (
          <td className="table-column p-2 text-center">
            <button className={`${styles.acceptButton}`} onClick={handleClick}>
              <svg
                width="20"
                height="12"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.33333L4.33333 8L9.33333 1"
                  stroke="#FAFAFA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {"  "}
              قبول
            </button>
          </td>
        )}
        {/* <td
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
            <div className={`${styles.subMenu}`}>
              {session.is_active ? (
                <>
                  <div
                    className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                    onClick={() => {
                      navigate(`/Home/SessionDetails/${session.id}/`);
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
                        d="M5.25 3V3.75H3V3H5.25ZM3 5.25V4.5H5.25V5.25H3ZM3 6.75V6H4.5V6.75H3ZM2.25 3V3.75H1.5V3H2.25ZM2.25 4.5V5.25H1.5V4.5H2.25ZM1.5 6.75V6H2.25V6.75H1.5ZM0.75 0.75V11.25H4.5V12H0V0H6.5332L9.75 3.2168V4.5H9V3.75H6V0.75H0.75ZM6.75 1.2832V3H8.4668L6.75 1.2832ZM10.5 6H12V12H5.25V6H6.75V5.25H7.5V6H9.75V5.25H10.5V6ZM11.25 11.25V8.25H6V11.25H11.25ZM11.25 7.5V6.75H6V7.5H11.25Z"
                        fill="white"
                      />
                    </svg>
                    <div className={`d-inline-block`}>التفاصيل</div>
                  </div>
                  <div
                    className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                    onClick={() => {
                      navigate(`/Home/EditGroup/${session.id}/`);
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
                </>
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
        </td> */}
      </tr>
    </>
  );
};

export default RequestItem;
