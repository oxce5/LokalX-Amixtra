import React, { useState } from "react";
import Logo from "./Logo";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Slideshow from "./Slideshow";
import HomePage from "../Home/HomePage";

const AuthPage: React.FC = () => {
  const [page, setPage] = useState<"signup" | "login">("signup");
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) {
    return <HomePage />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Side */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <Logo />
        {page === "signup" ? (
          <SignUpForm onSwitchToLogin={() => setPage("login")} />
        ) : (
          <SignInForm
            onSwitchToSignup={() => setPage("signup")}
            onSignIn={() => setSignedIn(true)}
          />
        )}
      </div>
      {/* Right Side */}
      <div style={{ flex: 1, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Slideshow />
      </div>
    </div>
  );
};

export default AuthPage;
