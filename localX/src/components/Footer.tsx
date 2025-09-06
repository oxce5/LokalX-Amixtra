import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient" />
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/explore">Explore Art</a>
          <a href="/hire">Hire Artists</a>
          <a href="/how-it-works">How it Works</a>
        </div>
        <Link className="footer-logo" to="/">
            <img
            src="src/assets/logo v3.png" // Replace with your actual logo path
            alt="Lokal Logo"
            className="logo-image"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
