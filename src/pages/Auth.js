// src/pages/Auth.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || (mode !== "forgot" && !password)) {
      alert("Please fill in all required fields.");
      return;
    }

    if (mode === "forgot") {
      alert(`Password reset link sent to ${email}`);
      setMode("login");
      return;
    }

    // Fake login/signup success
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Create Account"
            : "Forgot Password"}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode !== "forgot" && (
            <>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="auth-btn main-btn">
            {mode === "login"
              ? "Login"
              : mode === "signup"
              ? "Sign Up"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="btn-group">
          {mode !== "login" && (
            <button
              type="button"
              className="switch-btn"
              onClick={() => setMode("login")}
            >
              Go to Login
            </button>
          )}
          {mode !== "signup" && (
            <button
              type="button"
              className="switch-btn"
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
          )}
          {mode !== "forgot" && (
            <button
              type="button"
              className="switch-btn"
              onClick={() => setMode("forgot")}
            >
              Forgot Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
