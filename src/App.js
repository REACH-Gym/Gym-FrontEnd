import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import AddNewMember from "./Component/AddNewMember/AddNewMember";
import AllMembers from "./Component/AllMemebers/AllMembers";
import MeasurmentsContainer from "./Component/MeasurementsContainer/MeasurementsContainer";
import AddMeasurementForm from "./Component/AddMeasurementForm/AddMeasurementForm";
import AddGroupForm from "./Component/AddGroupForm/AddGroupForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddNewMember" element={<AddNewMember />} />
        <Route path="/AllMembers" element={<AllMembers />} />
        <Route path="/MeasurmentsContainer" element={<MeasurmentsContainer />} />
        <Route path="/AddMeasurementForm" element={<AddMeasurementForm />} />
        <Route path="/AddGroupForm" element={<AddGroupForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
