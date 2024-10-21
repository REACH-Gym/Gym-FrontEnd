import styles from "./CouponsContainer.module.css";
import { useEffect, useState } from "react";
import { useGetCouponsQuery } from "../../features/api";
import GroupsItem from "../GroupsContainerItem/GroupsItem";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import CouponsItem from "../CouponsItem/CouponsItem";

// Groups table container and header
const CouponsContainer = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const {
    data: coupons,
    isFetching: isCouponsFetching,
    error: couponsError,
  } = useGetCouponsQuery(``);
  console.log(coupons);

  if (isCouponsFetching) {
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
          <ComponentBtns />
        </div>
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
              {coupons?.data?.map((item, index) => (
                <CouponsItem key={index} index={++index} item={item} />
              ))}
            </tbody>
          </table>
          {/* <div
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CouponsContainer;
