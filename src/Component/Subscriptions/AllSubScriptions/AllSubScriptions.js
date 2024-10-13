import React, { useEffect, useState } from "react";
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
function AllSubScriptions() {
  const [allSubscription, setAllSubscriptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const access_token = localStorage.getItem("access");
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  console.log(results);
  console.log("lenghttttt", results?.length);
  const [loading, setLoading] = useState(false);
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
        setLoading(false);
        if (response.ok) {
          setAllSubscriptions(result.data.memberships);
          setTotalPages(result.data.meta.total_pages);
        }
      } catch (error) {
        console.error("an error ocurred");
      }
    }
    fetchAllSubscriptionS();
  }, [access_token, page, per_page]);

  const handleShowDropMenu = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
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

  if (loading) {
    return (
      <div className="loader">
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="allSubscriptionContainer">
      {allSubscription.length > 0 ? (
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
            />
            <ComponentBtns
              btn1={"+ إضافة اشتراك جديد "}
              onclick={() => navigate("/Home/AddNewSubscription")}
            />
          </div>
          {results?.data?.memberships?.length > 0 ? (
            <div
              className="pt-3 pb-3"
              style={{
                margin: "10px auto",
                borderRadius: "10px",
                backgroundColor: "white",
                bottom: 0,
                left: 0,
                maxWidth: "98%",
              }}
            >
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
                      <th scope="col" className="text-center">
                        خيارات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.data?.memberships?.map((item, index) => (
                      <tr
                        key={item.id}
                        style={{ fontSize: "14px", textAlign: "right" }}
                      >
                        <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.duration}</td>
                        <td>{item.freeze_duration}</td>
                        <td>{item.description}</td>
                        <td className="fs-5 fw-bolder text-center">
                          <MoreVertIcon
                            onClick={() => handleShowDropMenu(item.id)}
                            style={{ cursor: "pointer" }}
                          />
                          {showDropdown === item.id && (
                            <ul className="drop-menu">
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
                                // onDelete={handleDeleteSub}
                                // id={item.id}
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
                    <th scope="col" className="text-center">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSubscription.map((subscription, index) => (
                    <tr
                      style={{ fontSize: "14px", textAlign: "right" }}
                      key={subscription.id}
                    >
                      <th scope="row">{index + 1 + (page - 1) * per_page}</th>
                      <td>{subscription.name}</td>
                      <td>{subscription.price}</td>
                      <td>{subscription.duration}</td>
                      <td>{subscription.freeze_duration}</td>
                      <td>{subscription.description}</td>
                      <td className="fw-bolder text-center fs-5">
                        <MoreVertIcon
                          onClick={() => handleShowDropMenu(subscription.id)}
                          style={{ cursor: "pointer" }}
                        />
                        {showDropdown === subscription.id && (
                          <ul className="drop-menu">
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
                                  <DriveFileRenameOutlineOutlinedIcon className="dropdown__icon" />
                                  تعديل
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
            />
            <ComponentBtns
              btn1={"+ إضافة اشتراك جديد "}
              onclick={() => navigate("/Home/AddNewSubscription")}
            />
          </div>
          ={" "}
          <div
            className="pt-3 pb-3"
            style={{
              margin: "10px auto",
              borderRadius: "10px",
              backgroundColor: "white",
              bottom: 0,
              left: 0,
              maxWidth: "98%",
            }}
          >
            <div className="tableContainer">
              <div
                className="text-center text-danger fs-1 fw-bold d-flex justify-content-center align-content-center"
                style={{ height: "100vh", padding: "100px 0 0 0 " }}
              ></div>
            </div>
          </div>
          )
        </div>
      )}
    </div>
  );
}
export default AllSubScriptions;
