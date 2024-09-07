import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
