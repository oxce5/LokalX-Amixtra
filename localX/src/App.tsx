import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/pages/Home';
import GalleryPage from './pages/GalleryPage';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Navbar from "./components/Navbar";
import Footer from './components/Footer';

import './App.css'; // You'll add the layout CSS here

export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Navigate to="/gallery/featured-works" replace />} />
          <Route path="/gallery/:category" element={<GalleryPage />} />
          {/* More routes here */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
