import React, { useEffect, useState ,useRef } from "react";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../../Common Components/ComponentBtns/ComponentBtns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import MainButton from "../../../Common Components/Main Button/MainButton";
import Filter from "../../../Common Components/Filter/Filter";
import DeleteSub from "../DeleteSub/DeleteSub";
import ActiveSub from "../DeleteSub/ActivateSub";
import "./AllSubScriptions.css";
import { Active, Deleted } from "../../Status/Status";
import { Helmet } from "react-helmet";
function AllSubScriptions() {
  const [allSubscription, setAllSubscriptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const access_token = localStorage.getItem("access");
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllSubscriptionS() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gym-backend-production-65cc.up.railway.app/memberships/?page=${page}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
            setAllSubscriptions(result.data.memberships);
            setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllSubscriptionS();
  }, [access_token, page, per_page]);

  const handleShowDropMenu = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleDeActiveSubsription = (id) => {
    setAllSubscriptions((prevSub) =>
      prevSub.map((subscription) =>
        subscription.id === id
          ? { ...subscription, is_active: false }
          : subscription
      )
    );
  };

  const handleActiveSub = (id) => {
    setAllSubscriptions((prevSub) =>
      prevSub.map((subscription) =>
        subscription.id === id
          ? { ...subscription, is_active: true }
          : subscription
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="allSubscriptionContainer">
      <Helmet>
        <title>
          جميع الأشتراكات
        </title>
      </Helmet>
      {loading ? (
        <div className="loader">
          <Commet width="50px" height="50px" color="#316dcc" />
        </div>
      ) : allSubscription.length === 0 ? (
        <div
          className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          لا يوجد أشتراكات
        </div>
      ) : (
        <div className="allSubscriptionContainer__item">
          <div className="d-flex align-items-center justify-content-between ps-3 pe-3 mt-3">
            <ComponentTitle
              MainIcon={"/assets/image/subscriptions.png"}
              title={"جميع الاشتراكات"}
              subTitle={"يمكنك متابعة جميع بيانات الاشتراكات"}
            />
            <Filter
              options={["الاسم"]}
              query={"memberships/"}
              searchResults={setResults}
              status={false}
              eStatus={true}
            />
            <ComponentBtns
              btn1={"+ إضافة اشتراك جديد "}
              onclick={() => navigate("/Home/AddNewSubscription")}
            />
          </div>
          {results?.data?.memberships?.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
              style={{ color: "red", height: "60vh" }}
            >
              لم يتم العثور علي نتائج مطابقة
            </div>
          ) : results?.data?.memberships?.length > 0 ? (
            <div className="pt-3 pb-3">
              <div className="tableContainer">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">اسم الأشتراك</th>
                      <th scope="col">السعر</th>
                      <th scope="col">المدة</th>
                      <th scope="col">أقصي فترة تجميد</th>
                      <th scope="col">ملاحظات</th>
                      <th scope="col">الحالة</th>
                      <th scope="col" className="text-center">
                        خيارات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.data.memberships.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.membership_duration}</td>
                        <td>{item.freeze_duration}</td>
                        <td>{item.description}</td>
                        <td>
                          {item.is_active === false ? <Deleted /> : <Active />}
                        </td>
                        <td className="fs-5 fw-bolder text-center">
                          <MoreVertIcon
                            onClick={() => handleShowDropMenu(item.id)}
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === item.id && (
                            <ul className="drop-menu" ref={dropdownRef}>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/Home/AllSubScriptions/${item.id}/edit`,
                                    {
                                      state: { membership: item },
                                    }
                                  )
                                }
                              >
                                <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />
                                تعديل
                              </li>
                              <li>
                                <DeleteSub
                                  onDelete={handleDeActiveSubsription}
                                  id={item.id}
                                />
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="tableContainer mt-2">
              <table className="table mt-3">
                <thead>
                  <tr className="text-right">
                    <th scope="col">#</th>
                    <th scope="col">اسم الأشتراك</th>
                    <th scope="col">السعر</th>
                    <th scope="col">المدة</th>
                    <th scope="col">أقصي فترة تجميد</th>
                    <th scope="col">ملاحظات</th>
                    <th scope="col">حالة الأشتراك</th>
                    <th scope="col" className="text-center">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSubscription.map((subscription, index) => (
                    <tr key={subscription.id}>
                      <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                      <td>{subscription.name}</td>
                      <td>{subscription.price}</td>
                      <td>{subscription.membership_duration}</td>
                      <td>{subscription.freeze_duration}</td>
                      <td>{subscription.description}</td>
                      <td>
                        {subscription.is_active === false ? (
                          <Deleted />
                        ) : (
                          <Active />
                        )}
                      </td>
                      <td className="fw-bolder text-center fs-5">
                        <MoreVertIcon
                          onClick={() => handleShowDropMenu(subscription.id)}
                          style={{ cursor: "pointer" }}
                        />
                        {showDropdown === subscription.id && (
                          <ul className="drop-menu" ref={dropdownRef}>
                            {subscription.is_active ? (
                              <>
                                <li
                                  onClick={() =>
                                    navigate(
                                      `/Home/AllSubScriptions/${subscription.id}/edit`,
                                      {
                                        state: { membership: subscription },
                                      }
                                    )
                                  }
                                >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"/></svg>

                                  <sapn className="me-2">تعديل</sapn>
                                </li>
                                <li>
                                  <DeleteSub
                                    id={subscription.id}
                                    onDelete={handleDeActiveSubsription}
                                  />
                                </li>
                              </>
                            ) : (
                              <ActiveSub
                                id={subscription.id}
                                onActive={handleActiveSub}
                              />
                            )}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="preivous-btn">
                  <MainButton
                    text={">>"}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  />
                </div>
                <div>
                  <span className="ms-3 me-3">
                    الصفحة {totalPages} من {page}
                  </span>
                </div>
                <div className="next-btn">
                  <MainButton
                    text={"<<"}
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
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
export default AllSubScriptions;