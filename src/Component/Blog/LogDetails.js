import React, { useEffect, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Active, Deleted } from "../Status/Status";

function LogDetails() {
  const { id } = useParams();
  const [logDetail, setDetail] = useState(null);
  const [parsedOldFields, setParsedOldFields] = useState({});
  const [parsedNewFields, setParsedNewFields] = useState({});

  useEffect(() => {
    async function fetchLogDetail() {
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/activity-logs/${id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("access"),
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setDetail(result.data.activity_log);
          parseOldFields(result.data.activity_log.old_fields);
          parseNewFields(result.data.activity_log.new_fields);
        } else {
          console.log("An error occurred");
        }
      } catch (error) {
        console.error("Error fetching log detail:", error);
      }
    }
    fetchLogDetail();
  }, [id]);

  function parseOldFields(oldFieldsString) {
    const fieldsArray = oldFieldsString.split(", ");
    const fieldsObject = {};
    fieldsArray.forEach((field) => {
      const [key, value] = field.split(": ");
      fieldsObject[key.trim()] = value ? value.trim() : "";
    });
    setParsedOldFields(fieldsObject);
  }

  function parseNewFields(newFieldsString) {
    const fieldsArray = newFieldsString.split(", ");
    const fieldsObject = {};
    fieldsArray.forEach((field) => {
      const [key, value] = field.split(": ");
      fieldsObject[key.trim()] = value ? value.trim() : "";
    });
    setParsedNewFields(fieldsObject);
  }

  if (!logDetail) {
    return <div>Loading...</div>;
  }

  const getBackgroundColor = (oldValue, newValue) => {
    if (oldValue !== newValue) {
      return {
        oldBackground: "rgba(255, 0, 0, 0.2)", // Red background for before edit
        newBackground: "rgba(0, 128, 0, 0.2)", // Green background for after edit
      };
    }
    return { oldBackground: "", newBackground: "" }; // No background color if they are the same
  };

  return (
    <div className="logDetailContainer">
      <Helmet>
        <title>تفاصيل السجل</title>
      </Helmet>
      <div className="pe-3">
        <ComponentTitle
          title={"تفاصيل السجل"}
          subTitle={"يمكنك متابعة سجل المستخدمين من هنا"}
          MainIcon={"/assets/image/mdi_clipboard-text-history-outline.png"}
        />
      </div>
      {/* Display log details */}
      <div className="tableContainer mt-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">العملية</th>
              <th scope="col">في</th>
              <th scope="col">الاسم</th>
              <th scope="col">تاريخ العملية</th>
              <th scope="col">بواسطة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{logDetail.id}</td>
              <td>{logDetail.action}</td>
              <td>{logDetail.model_name}</td>
              <td>{logDetail.instance_name}</td>
              <td>{logDetail.created_at.slice(0, 10)}</td>
              <td>{logDetail.performed_by}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* البيانات قبل وبعد التعديل */}
      <div className="d-flex align-items-center justify-content-around mt-5">
        {/* data before edit */}
        <div>
          <p>
            البيانات <span className="text-danger fw-bolder">قبل</span> التعديل{" "}
          </p>
          <div>
            <form className="logForm">
              <div>
                <label className="d-block mb-2" style={{fontSize:"14px",color:"#666666"}}>الأسم</label>
                <input
                  value={parsedOldFields.name || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.name, parsedNewFields.name).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>قم العضوية</label>
                <input
                  value={parsedOldFields.national_id || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.national_id, parsedNewFields.national_id).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>رقم الجوال</label>
                <input
                  value={parsedOldFields.phone_number || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.phone_number, parsedNewFields.phone_number).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>تاريخ الميلاد</label>
                <input
                  type="date"
                  value={parsedOldFields.date_of_birth || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.date_of_birth, parsedNewFields.date_of_birth).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>النوع</label>
                <input
                  value={parsedOldFields.gender === "M" ? "ذكر" : "أنثي" || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.gender, parsedNewFields.gender).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>ملاحظات</label>
                <input
                  value={parsedOldFields.notes || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.notes, parsedNewFields.notes).oldBackground }}
                  readOnly
                />
              </div>
              <div>
                <p>الحالة</p>
                {parsedOldFields.is_active === true ? (
                  <Active />
                ) : (
                  <Deleted /> || ""
                )}
              </div>
            </form>
          </div>
        </div>
        {/* end of data before edit */}
        {/* data after edit */}
        <div>
          <p>
            البيانات <span className="text-success fw-bolder">بعد</span> التعديل{" "}
          </p>
          <div>
            <form className="logForm">
              <div>
                <label className="d-block mb-2" style={{fontSize:"14px",color:"#666666"}}>الأسم</label>
                <input
                  value={parsedNewFields.name || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.name, parsedNewFields.name).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>قم العضوية</label>
                <input
                  value={parsedNewFields.national_id || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.national_id, parsedNewFields.national_id).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>رقم الجوال</label>
                <input
                  value={parsedNewFields.phone_number || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.phone_number, parsedNewFields.phone_number).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>تاريخ الميلاد</label>
                <input
                  type="date"
                  value={parsedNewFields.date_of_birth || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.date_of_birth, parsedNewFields.date_of_birth).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>النوع</label>
                <input
                  value={parsedNewFields.gender === "M" ? "ذكر" : "أنثي" || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.gender, parsedNewFields.gender).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <label className="d-block mb-2 mt-2" style={{fontSize:"14px",color:"#666666"}}>ملاحظات</label>
                <input
                  value={parsedNewFields.notes || ""}
                  style={{ backgroundColor: getBackgroundColor(parsedOldFields.notes, parsedNewFields.notes).newBackground }}
                  readOnly
                />
              </div>
              <div>
                <p>الحالة</p>
                {parsedNewFields.is_active === true ? (
                  <Active />
                ) : (
                  <Deleted /> || ""
                )}
              </div>
            </form>
          </div>
        </div>
        {/* end of data after edit */}
      </div>
    </div>
  );
}

export default LogDetails;
