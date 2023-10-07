import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BookListing from "./screens/BookListing";
import ForgotPassword from "./screens/forgotPassword";
import ResetPassword from "./screens/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/booklisting" element={<BookListing />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
