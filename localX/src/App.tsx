import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';  // adjust path if needed
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- this enables dropdowns


export default function App() {
  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      {/* You can add more routes here later */}
    </Routes>
    </>
  );
}
