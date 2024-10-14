import React, { useEffect, useState } from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
function AddNewMemberToSub() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [users, setUsers] = useState([]);
  const [membership, setMemberShip] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalError , setShowModalModalError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [memberShipPrice, setMemberShipPrice] = useState(0);
  useEffect(() => {
    // fetch users
    async function fetchData() {
      // setLoading(true);
      try {
        const response = await fetch(
          "https://gym-backend-production-65cc.up.railway.app/members/?filter{is_active}=true",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: access_token,
            },
          }
        );
        const user = await response.json();
        console.log("users", user);

        if (response.ok) {
          setUsers(user.data.users);
          console.log("User data fetched successfully");
        } else {
          console.warn("User  data is not available.");
          setUsers(null);
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
          "https://gym-backend-production-65cc.up.railway.app/memberships/?filter{is_active}=true",
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
        } else {
          console.error("membership failed to fetch");
          setMemberShip(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMemberShips();
  }, [access_token]);

  // adding member to subscriptions
  const handleSubmit = async (values) => {
    setLoading(true);
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
        setSubscription(subscriptions.data);
        setShowModal(true);
        console.log("subbbbbbbb", subscriptions.data);
        console.log("success");
        setTimeout(() => {
          navigate("/Home/SubscripedMembers");
        }, 3000);
      } else {
        console.log("failed");
        setShowModalModalError(true);
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
    discount: 0,
    status: "active",
  };
  const validationSchema = Yup.object({
    user: Yup.string().required("هذا الحقل الزامي"),
    membership: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string(),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    discount: Yup.number().min(0).max(100).required("هذا الحقل الزامي"),
  });
  const handlCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalError = ()=>{
    setShowModalModalError(false);
  }
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
            {({ values, setFieldValue }) => (
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
                    {membership?.length > 0 ? (
                      membership.map((membershipItem, index) => (
                        <option
                          key={membershipItem.id}
                          value={membershipItem.id}
                        >
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
                    onChange={(e) => {
                      const discount = parseFloat(e.target.value) || 0;
                      setFieldValue("discount", discount);
                      setFieldValue(
                        "totalPrice",
                        (setMemberShipPrice * (1 - discount / 100)).toFixed(2)
                      );
                    }}
                  />
                </div>
                {/* <div className="d-flex justify-content-between mt-4">
                  <div>
                    <p>الإجمالي قبل الخصم</p>
                    <p>الخصم</p>
                    <p>الضريبة</p>
                    <p>الإجمالي</p>
                  </div>
                  <div>
                    <p>{subscription.price_after_discount}</p>
                    <p>{values.discount || 0}</p>
                    <p>15%</p>
                    <p>
                      {(
                        memberShipPrice *
                        (1 - values.discount / 100) *
                        1.15
                      ).toFixed(2)}
                    </p>
                  </div>
                </div> */}
                <div className="mt-5 addBtn text-center">
                  <MainButton text={"اضافة"} btnType={"submit"} isLoading={loading} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* succeess */}
      <Modal isOpen={showModal}>
        <div className="d-flex justify-content-end">
          <button
            className="border-0 pt-4 ps-4 failed fw-bolder"
            onClick={handlCloseModal}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/weui_done2-outlined.png"
            alt=""
            height={"100px"}
            width={"100px"}
          />
        </div>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            تم اضافة عضو للأشتراك بنجاح
          </p>
        </div>
      </Modal>
      {/* failed */}
      <Modal isOpen={showModalError}>
        <div className="d-flex justify-content-end">
          <button
            className="border-0 pt-4 ps-4 failed fw-bolder"
            onClick={handleCloseModalError}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <img
            src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
            alt=""
            height={"100px"}
            width={"100px"}
          />
        </div>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! هذا العضو مشترك من قبل 
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default AddNewMemberToSub;
