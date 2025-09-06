import React from "react";
import "../components/Auth.css";
import AuthSlideshow from "../components/AuthSlideshow";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";


const Login: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Logo in top-left */}
        <div className="auth-logo">
        <Link to="/">
            <img src={logo} alt="Logo" />
        </Link>
        </div>

        {/* Form content */}
        <div className="auth-content">
          <h2>Welcome back</h2>
          <form>
            <input type="text" placeholder="Enter username" />
            <input type="password" placeholder="Enter password" />
            <button type="submit">Log in</button>
          </form>
          <p>
            New to LocalX? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>

      <div className="auth-image">
        <AuthSlideshow />
      </div>
    </div>
  );
};

export default Login;
