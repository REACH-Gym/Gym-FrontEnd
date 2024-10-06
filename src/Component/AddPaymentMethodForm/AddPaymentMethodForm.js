import styles from "./AddPaymentMethodForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
const AddPaymentMethodForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل إلزامي"),
    account: Yup.string().required("هذا الحقل إلزامي"),
    commissionAccount: Yup.string().required("هذا الحقل إلزامي"),
    commission: Yup.number().required("هذا الحقل إلزامي"),
  });
  const initialValues = {
    name: "",
    account: "",
    commissionAccount: "",
    commission: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={`${styles.AddPaymentMethodForm}`}>
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/ph_money.png"}
          title={"جميع طرق دفع"}
          subTitle={"يمكنك إضافة طريقة الدفع المطلوب"}
        />
        </div>
      <div className={`w-100`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={`${styles.formContainer} p-4 mt-3`}>
            <div className="row g-4">
              <div className={`row g-4`}>
                <div className="col-6">
                  <InputField name="name" label="الاسم" />
                </div>
                <div className="col-6">
                  <InputField name="account" label="دليل الحساب" />
                </div>
              </div>
              <div className={`row g-4`}>
                <div className="col-6">
                  <InputField name="commissionAccount" label="حساب العمولة" />
                </div>
                <div className="col-6">
                  <InputField name="commission" label="العمولة" />
                </div>
              </div>
              <div className={`row mt-5`}>
                <div className="col-12 text-center">
                  <MainButton
                    text={"إضافة"}
                    btnWidth="200px"
                    btnType={"submit"}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      </div>
  );
};

export default AddPaymentMethodForm;
