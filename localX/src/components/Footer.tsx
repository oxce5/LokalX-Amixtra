import React from "react";
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
        <div className="footer-logo">
            <img
            src="src/assets/logo v3.png" // Replace with your actual logo path
            alt="Lokal Logo"
            className="logo-image"
          />
          </div>
      </div>
    </footer>
  );
};

export default Footer;
