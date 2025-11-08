import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  // ------------------------------
  // 🔹 State Variables
  // ------------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ------------------------------
  // 🔹 Navigation
  // ------------------------------
  const navigate = useNavigate();

  // ------------------------------
  // 🔹 Handle Registration
  // ------------------------------
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registered:', { name, email, password });
    navigate('/login');
  };

  // ------------------------------
  // 🔹 JSX (UI)
  // ------------------------------
  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            className="input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div style={{ height: 10 }} />

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ height: 10 }} />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ height: 20 }} />

          <button className="btn btn-primary" type="submit">
            Create Account
          </button>

          <div style={{ marginTop: 10 }} className="small">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
