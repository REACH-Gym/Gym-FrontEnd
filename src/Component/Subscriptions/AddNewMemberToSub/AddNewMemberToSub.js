import React, { useEffect, useState } from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";

function AddNewMemberToSub() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [users, setUsers] = useState([]);
  const [membership, setMemberShip] = useState([]);
  const [subscription,setSubscription] = useState([]);
  useEffect(() => {
    // get users
    async function fetchData() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const user = await response.json();
        console.log('users',user);

        if (response.ok) {
          setUsers(user.data.users);
          console.log('Usersssssssssssssss',user.data.users);
          console.log('User data fetched successfully');
        } else {
          console.warn("User  data is not available.");
          setUsers(null)
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [access_token]);

  // to get memberships
  useEffect(() => {
    async function fetchMemberShips() {
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/memberships/",
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
        if (response.ok) {
          console.log("membership fetched successufully");
          setMemberShip(result.data.memberships);
          console.log(result.data.memberships);
        } else {
          console.error("membership failed to fetch");
          setMemberShip(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMemberShips();
  }, []);

  // adding member to subscriptions
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const items = {
        user: values["user"],
        membership: values["membership"],
        notes: values["notes"],
        start_date: values["start_date"],
        discount: values["discount"],
        status: "active",
      };
      const response = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members/memberships/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: access_token,
          },
          body: JSON.stringify(items),
        }
      );

      const subscriptions = await response.json();
      console.log(subscriptions);
      if (response.ok) {
        setSubscription(subscriptions.data)
        console.log('subbbbbbbb',subscriptions.data)
        console.log("success");
        setTimeout(() => {
            navigate('/Home/SubscripedMembers');
        }, 1500);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const initialValues = {
    user: "",
    membership: "",
    notes: "",
    start_date: "",
    discount: "",
    status: "active",
  };
  const validationSchema = Yup.object({
    user: Yup.string().required("هذا الحقل الزامي"),
    membership: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    discount: Yup.date().required("هذا الحقل الزامي"),
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
                  {users?.length > 0 ? (
                    users.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
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
                  {membership.length > 0 ? (
                    membership.map((membershipItem, index) => (
                      <option key={membershipItem.id} value={membershipItem.id}>
                        {membershipItem.name}
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
              <div>
                <InputField
                  name={"discount"}
                  label={"الخصم"}
                  className="mb-3"
                />
              </div>
              {/* <div>
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
              </div> */}
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
                  <p>400</p>
                  <p>390</p>
                  <p>400</p>
                  <p>10</p>
                  <p>390</p>
                  <p>10</p>
                </div>
              </div>
              <div className="mt-5 addBtn text-center">
                <MainButton text={"اضافة"} btnType={"submit"} />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddNewMemberToSub;
