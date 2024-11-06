import { useParams } from "react-router-dom";
import styles from "./Receipt.module.css";
import { useEffect, useState } from "react";
import { useLazyGetMembershipRecietQuery } from "../../features/api";
import { Commet } from "react-loading-indicators";
import { QRCodeSVG } from "qrcode.react";

const MembershipReceipt = () => {
  const { receiptId } = useParams();
  const [getReciet, { isLoading: isReceitLoading, error: recietError }] =
    useLazyGetMembershipRecietQuery();
  const [receiptData, setReceiptData] = useState(null);
  useEffect(() => {
    try {
      (async () => {
        const response = await getReciet(receiptId);
        console.log(response);
        setReceiptData(response);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [getReciet, receiptId]);

  if (isReceitLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (recietError) {
    if (recietError?.status === 403) {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (recietError?.status === 404) {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          هذه الفاتورة غير موجودة.
        </div>
      );
    } else {
      return (
        <div
          className={`w-100 fs-3 fw-bold error-message d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: "#373636" }}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <div
      className={`p-3 p-md-5 pb-0 ${styles.receiptContainer} d-flex flex-column`}
      style={{ minHeight: "100vh", maxHeight: "100%" }}
    >
      <div
        className="d-flex justify-content-center align-content-center flex-column flex-md-row p-3 pt-0 gap-2 gap-md-4 mb-2"
        style={{ borderBottom: "1px dashed black" }}
        dir="ltr"
      >
        <img
          src="/assets/image/Group 1000011709.png"
          alt="Logo"
          width={100}
          className="align-self-center"
        />
        <p className="align-self-center">(فاتورة ضريبية مبسطة)</p>
        <p className="fw-bold align-self-center">Balance fitness complex</p>
        <p className="align-self-center">0548965214</p>
      </div>
      <div className={`d-grid gap-2 ${styles.receiptDetails}`}>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>التاريخ والوقت:</span>
              <span>{receiptData?.data?.data?.coupon?.created_at}</span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>رقم الفاتورة:</span>
              <span>24587894899647</span>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>الرقم الضريبي:</span>
              <span>320154785445584585</span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>اسم المستخدم:</span>
              <span>{receiptData?.data?.data?.admin?.name}</span>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>رقم العضويـــة:</span>
              <span>{receiptData?.data?.data?.user?.national_id}</span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>اسم العضــــــو:</span>
              <span>{receiptData?.data?.data?.user?.name}</span>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <table
            border={"1px solid black"}
            className={`${styles.receiptTable} text-center`}
          >
            <thead className="bg-secondary-subtle">
              <tr>
                <th>البيان</th>
                <th>من</th>
                <th>إلى</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{receiptData?.data?.data?.membership?.name}</td>
                <td>{receiptData?.data?.data?.start_date}</td>
                <td>{receiptData?.data?.data?.end_date}</td>
                <td>
                  {receiptData?.data?.data?.schedule?.session?.price} ريال
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>الاجمالي قبل الضريبة:</span>
              <span>
                {receiptData?.data?.data?.coupon?.discount_type === "price"
                  ? (
                      receiptData?.data?.data?.schedule?.session?.price *
                      (1 -
                        (+receiptData?.data?.data?.discount +
                          (+receiptData?.data?.data?.coupon?.discount_value /
                            receiptData?.data?.data?.schedule?.session?.price) *
                            100) /
                          100)
                    ).toFixed(2)
                  : (
                      receiptData?.data?.data?.schedule?.session?.price *
                      (1 -
                        (+receiptData?.data?.data?.discount +
                          +receiptData?.data?.data?.coupon?.discount_value) /
                          100)
                    ).toFixed(2)}{" "}
                ريال
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>الضريبة:</span>
              <span>
                {receiptData?.data?.data?.coupon?.discount_type === "price"
                  ? receiptData?.data?.data?.schedule?.session?.price *
                    (1 -
                      (+receiptData?.data?.data?.discount +
                        +(
                          +receiptData?.data?.data?.coupon?.discount_value /
                          receiptData?.data?.data?.schedule?.session?.price
                        ) *
                          100) /
                        100) *
                    (15 / 100)
                  : receiptData?.data?.data?.schedule?.session?.price *
                    (1 -
                      (+receiptData?.data?.data?.discount +
                        +receiptData?.data?.data?.coupon?.discount_value) /
                        100) *
                    (15 / 100)}{" "}
                ريال
              </span>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>الاجمالي النهائي:</span>
              <span>
                {receiptData?.data?.data?.coupon?.discount_type === "price"
                  ? +(receiptData?.data?.data?.coupon?.discount_type === "price"
                      ? receiptData?.data?.data?.schedule?.session?.price *
                        (1 -
                          (+receiptData?.data?.data?.discount +
                            +(
                              +receiptData?.data?.data?.coupon?.discount_value /
                              receiptData?.data?.data?.schedule?.session?.price
                            ) *
                              100) /
                            100) *
                        (15 / 100)
                      : receiptData?.data?.data?.schedule?.session?.price *
                        (1 -
                          (+receiptData?.data?.data?.discount +
                            +receiptData?.data?.data?.coupon?.discount_value) /
                            100) *
                        (15 / 100)) +
                    +(
                      receiptData?.data?.data?.schedule?.session?.price *
                      (1 -
                        (+receiptData?.data?.data?.discount +
                          (+receiptData?.data?.data?.coupon?.discount_value /
                            receiptData?.data?.data?.schedule?.session?.price) *
                            100) /
                          100)
                    ).toFixed(2)
                  : +(receiptData?.data?.data?.coupon?.discount_type === "price"
                      ? receiptData?.data?.data?.schedule?.session?.price *
                        (1 -
                          (+receiptData?.data?.data?.discount +
                            +(
                              +receiptData?.data?.data?.coupon?.discount_value /
                              receiptData?.data?.data?.schedule?.session?.price
                            ) *
                              100) /
                            100) *
                        (15 / 100)
                      : receiptData?.data?.data?.schedule?.session?.price *
                        (1 -
                          (+receiptData?.data?.data?.discount +
                            +receiptData?.data?.data?.coupon?.discount_value) /
                            100) *
                        (15 / 100)) +
                    +(
                      receiptData?.data?.data?.schedule?.session?.price *
                      (1 -
                        (+receiptData?.data?.data?.discount +
                          +receiptData?.data?.data?.coupon?.discount_value) /
                          100)
                    ).toFixed(2)}{" "}
                ريال
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-start gap-3 align-content-center">
              <span>برومو كود:</span>
              <span>{receiptData?.data?.data?.coupon?.code}</span>
            </div>
          </div>
        </div>
        <div
          className="row mt-3 p-2"
          style={{
            border: "1px solid black",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <QRCodeSVG value={window.location.href} size={150} />
        </div>
        <div className="row fw-bold text-decoration-underline m-auto mt-3 mb-2 text-center">
          الإجمالي النهائي يشمل ضريبة القيمة المضافة
        </div>
        <div className="row text-center m-auto">سجل تجاري / 455247854 </div>
      </div>
      <div className={`${styles.footer}`}>balancefitmess gym.com</div>
    </div>
  );
};

export default MembershipReceipt;
