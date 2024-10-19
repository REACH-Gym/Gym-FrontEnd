import React, { useEffect, useState } from "react";
import "./AddNewMemberToSub.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../Common Components/InputField/InputField";
import MainButton from "../../../Common Components/Main Button/MainButton";
import ComponentTitle from "../../../Common Components/ComponentTitle/ComponentTitle";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessModal from "../../../Common Components/Modal/SucessModal/SuccessModal";
import FailedModal from "../../../Common Components/Modal/FailedModal/FailedModal";
function AddNewMemberToSub() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access");
  const [users, setUsers] = useState([]);
  const [membership, setMemberShip] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [memberShipPrice, setMemberShipPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    // fetch users
    async function fetchData() {
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

        if (response.ok) {
          setUsers(user.data.users);
        } else {
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
        if (response.ok) {
          setMemberShip(result.data.memberships);
        } else {
          setMemberShip(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMemberShips();
  }, [access_token]);

  //get promo code
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
        setSubscription(subscriptions.data.user_membership);
        console.log(subscriptions.data);
        setShowModal(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/Home/SubscripedMembers");
        }, 2000);
      } else {
        setShowModalModalError(true);
        setLoading(false);
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
    notes: Yup.string(),
    start_date: Yup.date().required("هذا الحقل الزامي"),
    discount: Yup.number().min(0).max(100).required("هذا الحقل الزامي"),
  });

  const handleCloseModalError = () => {
    setShowModalModalError(false);
  };

  return (
    <div className="addNewSubscriptionsContainer mt-5">
      <Helmet>
        <title>إضافة عضو للأشتراك</title>
      </Helmet>
      <div className="pe-4  ">
        <ComponentTitle
          MainIcon={"/assets/image/subscriptions.png"}
          title={"إضافة عضو للاشتراك "}
          subTitle={"يمكنك إضافة عضو للاشتراك من هنا"}
        />
      </div>
      <div className=" ">
        <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="  AddForm">
                <div className=" d-flex justify-content-around">
                  <div className="form1 ms-5">
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
                              {user.name} - {user.phone_number}
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
                        onChange={(e) => {
                          const selectedMembershipId = e.target.value;
                          setFieldValue("membership", selectedMembershipId);

                          // Find the selected membership from the membership list and set the price
                          const selectedMembership = membership.find(
                            (m) => m.id === parseInt(selectedMembershipId)
                          );
                          if (selectedMembership) {
                            setMemberShipPrice(selectedMembership.price); // Set the membership price
                            setFieldValue("price", selectedMembership.price); // Store price 
                          }
                        }}
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
                        className="mt-3 notes"
                      />
                    </div>
                  </div>
                  <div className="form2">
                    <div>
                      <InputField
                        name={"discount"}
                        label={"الخصم (%)"}
                        className="mb-3"
                        onChange={(e) => {
                          const discountValue = e.target.value;
                          setFieldValue("discount", discountValue);

                          // Calculate discounted total
                          const discountAmount =
                            (memberShipPrice * discountValue) / 100;
                          const finalTotal = memberShipPrice - discountAmount;
                          setDiscountedTotal(finalTotal);
                        }}
                      />
                    </div>
                    <div>
                      <InputField
                        inputType={"select"}
                        name={"promo_code"}
                        label={"برومو كود"}
                      />
                    </div>
                    <div>
                      <InputField
                        inputType={"select"}
                        name={"payment_method"}
                        label={"طريقة الدفع"}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div>
                        <p>الإجمالي قبل الخصم</p>
                        <p>الخصم</p>
                        <p>الإجمالي قبل الضريبة</p>
                        <p>الضريبة</p>
                        <p>الإجمالي</p>
                      </div>
                      <div>
                        <p>{memberShipPrice || 0}</p>
                        <p>
                          {subscription.user_membership
                            ? subscription.user_membership.discount
                            : 0}
                        </p>
                        <p>{discountedTotal.toFixed(2)}</p>
                        <p>15%</p>
                        <p>
                          {(discountedTotal + discountedTotal * 0.15).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 addBtn text-center">
                  <MainButton
                    text={"اضافة"}
                    btnType={"submit"}
                    isLoading={loading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* succeess */}
      <SuccessModal isOpen={showModal}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            تم اضافة العضو للأشتراك بنجاح
          </p>
        </div>
      </SuccessModal>
      {/* failed */}
      <FailedModal isOpen={showModalError} handleClose={handleCloseModalError}>
        <div>
          <p className="text-center mt-2  text-dark fw-bolder mb-5">
            حدث خطأ ! هذا العضو مشترك من قبل
          </p>
        </div>
      </FailedModal>
    </div>
  );
}
export default AddNewMemberToSub;