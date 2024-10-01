import React, { useEffect, useState } from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";

function AddNewMemberToSub() {
  const access_token = localStorage.getItem("access");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/memberships/",
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

        if (response) {
          setUsers(result.data.user_memberships);
          console.log(result.data.user_memberships);
        } else {
          console.warn("User memberships data is undefined or not available.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [access_token]);

  const initialValues = {
    user: "",
    membership: "",
    notes: "",
    start_date: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = Yup.object({
    user: Yup.string().required("هذا الحقل الزامي"),
    membership: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    Statement: Yup.string().required("هذا الحقل الزامي"),
    amount: Yup.string().required("هذا الحقل الزامي"),
    start_date: Yup.date().required("هذا الحقل الزامي"),
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
                  name={"user"}
                  label={"اسم العضو"}
                  inputType={"select"}
                  className="mb-4"
                >
                  <option value="">اختر العضو</option>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.user.name}
                      </option>
                    ))
                  ) : (
                    <option>لا يوجد أعضاء متاحين</option>
                  )}
                </InputField>
              </div>
              <div>
                <InputField
                  name={"membership"}
                  label={"نوع الأشتراك"}
                  inputType={"select"}
                  className="mb-4"
                >
                  <option value="">اختر الاشتراك</option>
                  {users.length > 0 ? (
                    users.map((membership, index) => (
                      <option key={membership.id} value={membership.id}>
                        {membership.membership.name}
                      </option>
                    ))
                  ) : (
                    <option>لاتوجد اشتراكات متاحة</option>
                  )}
                </InputField>
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
        {/* second form */}
        <div className="addNewSubscriptionsContainer__item2">
          <Formik
            initialValues={'initialValues__secForm'}
            validationSchema={'validationSchema__secForm'}
            onSubmit={'handleSubmit__secForm'}
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
                  <option value="">اختر طريقة الدفع</option>
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