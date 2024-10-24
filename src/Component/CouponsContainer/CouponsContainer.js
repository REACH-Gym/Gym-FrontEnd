import styles from "./CouponsContainer.module.css";
import { useGetAllCouponsQuery } from "../../features/api";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import Filter from "../../Common Components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import CouponsItem from "../CouponsItem/CouponsItem";
import { useEffect, useState } from "react";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../features/searchSlice";

// Groups table container and header
const CouponsContainer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchData = useSelector((state) => state.search);
  const {
    data: coupons,
    isFetching: isCouponsFetching,
    isLoading: isCouponsLoading,
    error: couponsError,
  } = useGetAllCouponsQuery(
    `?page=${page}&per_page=20&filter{code.istartswith}=${
      searchData.term.term ? searchData.term.term : ""
    }`
  );
  console.log(coupons);

  useEffect(() => {
    setTotalPages(coupons?.data?.meta?.total_pages);
  }, [coupons]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  if (isCouponsLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (couponsError) {
    if (couponsError?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (couponsError?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      <div className={`${styles.groupsContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/discount.png"}
            title={"جميع أكواد الخصم"}
            subTitle={"يمكنك متابعة جميع أكواد الخصم من هنا"}
          />
          <Filter />
          <ComponentBtns />
        </div>
        {isCouponsFetching ? (
          <div
            className="d-flex justify-content-center align-items-center w-100"
            style={{ height: "100vh" }}
          >
            <Commet color="#316dcc" size="medium" text="" textColor="" />
          </div>
        ) : coupons?.data?.coupons?.length > 0 ? (
          <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
            <table className="w-100">
              <thead className={`fw-bold`}>
                <th className={`p-2 pt-3 pb-3`}>#</th>
                <th className={`p-2 pt-3 pb-3`}>الإسم</th>
                <th className={`p-2 pt-3 pb-3`}>الخصم</th>
                <th className={`p-2 pt-3 pb-3`}>عدد مرات الإستخدام</th>
                <th className={`p-2 pt-3 pb-3`}>عدد المرات المتبقية</th>
                <th className={`p-2 pt-3 pb-3`}>تاريخ البداية</th>
                <th className={`p-2 pt-3 pb-3`}>تاريخ النهاية</th>
                <th className={`p-2 pt-3 pb-3`}>حالة الكود</th>
                <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
              </thead>
              <tbody>
                {coupons?.data?.coupons?.map((item, index) => (
                  <CouponsItem key={index} index={++index} item={item} />
                ))}
              </tbody>
            </table>
            <div
              className={`d-flex justify-content-between align-items-center ${styles.pageBtn}`}
            >
              <MainButton
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                text={"السابق"}
                btnWidth="100px"
              />
              <p className={`m-0`}>
                صفحة {page} من {totalPages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                text={"التالي"}
                btnWidth="100px"
              />
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
            style={{ color: "red", height: "60vh" }}
          >
            لم يتم العثور علي نتائج مطابقة
          </div>
        )}
      </div>
    </>
  );
};

export default CouponsContainer;
