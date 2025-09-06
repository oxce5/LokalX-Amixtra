import React from "react";
import "../components/Auth.css";
import AuthSlideshow from "../components/AuthSlideshow";

const Signup: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
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

      <div className="auth-image">
        <AuthSlideshow />
      </div>
    </div>
  );
};

export default Signup;
