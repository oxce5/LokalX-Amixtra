import React from "react";

interface SignInFormProps {
  onSwitchToSignup: () => void;
  onSignIn: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignup, onSignIn }) => (
  <div style={{ margin: "1rem 0" }}>
    <h2>Sign In</h2>
    <input type="text" placeholder="Enter username" style={{ display: "block", margin: "8px 0" }} />
    <input type="password" placeholder="Enter password" style={{ display: "block", margin: "8px 0" }} />
    <button style={{ marginTop: "8px" }} onClick={onSignIn}>Sign In</button>
    <div style={{ marginTop: "8px" }}>
      New to LokalX?{" "}
      <span
        style={{ color: "#2e8b57", cursor: "pointer", textDecoration: "underline" }}
        onClick={onSwitchToSignup}
      >
        Sign up
      </span>
    </div>
  </div>
);

export default SignInForm;
