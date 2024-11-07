import { useEffect, useState } from "react";
import styles from "./FreezeBox.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const FreezeBox = ({
  text,
  desc,
  handleConfirm,
  handleCancel,
  dateValue,
  isLoading = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [values, setValues] = useState({});

  useEffect(() => {
    dateValue(values.start_date);
  }, [dateValue, values]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.warning}`}>
        <p className="mt-4 fs-4 fw-bold">{text}</p>
        <p className="mt-3 text-secondary">{desc}</p>
        <Formik
          initialValues={{
            start_date: "",
          }}
          validationSchema={Yup.object({
            start_date: Yup.date().required("هذا الحقل الزامي"),
          })}
          onSubmit={handleConfirm}
        >
          {({ values }) => {
            setValues(values);
            return (
              <Form>
                <div>
                  <label
                    htmlFor="start_date"
                    className="w-100 text-end text-secondary mb-1"
                  >
                    تاريخ البداية الجديد
                  </label>
                  <Field
                    type="date"
                    id="start_date"
                    name="start_date"
                    min={minDate}
                    required
                    style={{
                      width: "100%",
                      backgroundColor: "#F4F4F4",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px",
                      outline: "none",
                      height: "52px",
                    }}
                  />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    className="error-message text-end mt-1"
                  />
                </div>

                <div
                  className={`${styles.buttons} d-flex justify-content-center gap-4 mt-4`}
                >
                  <button type="submit" disabled={loading}>
                    {loading ? (
                      <div className={`${styles.loadingContainer}`}>
                        <div className={`${styles.customLoader}`}></div>
                      </div>
                    ) : (
                      "تأكيد"
                    )}
                  </button>
                  <button onClick={handleCancel}>إلغاء</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default FreezeBox;
