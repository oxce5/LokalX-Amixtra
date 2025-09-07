import React, { useState } from "react";
import "../components/Auth.css";
import AuthSlideshow from "../components/AuthSlideshow";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Save token (localStorage/sessionStorage/context)
        localStorage.setItem("token", data.token);
        // Redirect to main app/profile page
        navigate("/profile");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="auth-content">
          <h2>Welcome back</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log in</button>
          </form>
          {error && <div className="auth-error">{error}</div>}
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
