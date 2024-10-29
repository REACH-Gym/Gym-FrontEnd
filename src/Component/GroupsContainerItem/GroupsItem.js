import styles from "./GroupsItem.module.css";
import { Active, AlmostOver, Expired, Freezed } from "../Status/Status";
import Warning from "../../Common Components/Warning/Warning";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  useEditMemberSessionStartDateMutation,
  useFreezeMemberSessionMutation,
  useSendDetailsMutation,
  useUnFreezeMemberSessionMutation,
} from "../../features/api";
import Success from "../../Common Components/Success/Success";
import Error from "../../Common Components/Error/Error";
import { Commet } from "react-loading-indicators";
import FreezeBox from "../FreezeBox/FreezeBox";

// Measurements table item
// props --> object that has: number of the row, member name, measurement date, height, register date
const GroupsItem = ({ index, item }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showChangeDate, setShowChangeDate] = useState(false);
  const [showFreeze, setShowFreeze] = useState(false);
  const options = useRef(null);
  const [editStartDate, { isLoading: isEditStartDateLoading }] =
    useEditMemberSessionStartDateMutation();
  const [freeze, { isLoading: isFreezeLoading }] =
    useFreezeMemberSessionMutation();
  const [unFreeze, { isLoading: isUnFreezeLoading }] =
    useUnFreezeMemberSessionMutation();
  const [date, setDate] = useState("");

  const handleEdit = async (start_date) => {
    console.log(start_date);
    if (showFreeze) {
      if (item.status === "freezed") {
        try {
          const response = await unFreeze(item.id).unwrap();
          console.log(response);
          setShowFreeze(false);
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
            setSuccess(false);
          }, 2000);
        } catch (error) {
          if (
            error.data.error.detail.startsWith(
              "You cannot update the start date"
            )
          ) {
            setShowFreeze(false);
            setError(
              "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
            );
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (error.originalStatus === 403) {
            setShowFreeze(false);
            setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (error.originalStatus === 401) {
            setShowFreeze(false);
            setError("قم بتسجيل الدخول وحاول مرة أخرى.");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else {
            setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
            setShowFreeze(false);
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        }
      } else {
        try {
          const response = await freeze({
            id: item.id,
            data: { freezed_date: start_date },
          }).unwrap();
          console.log(response);
          setShowFreeze(false);
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
            setSuccess(false);
          }, 2000);
        } catch (error) {
          if (
            error?.data?.error?.detail?.startsWith(
              "The period exceeds allowed freezing days."
            )
          ) {
            setShowFreeze(false);
            setError("المدة تخطت ايام التجميد المسموح بها، اختر تاريخاً أٌقرب");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (
            error?.data?.error?.detail?.startsWith(
              "You cannot update the start date"
            )
          ) {
            setShowFreeze(false);
            setError(
              "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
            );
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (error.originalStatus === 403) {
            setShowFreeze(false);
            setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else if (error.originalStatus === 401) {
            setShowFreeze(false);
            setError("قم بتسجيل الدخول وحاول مرة أخرى.");
            setTimeout(() => {
              setError("");
            }, 3000);
          } else {
            setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
            setShowFreeze(false);
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        }
      }
    } else if (showChangeDate) {
      try {
        const response = await editStartDate({
          id: item.id,
          data: { start_date: start_date },
        }).unwrap();
        console.log(response);
        setShowChangeDate(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setSuccess(false);
        }, 2000);
      } catch (error) {
        if (
          error.data.error.detail.startsWith("You cannot update the start date")
        ) {
          setShowChangeDate(false);
          setError(
            "لا يمكنك تعديل الإشتراك لأنه بدأ بالفعل، ولكن يمكنك تجميده"
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 403) {
          setShowChangeDate(false);
          setError("ليس لديك الصلاحية لتغيير تاريخ البداية.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (error.originalStatus === 401) {
          setShowChangeDate(false);
          setError("قم بتسجيل الدخول وحاول مرة أخرى.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
          setShowChangeDate(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    }
  };
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
  const [sendDetails, { isLoading: isSendDetailsLoading }] =
    useSendDetailsMutation();
  const handleSendDetails = async () => {
    try {
      const response = await sendDetails({ session_id: item.id }).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } catch (error) {
      if (error.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (error.originalStatus === 401) {
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
  };

  return (
    <>
      {isSendDetailsLoading && (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ height: "100vh" }}
        >
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      )}
      {success && (
        <Success text={"تم تعديل بيانات المجموعة بنجاح"} show={success} />
      )}
      {error.length > 0 && <Error text={error} show={error.length > 0} />}
      {showFreeze && item.status === "freezed" ? (
        <Warning
          text={"هل تريد إلغاء التجميد؟"}
          handleCancel={() => {
            setShowFreeze(false);
          }}
          handleConfirm={() => {
            handleEdit(date);
          }}
          isLoading={isUnFreezeLoading}
        />
      ) : null}
      {showChangeDate || (showFreeze && item.status !== "freezed") ? (
        <FreezeBox
          text={showChangeDate ? "تعديل تاريخ البداية" : "تجميد الإشتراك"}
          desc={"من فضلك قم بإدخال تاريخ البداية الجديد"}
          handleCancel={() => {
            showFreeze ? setShowFreeze(false) : setShowChangeDate(false);
          }}
          handleConfirm={() => {
            handleEdit(date);
          }}
          isLoading={
            isEditStartDateLoading || isFreezeLoading || isUnFreezeLoading
          }
          dateValue={setDate}
        />
      ) : null}
      <tr className={`${styles.tableRow}`}>
        <td className="table-column p-2">{index}</td>
        <td className="table-column p-2">{item.user.name}</td>
        <td className="table-column p-2">{item.schedule.session.name}</td>
        <td className="table-column p-2">{item.schedule.trainer.name}</td>
        <td className="table-column p-2">{item.paid_money} ريال</td>
        <td className="table-column p-2">{item.start_date}</td>
        <td className="table-column p-2">
          {item.status === "active" ? <Active /> : null}
          {item.status === "expired" ? <Expired /> : null}
          {item.status === "freezed" ? <Freezed /> : null}
          {item.status === "almost over" ? <AlmostOver /> : null}
        </td>
        <td
          className={`${styles.tableColumn} tableColumn${index} position-relative p-2`}
          onClick={handleOptions}
        >
          <span></span>
          <span></span>
          <span></span>
          <div
            className={`${styles.subMenu} ${
              showOptions ? "d-block" : "d-none"
            }`}
            ref={options}
          >
            <div
              className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
              onClick={() => {
                navigate(`/Home/GroupMemberMembership/${item.id}/`);
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
                  fill="#4F4F4F"
                />
              </svg>

              <div className={`d-inline-block`}>التفاصيل</div>
            </div>
            {item.status === "freezed" ? (
              <div
                className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                onClick={() => {
                  setShowFreeze(true);
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
                    stroke="#1C1C1C"
                    stroke-width="1.69905"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.085 14.7452L9.25489 12.9151C8.74953 12.4097 8.74953 11.5903 9.25489 11.0849L11.085 9.25485C11.5904 8.74948 12.4097 8.74948 12.9151 9.25485L14.7452 11.0849C15.2506 11.5903 15.2506 12.4097 14.7452 12.9151L12.9151 14.7452C12.4097 15.2505 11.5904 15.2505 11.085 14.7452Z"
                    stroke="#1C1C1C"
                    stroke-width="1.69905"
                    stroke-linecap="round"
                  />
                </svg>

                <div className={`d-inline-block`}>إلغاء التجميد</div>
              </div>
            ) : item.status === "active" ? (
              <div
                className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                onClick={() => {
                  setShowFreeze(true);
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
                    fill="#4F4F4F"
                  />
                  <path
                    d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                    fill="#4F4F4F"
                  />
                </svg>

                <div className={`d-inline-block`}>تجميد</div>
              </div>
            ) : null}
            {item.status === "freezed" &&
              item.start_date > new Date().getDate() && (
                <div
                  className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
                  onClick={() => {
                    setShowChangeDate(true);
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
                      fill="#4F4F4F"
                    />
                    <path
                      d="M2.5 10.5H9.5C10.0515 10.5 10.5 10.0515 10.5 9.5V5.166L9.5 6.166V9.5H4.079C4.066 9.5 4.0525 9.505 4.0395 9.505C4.023 9.505 4.0065 9.5005 3.9895 9.5H2.5V2.5H5.9235L6.9235 1.5H2.5C1.9485 1.5 1.5 1.9485 1.5 2.5V9.5C1.5 10.0515 1.9485 10.5 2.5 10.5Z"
                      fill="#4F4F4F"
                    />
                  </svg>

                  <div className={`d-inline-block`}>تعديل تاريخ البداية</div>
                </div>
              )}
            <div
              className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
              onClick={handleSendDetails}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ alignSelf: "center" }}
              >
                <path
                  d="M8.52499 1.45503C8.06653 0.99208 7.52051 0.62501 6.91875 0.375208C6.31699 0.125406 5.67154 -0.00213158 5.01999 2.69476e-05C2.28999 2.69476e-05 0.064994 2.22503 0.064994 4.95503C0.064994 5.83003 0.294994 6.68003 0.724994 7.43003L0.0249939 10L2.64999 9.31003C3.37499 9.70503 4.18999 9.91503 5.01999 9.91503C7.74999 9.91503 9.97499 7.69003 9.97499 4.96003C9.97499 3.63503 9.45999 2.39003 8.52499 1.45503ZM5.01999 9.07503C4.27999 9.07503 3.55499 8.87503 2.91999 8.50003L2.76999 8.41003L1.20999 8.82003L1.62499 7.30003L1.52499 7.14503C1.11377 6.48856 0.895456 5.72966 0.894994 4.95503C0.894994 2.68503 2.74499 0.835027 5.01499 0.835027C6.11499 0.835027 7.14999 1.26503 7.92499 2.04503C8.3088 2.42696 8.61295 2.8813 8.81981 3.38169C9.02666 3.88208 9.13209 4.41857 9.12999 4.96003C9.13999 7.23003 7.28999 9.07503 5.01999 9.07503ZM7.27999 5.99503C7.15499 5.93503 6.54499 5.63503 6.43499 5.59003C6.31999 5.55003 6.23999 5.53003 6.15499 5.65003C6.06999 5.77503 5.83499 6.05503 5.76499 6.13503C5.69499 6.22003 5.61999 6.23003 5.49499 6.16503C5.36999 6.10503 4.96999 5.97003 4.49999 5.55003C4.12999 5.22003 3.88499 4.81503 3.80999 4.69003C3.73999 4.56503 3.79999 4.50003 3.86499 4.43503C3.91999 4.38003 3.98999 4.29003 4.04999 4.22003C4.10999 4.15003 4.13499 4.09503 4.17499 4.01503C4.21499 3.93003 4.19499 3.86003 4.16499 3.80003C4.13499 3.74003 3.88499 3.13003 3.78499 2.88003C3.68499 2.64003 3.57999 2.67003 3.50499 2.66503H3.26499C3.17999 2.66503 3.04999 2.69503 2.93499 2.82003C2.82499 2.94503 2.50499 3.24503 2.50499 3.85503C2.50499 4.46503 2.94999 5.05503 3.00999 5.13503C3.06999 5.22003 3.88499 6.47003 5.12499 7.00503C5.41999 7.13503 5.64999 7.21003 5.82999 7.26503C6.12499 7.36003 6.39499 7.34503 6.60999 7.31503C6.84999 7.28003 7.34499 7.01503 7.44499 6.72503C7.54999 6.43503 7.54999 6.19003 7.51499 6.13503C7.47999 6.08003 7.40499 6.05503 7.27999 5.99503Z"
                  fill="#4F4F4F"
                />
              </svg>

              <div className={`d-inline-block`}>اعادة الإرسال</div>
            </div>
            {/* <div
            className="d-flex justify-content-start p-2 gap-3 flex-wrap align-content-center"
            onClick={() => {
              navigate(`/Home/EditGroupMember/${item.id}/`);
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
          </div>
        </td>
      </tr>
    </>
  );
};

export default GroupsItem;
