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
        oldBackground: "rgba(255, 0, 0, 0.2)", 
        newBackground: "rgba(0, 128, 0, 0.2)",
      };
    }
    return { oldBackground: "", newBackground: "" };
  };

  const fieldNameMap = {
    "name":"الأسم",
    "gender": "الجنس",
    "description": "الملاحظات",
    "duration": "المدة",
    "price": "السعر",
    "freeze_duration": "مدة التجميد",
    "is_active": "الحالة",
    "national_id":"الرقم القومي",
    "phone_number":"رقم الجوال",
    "role":"الوظيفة",
    "date_of_birth":"تاريخ الميلاد",
    "notes":"ملاحظات",
    "discount":"الخصم",
    "actual_price":"السعرالحالي",
    "start_date":"تاريخ البداية",
    "end_date":"تاريخ النهاية",
    "saturday	":"السبت",
    "sunday":"الأحد",
    "monday":"الأتنين",
    "tuesday":"الثلاثاء",
    "wednesday":"الأربعاء",
    "thursday":"الخميس",
    "friday":"الجمعة",
    "max_capacity":"الحد الأقصى للسعة",
    "current_capacity":"السعة الحالية",
    "price_after_discount":"السعر قبل الخصم",
    "membership_duration":"مدة الأشتراك",
    "paid_money":"المبلغ المدفوع"
  };

  const renderField = (key, oldValue, newValue) => {
    let displayOldValue = oldValue;
    let displayNewValue = newValue;

     // Special case for is_active field
  if (key === "is_active") {
    return (
      <tr key={key}>
        <td>{fieldNameMap[key]}</td>
        <td>
          {oldValue === "false" ? <Deleted /> : <Active />}
        </td>
        <td>
          {newValue === "false" ? <Deleted /> : <Active />}
        </td>
      </tr>
    );
  }
    if (key === "gender") {
      displayOldValue = oldValue === 'M' ? 'ذكر' : oldValue === 'F' ? 'أنثى' : '';
      displayNewValue = newValue === 'M' ? 'ذكر' : newValue === 'F' ? 'أنثى' : '';
    }

    if (key === "role") {
      const roleMap = {
        'M': 'عضو',
        'A': 'محاسب',
        'S': 'الأدمن الرئيسي',
        'T': 'مدرب',
      };
      displayOldValue = roleMap[oldValue] || '';
      displayNewValue = roleMap[newValue] || '';
    }

    const inputStyle = {
      width: '300px',
      backgroundColor: '#fff',
      border: '1px solid lightgray',
      outline: 'none',
      borderRadius: '5px',
      padding: '10px',
      height: '45px',
    };

    return (
      <tr key={key}>
        <td>{fieldNameMap[key] || key}</td>
        <td>
          <input
            value={displayOldValue || ""}
            style={{ ...inputStyle, backgroundColor: getBackgroundColor(oldValue, newValue).oldBackground }}
            readOnly
          />
        </td>
        <td>
          <input
            value={displayNewValue || ""}
            style={{ ...inputStyle, backgroundColor: getBackgroundColor(oldValue, newValue).newBackground }}
            readOnly
          />
        </td>
      </tr>
    );
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
      
      {/* Old and new fields table */}
      <div className="d-flex align-items-center justify-content-around mt-5">
        <div className="tableContainer p-5">
          <table className="table">
            <thead>
              <tr className="mb-4">
                <th scope="col">الحقل</th>
                <th scope="col" className="">البيانات قبل التعديل</th>
                <th scope="col">البيانات بعد التعديل</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(parsedOldFields)
                .filter(key => !["id", "created_at", "updated_at", "profile_image", "is_verified", "session_id", "user_id",
                  "admin_id", "schedule_id", "status", "trainer_id", "membership_id", "coupon_id"
                ].includes(key))
                .map((key) => renderField(key, parsedOldFields[key], parsedNewFields[key]))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LogDetails;
