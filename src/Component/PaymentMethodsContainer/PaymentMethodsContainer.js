import PaymentMethodItem from "../PaymentMethodItem/PaymentMethodItem";
import styles from "./PaymentMethodsContainer.module.css";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
const PaymentMethodsContainer = () => {
  const row = {
    num: 1,
    name: "اسم الطريقة",
    account: "دليل الحساب",
    commissionAccount: "حساب العمولة",
    commission: "العمولة",
  };

  return (
    <div className={`${styles.PaymentMethodsContainer}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/ph_money.png"}
          title={"إضافة طريقة دفع جديدة"}
          subTitle={"يمكنك إضافة طريقة دفع جديدة من هنا"}
        />
        <ComponentBtns btn1={'+ إضافة طريقة دفع'}/>
      </div>
      <div className={`${styles.tableContainer}  text-end`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <tr>
              <th className={`p-2 pt-3 pb-3`}>#</th>
              <th className={`p-2 pt-3 pb-3`}>الإسم</th>
              <th className={`p-2 pt-3 pb-3`}>دليل الحساب</th>
              <th className={`p-2 pt-3 pb-3`}>حساب العمولة</th>
              <th className={`p-2 pt-3 pb-3`}>العمولة</th>
              <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
            </tr>
          </thead>
          <tbody>
            <PaymentMethodItem {...row} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentMethodsContainer;
