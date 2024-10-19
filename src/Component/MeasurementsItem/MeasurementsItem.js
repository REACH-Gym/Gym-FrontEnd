import { useState } from "react";
import { useDeleteMeasurementMutation } from "../../features/api";
import styles from "./MeasurementsItem.module.css";
import Warning from "../../Common Components/Warning/Warning";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const MeasurementsItem = ({ index, item }) => {
  const [popup, setPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [
    deleteMeasurement,
    { isError: isDeleteError, isLoading: isDeleteLoading },
  ] = useDeleteMeasurementMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteMeasurement(item.id).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 300);
    } catch (err) {
      console.error(err);
      if (error.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
      } else if (error.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
      }
    }
    setPopup(false);
  };

  const [showOptions, setShowOptions] = useState(false);
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
      {success && <Success text={"تم حذف القياس بنجاح."} show={success} />}
      {isDeleteError && (
        <Error text={"حدث خطأ، برجاء المحاولة لاحقاً."} show={isDeleteError} />
      )}
      {popup && (
        <Warning
          text={"هل تريد حذف هذا القياس؟"}
          handleCancel={() => {
            setPopup(false);
          }}
          handleConfirm={handleDelete}
          isLoading={isDeleteLoading}
        />
      )}
      <tr className={`${styles.tableRow}`}>
        <td className="table-column p-2">{index}</td>
        <td className="table-column p-2">{item.name}</td>
        <td className="table-column p-2">{item.month}</td>
        <td className="table-column p-2">{item.height}</td>
        <td className="table-column p-2">{item.weight}</td>
        <td className="table-column p-2">{item.month}</td>
        <td
          className={`${styles.tableColumn} tableColumn${index} position-relative p-2 p-2`}
          onClick={handleOptions}
        >
          <span></span>
          <span></span>
          <span></span>
          <div className={`${showOptions ? "d-block" : "d-none"}`}>
            <div className={`${styles.subMenu}`}>
              {/* <div
            className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
            onClick={() => {}}
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
              fill="#4F4F4F"
              />
            </svg>
            <div className={`d-inline-block`}>التفاصيل</div>
            </div>
          <div
            className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
            onClick={() => {}}
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
              fill="#4F4F4F"
              />
              <path
              d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                fill="#4F4F4F"
              />
              </svg>
              
              <div className={`d-inline-block`}>تعديل</div>
              </div> */}
              <div
                className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                onClick={() => setPopup(true)}
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
                    fill="#4F4F4F"
                  />
                </svg>
                <div className={`d-inline-block`}>حذف</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MeasurementsItem;
