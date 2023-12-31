import "./styles/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Register from "./compoents/Register/Register";
import Login from "./compoents/Login/Login";
import Otp from "./compoents/Otp/Otp";
import Index from "./compoents/Index";
import ForgetPassword from "./compoents/ForgetPassword/ForgetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Index}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/confirm-otp" Component={Otp}></Route>
          <Route path="/forget-password" Component={ForgetPassword}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
