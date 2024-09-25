import React from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
function AddNewMemberToSub() {
  const initialValues = {
    name: "",
    subscription: "",
    notes: "",
    dauration_freeze: "",
    start_date: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    Statement: Yup.string().required("هذا الحقل الزامي"),
    amount: Yup.string().required("هذا الحقل الزامي"),
    start_date: Yup.date().required("هذا الحقل الزامي"),
  });

  // for second form
  const initialValues__secForm = {
    discount: "",
    payment_method: "",
  };
  const handleSubmit__secForm = (values) => {
    console.log(values);
  };
  const validationSchema__secForm = Yup.object({
    discount: Yup.string().required("هذا الحقل الزامي"),
    payment_method: Yup.string().required("هذا الحقل الزامي"),
  });
  return (
    <div className="addNewSubscriptionsContainer mt-5">
      <div className="pe-4">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"إضافة عضو للاشتراك "}
          subTitle={"يمكنك إضافة عضو للاشتراك من هنا"}
        />
      </div>
      {/* add subscription form*/}
      <div className="formContainer mt-4">
        <div className="addNewSubscriptionsContainer__item1">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="AddNewSubscriptionForm">
              <div>
                <InputField
                  name={"name"}
                  label={"اسم العضو"}
                  inputType={"select"}
                  className="mb-4"
                >
                  <option></option>
                  <option>عضو 1</option>
                  <option>عضو 2</option>
                  <option>عضو 3</option>
                  <option>عضو 4</option>
                </InputField>
              </div>
              <div>
                <InputField
                  name={"subscription"}
                  label={"نوع الأشتراك"}
                  inputType={"select"}
                  className="mb-4"
                >
                  <option></option>
                  <option>اشتراك 1</option>
                  <option>اشتراك 2</option>
                  <option>اشتراك 3</option>
                  <option>اشتراك 4</option>
                </InputField>
              </div>

              <div>
                <InputField
                  name={"dauration_freeze"}
                  label={"فترة التجميد (يوم)"}
                  className="mb-3"
                ></InputField>
              </div>
              <div>
                <InputField
                  name={"start_date"}
                  label={"تاريخ البداية"}
                  type="date"
                />
              </div>
              <div>
                <InputField
                  name={"notes"}
                  label={"الملاحظات"}
                  className="mt-3"
                />
              </div>
              <div className="mt-5 addBtn text-center">
                <MainButton text={"اضافة"} />
              </div>
            </Form>
          </Formik>
        </div>

        <div className="addNewSubscriptionsContainer__item2">
          <Formik
            initialValues={initialValues__secForm}
            validationSchema={validationSchema__secForm}
            onSubmit={handleSubmit__secForm}
          >
            <Form className="AddNewSubscriptionForm">
              <div>
                <InputField
                  name={"discount"}
                  label={"الخصم"}
                  className="mb-3"
                />
              </div>
              <div>
                <InputField
                  name={"payment_method"}
                  label={"طريقة الدفع"}
                  inputType={"select"}
                  className="mb-3"
                >
                  <option></option>
                  <option>طريقة الدفع 1</option>
                  <option>طريقة الدفع 2</option>
                  <option>طريقة الدفع 3</option>
                  <option>طريقة الدفع 4</option>
                </InputField>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <p>الإجمالي قبل الخصم</p>
                  <p>الخصم</p>
                  <p>الإجمالي قبل الضريبة</p>
                  <p>الضريبة</p>
                  <p>الإجمالي</p>
                  <p>المتبقي</p>
                </div>
                <div>
                  <p>410</p>
                  <p>390</p>
                  <p>400</p>
                  <p>10</p>
                  <p>390</p>
                  <p>10</p>
                </div>
              </div>
              <div className="text-center addBtn disabled">
                <MainButton text={"حفظ الاشتراك"} />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddNewMemberToSub;
