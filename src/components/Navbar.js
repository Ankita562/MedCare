// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLogout, isLoggedIn, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔁 Toggle dark/light mode
  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    document.body.classList.toggle("light", !newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // 🚪 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* ===== Brand ===== */}
      <div className="brand" onClick={() => navigate("/")}>
        MedCare <span>+</span>
      </div>

      {/* ===== Mobile Menu Toggle ===== */}
      <button
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* ===== Nav Links ===== */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/timeline" onClick={() => setMenuOpen(false)}>
          Timeline
        </NavLink>
        <NavLink to="/analytics" onClick={() => setMenuOpen(false)}>
          Analytics
        </NavLink>
        <NavLink to="/medical-history" onClick={() => setMenuOpen(false)}>
          History
        </NavLink>
        <NavLink to="/reports" onClick={() => setMenuOpen(false)}>
          Reports
        </NavLink>
        <NavLink to="/contacts" onClick={() => setMenuOpen(false)}>
          Contacts
        </NavLink>
        <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>
          Doctors
        </NavLink>
      </div>

      {/* ===== Right Side (Dark Mode + User Menu) ===== */}
      <div className="nav-right">
        <button className="mode-btn" onClick={toggleMode}>
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        <div className="user-dropdown">
          <button className="user-btn" aria-haspopup="true">
            👤
          </button>
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

