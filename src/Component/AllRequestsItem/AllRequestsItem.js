import { useNavigate } from "react-router-dom";
import styles from "./AllRequestsItem.module.css";
import { usePatchSessionMutation } from "../../features/api";
import { useRef, useState } from "react";
import Warning from "../../Common Components/Warning/Warning";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import { Active, Deleted } from "../Status/Status";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const AllRequestItem = ({ index, session }) => {
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

  const handleClick = (id) => {
    navigate(`/Home/RequestDetails/${id}`);
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
        <td
          className="table-column p-2"
          onClick={() => {
            handleClick(2);
          }}
        >
          {session.name}
        </td>
        <td className="table-column p-2">{session.price}</td>
        <td className="table-column p-2">{session.duration}</td>
        <td className="table-column p-2">{session.freeze_duration}</td>
        <td className="table-column p-2">{session.freeze_duration}</td>
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
            <div className={`${styles.subMenu}`}>
              <div
                className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                onClick={() => {}}
              >
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ alignSelf: "center" }}
                >
                  <path
                    d="M1 5.33333L4.33333 8L9.33333 1"
                    stroke="#228151"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className={`d-inline-block fw-bold`}
                  style={{ color: "#228151" }}
                >
                  قبول
                </div>
              </div>
              <div
                className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                onClick={() => {}}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ alignSelf: "center" }}
                >
                  <path
                    d="M11.8306 0.219191C11.5703 -0.0411625 11.1482 -0.0411625 10.8878 0.219191L6.0249 5.08212L1.162 0.219191C0.901651 -0.0411625 0.479537 -0.0411625 0.219191 0.219191C-0.0411626 0.479537 -0.0411626 0.901651 0.219191 1.162L5.0821 6.02492L0.219204 10.8878C-0.0411492 11.1482 -0.0411492 11.5703 0.219204 11.8307C0.479551 12.091 0.901664 12.091 1.16201 11.8307L6.0249 6.96772L10.8878 11.8307C11.1482 12.091 11.5703 12.091 11.8306 11.8307C12.091 11.5703 12.091 11.1482 11.8306 10.8878L6.9677 6.02492L11.8306 1.162C12.091 0.901651 12.091 0.479537 11.8306 0.219191Z"
                    fill="#e06969"
                  />
                </svg>
                <div
                  className={`d-inline-block fw-bold`}
                  style={{ color: "#e06969" }}
                >
                  رفض
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default AllRequestItem;
