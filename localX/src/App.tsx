import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function App() {
  const location = useLocation();

  // paths where Navbar should NOT appear
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
