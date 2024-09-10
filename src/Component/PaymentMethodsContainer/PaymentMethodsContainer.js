import ContentContainer from "../ContentContainer/ContentContainer";
import PaymentMethodItem from "../PaymentMethodItem/PaymentMethodItem";
import styles from "./PaymentMethodsContainer.module.css";

const PaymentMethodsContainer = () => {
  const row = {
    num: 1,
    name: "اسم الطريقة",
    account: "دليل الحساب",
    commissionAccount: "حساب العمولة",
    commission: "العمولة",
  };

  return (
    <ContentContainer
      title={"جميع طرق الدفع"}
      desc={"يمكنك إضافة طريقة الدفع المطلوبة"}
      mainIcon={"/assets/image/payment.png"}
      btn1={"إضافة قياس جديد"}
      btn2={"disabled"}
    >
      <div className={`${styles.tableContainer} w-100 text-end`}>
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
    </ContentContainer>
  );
};

export default PaymentMethodsContainer;
