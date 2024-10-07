import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AlmostFinished from "./Component/Subscriptions/AlmostFinished/AlmostFinished";
import ActiveSubScription from "./Component/Subscriptions/ActiveSubscriptions/ActiveSubscriptions";
import SubscripedMembers from "./Component/Subscriptions/SubscripedMembers/SubscripedMembers";
import AddNewMemberToSub from "./Component/Subscriptions/AddNewMemberToSub/AddNewMemberToSub";
import AddNewSubscription from "./Component/Subscriptions/AddNewSubscription/AddNewSubscription";
import UpdateSystem from "./Component/Update System/UpdateSystem";
import ExpiredSubscriptions from "./Component/Subscriptions/ExpiredSubscriptions/ExpiredSubscriptions";
import ForgotPassword from "./Pages/Auth/Password/Forgot Password/ForgotPassword";
import ConfirmCode from "./Pages/Auth/Password/Confirm Code/ConfirmCode";
import CreateNewPassword from "./Pages/Auth/Password/Create New Password/CreateNewPassword";
import PaymentMethodsContainer from "./Component/PaymentMethodsContainer/PaymentMethodsContainer";
import AddPaymentMethodForm from "./Component/AddPaymentMethodForm/AddPaymentMethodForm";
import SubscriptionDetail from "./Component/Subscriptions/Subscription Detail/SubscriptionDetail";
import TrainerScheduleContainer from "./Component/TrainerScheduleContainer/TrainerScheduleContainer";
import EditMember from "./Component/Members/Edit Member/EditMember";
// Edit
import AddGroupMember from "./Component/AddGroupMember/AddGroupMember";
import MemberSubscriptionDetail from "./Component/Members/MemberSubcriptions/MemberSubscriptionDetail";
// import DeleteMember from "./Component/Members/DeleteMember/DeleteMember";
import EditSub from "./Component/Subscriptions/EditSubscription/EditSub";
import MemberActivate from "./Component/Members/MemberActivate/MemberActivate";
import ActiveSub from "./Component/Subscriptions/DeleteSub/ActivateSub";
import EditGroup from "./Component/EditGroup/EditGroup";
import EditGroupMember from "./Component/EditGroupMember/EditGroupMember";
import EditSchedule from "./Component/EditSchedule/EditSchedule";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="ConfirmCode" element={<ConfirmCode />} />
            <Route path="CreateNewPassword" element={<CreateNewPassword />} />

            <Route path="Home" element={<Home />}>
              <Route path="UpdateSystem" element={<UpdateSystem />} />
              <Route index element={<Container />} />
              <Route path="AllMembers" element={<AllMembers />} />
              <Route path="AddNewMember" element={<AddNewMember />} />
              {/* // <Route path="AllMembers/:id/delete" element={<DeleteMember />} /> */}
              <Route path="AllMembers/:id/edit" element={<EditMember />} />
              <Route
                path="AllMembers/:id/subscription-detail/"
                element={<MemberSubscriptionDetail />}
              />
              <Route path="MemberActivate" element={<MemberActivate />} />
              <Route
                path="MeasurmentsContainer"
                element={<MeasurmentsContainer />}
              />
              <Route
                path="AddMeasurementForm"
                element={<AddMeasurementForm />}
              />
              <Route
                path="PaymentMethodsContainer"
                element={<PaymentMethodsContainer />}
              />
              <Route
                path="AddPaymentMethodForm"
                element={<AddPaymentMethodForm />}
              />
              <Route path="GroupsContainer" element={<GroupsContainer />} />
              <Route path="AddGroupForm" element={<AddGroupForm />} />
              <Route path="EditGroup/:GroupId/" element={<EditGroup />} />
              <Route path="AddGroupMember" element={<AddGroupMember />} />
              <Route
                path="EditGroupMember/:GroupMemberId/"
                element={<EditGroupMember />}
              />
              <Route path="ScheduleContainer" element={<ScheduleContainer />} />
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
              <Route path="AlmostFinished" element={<AlmostFinished />} />
              <Route
                path="ActiveSubScription"
                element={<ActiveSubScription />}
              />
              <Route path="SubscribedMembers" element={<SubscripedMembers />} />
              <Route
                path="ExpiredSubScriptions"
                element={<ExpiredSubscriptions />}
              />
              <Route path="ActiveSub" element={<ActiveSub />} />
              {/* <Route path="SubscribedMembers/:id/" element={<SubscriptionDetail/>}/> */}
              {/* <Route path="AllSubScriptions/:id/delete" element={< />} /> */}
              <Route path="AllSubScriptions/:id/edit" element={<EditSub />} />
              {/* <Route path="AllSubScriptions/:id/subscription-detail/" element={< />}/> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
