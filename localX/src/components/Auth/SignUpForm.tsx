import React from "react";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => (
  <div style={{ margin: "1rem 0" }}>
    <h2>Sign Up</h2>
    <p>Sign up and let your creativity eXpress, eXchange, and eXcel.</p>
    <input type="text" placeholder="Enter username" style={{ display: "block", margin: "8px 0" }} />
    <input type="email" placeholder="Enter email address" style={{ display: "block", margin: "8px 0" }} />
    <input type="password" placeholder="Enter password" style={{ display: "block", margin: "8px 0" }} />
    <button style={{ marginTop: "8px" }}>Sign Up</button>
    <div style={{ marginTop: "8px" }}>
      Already have an account?{" "}
      <span
        style={{ color: "#2e8b57", cursor: "pointer", textDecoration: "underline" }}
        onClick={onSwitchToLogin}
      >
        Log in here
      </span>
    </div>
  </div>
);

export default SignUpForm;
