import React from "react";
import "../components/Auth.css";
import AuthSlideshow from "../components/AuthSlideshow";
import logo from "../assets/logo.png"; // ✅ import logo

const Signup: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Logo in top-left */}
        <div className="auth-logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Form content */}
        <div className="auth-content">
          <h2>Welcome to LocalX!</h2>
          <form>
            <input type="text" placeholder="Enter username" />
            <input type="email" placeholder="Enter email address" />
            <input type="password" placeholder="Enter password" />
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account? <a href="/login">Log in here</a>
          </p>
        </div>
      </div>

      <div className="auth-image">
        <AuthSlideshow />
      </div>
    </div>
  );
};

export default Signup;
