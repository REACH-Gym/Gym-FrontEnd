import React, { useEffect, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import "./Logs.css";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import Filter from "../../Common Components/Filter/Filter";
import { Commet } from "react-loading-indicators";
import { Helmet } from "react-helmet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MainButton from "../../Common Components/Main Button/MainButton";
function Logs() {
  const [results, setResults] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [total_pages, setTotalPages] = useState(1);
  console.log(results);
  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/activity-logs/?page=${page}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              accept: "application/json",
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setLogs(result.data.activity_logs);
          console.log(result.data);
          setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [per_page, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNextPage = () => {
    if (page < total_pages) {
      setPage((nextPage) => nextPage + 1);
    }
  };
  return (
    <div className="blogContainer">
      <Helmet>
        <title>السجل</title>
      </Helmet>
      {loading ? (
        <div className="loader">
          <Commet width="50px" height="50px" color="#316dcc" />
        </div>
      ) : logs.length === 0 ? (
        <div
          className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          لا يوجد سجلات حالية
        </div>
      ) : (
        <div className="blogContainer__items">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
            <ComponentTitle
              title={"السجل"}
              subTitle={"يمكنك متابعة سجل المستخدمين من هنا"}
              MainIcon={"/assets/image/mdi_clipboard-text-history-outline.png"}
            />
            <Filter
              searchResults={setResults}
              status={false}
              query={"activity-logs/"}
              options={["الاسم", "العملية"]}
            />
            <ComponentBtns />
          </div>
          {results?.data?.activity_logs?.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
              style={{ color: "red", height: "60vh" }}
            >
              لم يتم العثور علي نتائج مطابقة
            </div>
          ) : results?.data?.activity_logs?.length > 0 ? (
            <div className="tableContainer mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">العملية</th>
                    <th scope="col">في</th>
                    <th scope="col">الأسم</th>
                    <th scope="col">تاريخ التسجيل</th>
                    <th scope="col">بواسطة</th>
                    <th className="text-center" scope="col">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.data?.activity_logs?.map((logSearch, index) => (
                    <tr>
                      <td key={logSearch.id}>{index + 1}</td>
                      <td>{logSearch.action}</td>
                      <td>{logSearch.model_name}</td>
                      <td>{logSearch.instance_name}</td>
                      <td>{logSearch.created_at}</td>
                      <td>{logSearch.performed_by}</td>
                      <td className="text-center" style={{ cursor: "pointer" }}>
                        <MoreVertIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tableContainer mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">العملية</th>
                    <th scope="col">في</th>
                    <th scope="col">الأسم</th>
                    <th scope="col">تاريخ التسجيل</th>
                    <th scope="col">بواسطة</th>
                    <th className="text-center" scope="col">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr>
                      <td key={log.id}>{index + 1}</td>
                      <td>{log.action}</td>
                      <td>{log.model_name}</td>
                      <td>{log.instance_name}</td>
                      <td>{log.created_at}</td>
                      <td>{log.performed_by}</td>
                      <td className="text-center" style={{ cursor: "pointer" }}>
                        <MoreVertIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pagiation */}
              <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="preivous-btn">
                  <MainButton
                    text={"السابق"}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  />
                </div>
                <div>
                  <span className="ms-3 me-3">
                    الصفحة {total_pages} من {page}
                  </span>
                </div>
                <div className="next-btn">
                  <MainButton
                    text={"التالي"}
                    onClick={handleNextPage}
                    disabled={page >= total_pages}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Logs;
