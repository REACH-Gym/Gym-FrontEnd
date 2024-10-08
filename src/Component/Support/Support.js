import React, { useEffect, useState } from "react";
import "./Support.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import { Commet } from "react-loading-indicators";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Support() {
  const [support, setSupport] = useState([]);
  useEffect(() => {
    async function supportData() {
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/support/",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: localStorage.getItem("access"),
          },
        }
      );
      const fetchedData = await response.json();
      console.log(fetchedData);
      if (response.ok) {
        console.log(fetchedData.data);
        setSupport(fetchedData.data);
      }
    }
    supportData();
  }, []);
  return (
    <div className="supportContainer">
      {support.length > 0 ? (
        <>
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              title={"جميع رسائل الدعم"}
              subTitle={"لديك 7 رسائل جديدة"}
              MainIcon={"/assets/image/subscriptions.png"}
            />
          </div>
          <div className="tableContainer mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">رقم الجوال</th>
                  <th scope="col">الملاحظات</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col" className="text-center">
                    خيارات
                  </th>
                </tr>
              </thead>
              <tbody>
                {support.map((support, index) => (
                  <tr>
                    <td>
                      <input type="checkbox" className="selectedBox"/>
                    </td>
                    <td>{support.phone_number}</td>
                    <td>{support.message}</td>
                    <td>{support.created_at.slice(0, 10)}</td>
                    <td className="text-center">
                      <MoreVertIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="loader">
          <Commet color="#316dcc" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
}
export default Support;
