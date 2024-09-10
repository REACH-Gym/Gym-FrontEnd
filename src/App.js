import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import AddNewMember from "./Component/AddNewMember/AddNewMember";
import AllMembers from "./Component/AllMemebers/AllMembers";
import MeasurmentsContainer from "./Component/MeasurementsContainer/MeasurementsContainer";
import AddMeasurementForm from "./Component/AddMeasurementForm/AddMeasurementForm";
import AddGroupForm from "./Component/AddGroupForm/AddGroupForm";
import store from "./store/store";
import { Provider } from "react-redux";
import Container from "./Component/Container/Container";
import GroupsContainer from "./Component/GroupsContainer/GroupsContainer";
import ScheduleContainer from "./Component/ScheduleContainer/ScheduleContainer";
import AddScheduleForm from "./Component/AddScheduleForm/AddScheduleForm";
import ReservationsContainer from "./Component/ReservationsContainer/ReservationsContainer";
import PaymentMethodsContainer from "./Component/PaymentMethodsContainer/PaymentMethodsContainer";
import AddPaymentMethodForm from "./Component/AddPaymentMethodForm/AddPaymentMethodForm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="Home" element={<Home />}>
              <Route index element={<Container />} />
              <Route path="AllMembers" element={<AllMembers />} />
              <Route path="AddNewMember" element={<AddNewMember />} />
              <Route
                path="MeasurmentsContainer"
                element={<MeasurmentsContainer />}
              />
              <Route
                path="AddMeasurementForm"
                element={<AddMeasurementForm />}
              />
              <Route path="GroupsContainer" element={<GroupsContainer />} />
              <Route path="AddGroupForm" element={<AddGroupForm />} />
              <Route path="ScheduleContainer" element={<ScheduleContainer />} />
              <Route path="AddScheduleForm" element={<AddScheduleForm />} />
              <Route
                path="ReservationsContainer"
                element={<ReservationsContainer />}
              />
              <Route
                path="PaymentMethodsContainer"
                element={<PaymentMethodsContainer />}
              />
              <Route
                path="AddPaymentMethodForm"
                element={<AddPaymentMethodForm />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
