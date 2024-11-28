import styles from "./OffersItem.module.css";
import { useMarkOfferAsFinishedMutation } from "../../features/api";
import { useState } from "react";
import Warning from "../../Common Components/Warning/Warning";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import { Active, Expired } from "../Status/Status";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const OffersItem = ({ index, session }) => {
  const [popup, setPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [markOfferAsFinished, { isLoading: isDeleteLoading }] =
    useMarkOfferAsFinishedMutation();

  const handleDeactivate = async () => {
    try {
      const response = await markOfferAsFinished(session.id).unwrap();
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
      {success && <Success text={"تم تعطيل العرض بنجاح."} />}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      {popup && (
        <Warning
          text={"هل تريد تعطيل هذا العرض؟"}
          handleCancel={() => {
            setPopup(false);
          }}
          handleConfirm={handleDeactivate}
          isLoading={isDeleteLoading}
        />
      )}
      <tr className={`${styles.tableRow}`}>
        <td className="table-column p-2">{index}</td>
        <td className="table-column p-2">{session.user.name}</td>
        <td className="table-column p-2">{session.free_days}</td>
        <td className="table-column p-2">
          {new Date(session.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: true,
          })}
        </td>
        <td className="table-column p-2">
          {session.is_active ? <Active /> : <Expired />}
        </td>
        {session.is_active && (
          <td className="table-column p-2 text-center">
            <button
              className={`${styles.cancelButton}`}
              onClick={() => {
                setPopup(true);
              }}
            >
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
              تعطيل
            </button>
          </td>
        )}
      </tr>
    </>
  );
};

export default OffersItem;
