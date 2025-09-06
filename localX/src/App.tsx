
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import GalleryPage from './pages/GalleryPage';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from "./components/Navbar";
import Footer from './components/Footer';

import './App.css'; // You'll add the layout CSS here


export default function App() {
  const location = useLocation();

  // paths where Navbar should NOT appear
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (

    <div className="app-container">
      {shouldShowNavbar && <Navbar />}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Navigate to="/gallery/featured-works" replace />} />
          <Route path="/gallery/:category" element={<GalleryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* More routes here */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
