import { useParams } from "react-router-dom";
import styles from "./Receipt.module.css";
import { useEffect } from "react";
import { useLazyGetRecietQuery } from "../../features/api";

const Receipt = () => {
  const { receiptId } = useParams();
  const [getReciet, { isLoading: isReceitLoading, error: recietError }] =
    useLazyGetRecietQuery();
  useEffect(() => {
    try {
      (async () => {
        const response = await getReciet(receiptId);
        console.log(response);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="p-5">
      <div className="d-flex justify-content-center align-content-center gap-4">
        <img
          src="../../../public/assets/image/Group 1000011709.png"
          alt="Logo"
          width={100}
        />
        <p>(فاتورة ضريبية مبسطة)</p>
        <p className="fw-bold">Balance fitness complex</p>
        <p>0548965214</p>
      </div>
      <div className="d-grid gap-2">
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>التاريخ والوقت:</span>
              <span></span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>رقم الفاتورة:</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>الرقم الضريبي:</span>
              <span></span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>اسم المستخدم:</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>رقم العضويـــة:</span>
              <span></span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>اسم العضــــــو:</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <table>
            <thead className="bg-secondary">
              <tr>
                <th>البيان</th>
                <th>من</th>
                <th>إلى</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>الاجمالي قبل الضريبة:</span>
              <span></span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>الضريبة:</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>الاجمالي النهائي:</span>
              <span></span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-between align-content-center">
              <span>برومو كود:</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row fw-bold text-decoration-underline">
          الإجمالي النهائي يشمل ضريبة القيمة المضافة
        </div>
        <div className="row">سجل تجاري / 455247854 </div>
        <div className={`${styles.footer} row`}>balancefitmess gym.com</div>
      </div>
    </div>
  );
};

export default Receipt;
