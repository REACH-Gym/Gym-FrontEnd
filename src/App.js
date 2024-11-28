// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import AddNewMember from "./Component/Members/AddNewMember/AddNewMember";
import AllMembers from "./Component/Members/AllMemebers/AllMembers";
import MeasurmentsContainer from "./Component/MeasurementsContainer/MeasurementsContainer";
import AddMeasurementForm from "./Component/AddMeasurementForm/AddMeasurementForm";
import AddGroupForm from "./Component/AddGroupForm/AddGroupForm";
import store from "./store/store";
import { Provider } from "react-redux";
import Container from "./Component/Container/Container";
import GroupsContainer from "./Component/GroupsContainer/GroupsContainer";
import ScheduleContainer from "./Component/ScheduleContainer/ScheduleContainer";
import AddScheduleForm from "./Component/AddScheduleForm/AddScheduleForm";
import AllSubScriptions from "./Component/Subscriptions/AllSubScriptions/AllSubScriptions";
import SubscripedMembers from "./Component/Subscriptions/SubscripedMembers/SubscripedMembers";
import AddNewMemberToSub from "./Component/Subscriptions/AddNewMemberToSub/AddNewMemberToSub";
import AddNewSubscription from "./Component/Subscriptions/AddNewSubscription/AddNewSubscription";
import UpdateSystem from "./Component/Update System/UpdateSystem";
import ForgotPassword from "./Pages/Auth/Password/Forgot Password/ForgotPassword";
import ConfirmCode from "./Pages/Auth/Password/Confirm Code/ConfirmCode";
import CreateNewPassword from "./Pages/Auth/Password/Create New Password/CreateNewPassword";
import PaymentMethodsContainer from "./Component/PaymentMethodsContainer/PaymentMethodsContainer";
import AddPaymentMethodForm from "./Component/AddPaymentMethodForm/AddPaymentMethodForm";
import SubscriptionDetail from "./Component/Subscriptions/Subscription Detail/SubscriptionDetail";
import TrainerScheduleContainer from "./Component/TrainerScheduleContainer/TrainerScheduleContainer";
import EditMember from "./Component/Members/Edit Member/EditMember";
import AddGroupMember from "./Component/AddGroupMember/AddGroupMember";
import EditSub from "./Component/Subscriptions/EditSubscription/EditSub";
import MemberActivate from "./Component/Members/MemberActivate/MemberActivate";
import ActiveSub from "./Component/Subscriptions/DeleteSub/ActivateSub";
import EditGroup from "./Component/EditGroup/EditGroup";
import EditGroupMember from "./Component/EditGroupMember/EditGroupMember";
import EditSchedule from "./Component/EditSchedule/EditSchedule";
import Support from "./Component/Support/Support";
import SupportDetails from "./Component/Support/SupportDetails";
import GroupMemberMembership from "./Component/GroupMemberMembership/GroupMemberMembership";
import UsersContainer from "./Component/UsersContainer/UsersContainer";
import AllSchedules from "./Component/AllSchedules/AllSchedules";
import AddUser from "./Component/AddUser/AddUser";
import Logs from "./Component/Blog/Logs";
import PersonalSettings from "./Component/Settings/PersonalSettings";
import ChangePassword from "./Component/Settings/ChangePassword";
import ChagePhoneNumber from "./Component/Settings/ChangePhoneNumber";
import EditUser from "./Component/EditUser/EditUser";
import LogDetails from "./Component/Blog/LogDetails";
import CouponsContainer from "./Component/CouponsContainer/CouponsContainer";
import AddCoupon from "./Component/AddCoupon/AddCoupon";
import VerifyOtp from "./Component/Settings/VerifyOtp";
import Receipt from "./Component/Receipt/Receipt";
import MembershipReceipt from "./Component/Receipt/MembershipReceipt";
import NewRequests from "./Component/NewRequests/NewRequests";
import AllRequests from "./Component/AllRequests/AllRequests";
import RequestDetails from "./Component/RequestDetails/RequestDetails";
import OffersContainer from "./Component/OffersContainer/OffersContainer";
import OfferDetails from "./Component/OfferDetails/OfferDetails";
import AcceptedRequests from "./Component/AcceptedRequests/AcceptedRequests";
import RejectedRequests from "./Component/RejectedRequests/RejectedRequests";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Auth */}
            <Route path="receipt/:receiptId" element={<Receipt />} />
            <Route
              path="membershipReceipt/:receiptId"
              element={<MembershipReceipt />}
            />
            <Route index element={<Login />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="ConfirmCode" element={<ConfirmCode />} />
            <Route path="CreateNewPassword" element={<CreateNewPassword />} />

            {/* end of Auth */}
            <Route path="Home" element={<Home />}>
              {/* support */}
              <Route path="Support" element={<Support />} />
              <Route path="Support/:id" element={<SupportDetails />} />
              {/* end of support */}
              {/* Blog */}
              <Route path="Logs" element={<Logs />} />
              <Route path="Logs/:id/LogDetail" element={<LogDetails />} />
              {/*End of Blog */}
              {/* settings */}
              <Route path="PersonalSettings" element={<PersonalSettings />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="ChagePhoneNumber" element={<ChagePhoneNumber />} />
              <Route path="VerifyOtp" element={<VerifyOtp />} />
              {/* end of settings */}
              {/* update system */}
              <Route path="UpdateSystem" element={<UpdateSystem />} />
              {/* end of update system */}
              {/* main page*/}
              <Route index element={<Container />} />
              {/* main page*/}
              {/* members */}
              <Route path="AllMembers" element={<AllMembers />} />
              <Route path="AddNewMember" element={<AddNewMember />} />
              <Route path="AllMembers/:id/edit" element={<EditMember />} />
              <Route path="MemberActivate" element={<MemberActivate />} />
              {/* end of members */}
              {/*Subscriptions*/}
              <Route path="SubscripedMembers" element={<SubscripedMembers />} />
              <Route
                path="SubscripedMembers/:id/"
                element={<SubscriptionDetail />}
              />
              <Route path="AddNewMemberToSub" element={<AddNewMemberToSub />} />
              <Route
                path="AddNewSubscription"
                element={<AddNewSubscription />}
              />
              <Route path="AllSubScriptions" element={<AllSubScriptions />} />
              <Route path="SubscribedMembers" element={<SubscripedMembers />} />
              <Route path="ActiveSub" element={<ActiveSub />} />
              <Route path="AllSubScriptions/:id/edit" element={<EditSub />} />
              {/* end of subcriptions */}
              {/* measurement */}
              <Route
                path="MeasurmentsContainer"
                element={<MeasurmentsContainer />}
              />
              <Route
                path="AddMeasurementForm"
                element={<AddMeasurementForm />}
              />
              {/* end of measurement */}
              {/* payment */}
              <Route
                path="PaymentMethodsContainer"
                element={<PaymentMethodsContainer />}
              />
              <Route
                path="AddPaymentMethodForm"
                element={<AddPaymentMethodForm />}
              />
              {/* end of payment */}
              {/* groups */}
              <Route path="GroupsContainer" element={<GroupsContainer />} />
              <Route path="AddGroupForm" element={<AddGroupForm />} />
              <Route path="EditGroup/:GroupId/" element={<EditGroup />} />
              <Route path="AddGroupMember" element={<AddGroupMember />} />
              <Route
                path="EditGroupMember/:GroupMemberId/"
                element={<EditGroupMember />}
              />
              <Route
                path="GroupMemberMembership/:memberMembershipID/"
                element={<GroupMemberMembership />}
              />
              <Route path="ScheduleContainer" element={<ScheduleContainer />} />
              {/* end fo groups */}
              {/* schedule */}
              <Route path="AllSchedules" element={<AllSchedules />} />
              <Route path="AddScheduleForm" element={<AddScheduleForm />} />
              <Route
                path="EditSchedule/:ScheduleId/"
                element={<EditSchedule />}
              />
              <Route
                path="SessionDetails/:sessionId/"
                element={<TrainerScheduleContainer />}
              />
              <Route
                path="TrainerScheduleContainer"
                element={<TrainerScheduleContainer />}
              />
              {/* end of schedule */}
              {/* start users */}
              <Route path="UsersContainer" element={<UsersContainer />} />
              <Route path="AddUser" element={<AddUser />} />
              <Route path={"EditUser/:userId"} element={<EditUser />} />
              {/* end users */}
              {/* start coupons */}
              <Route path="CouponsContainer" element={<CouponsContainer />} />
              <Route path="AddCoupon" element={<AddCoupon />} />
              {/* end coupons */}
              {/* start requests */}
              <Route path="NewRequests" element={<NewRequests />} />
              <Route path="AllRequests" element={<AllRequests />} />
              <Route path="AcceptedRequests" element={<AcceptedRequests />} />
              <Route path="RejectedRequests" element={<RejectedRequests />} />
              <Route
                path="RequestDetails/:RequestId"
                element={<RequestDetails />}
              />
              {/* end requests */}
              {/* start offers */}
              <Route path="OffersContainer" element={<OffersContainer />} />
              <Route path="OfferDetails" element={<OfferDetails />} />
              {/* end offers */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
