import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BookListing from "./screens/BookListing";

function App() {

  return (
    
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/booklisting" element={<BookListing />} />
        </Routes>
      </Router>
    
  )
}

export default App
