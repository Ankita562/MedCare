// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

// Icons
import {
  Home,
  Calendar,
  BarChart3,
  History,
  FileChartColumn,
  Users,
  Plus,
  MessageCircle,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = ({
  onLogout,
  isLoggedIn,
  darkMode,
  setDarkMode,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  // Toggle Sidebar
  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    setSidebarOpen(newState);
  };

  // Toggle Theme
  const toggleMode = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    document.body.classList.toggle("dark-mode", newState);
    document.body.classList.toggle("light-mode", !newState);
    localStorage.setItem("darkMode", newState);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      {/* Sidebar Toggle */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {open ? "←" : "→"}
      </button>

      {/* Brand */}
      <div className="sidebar-brand" onClick={() => navigate("/")}>
        MedCare <span style={{ color: "#c8925c" }}>+</span>
      </div>

      {/* NAVIGATION */}
      <div className="sidebar-links">
        <NavItem to="/dashboard" icon={<Home />} text="Dashboard" open={open} />
        <NavItem to="/timeline" icon={<Calendar />} text="Timeline" open={open} />
        <NavItem to="/analytics" icon={<BarChart3 />} text="Analytics" open={open} />
        <NavItem to="/medical-history" icon={<History />} text="History" open={open} />
        <NavItem to="/reports" icon={<FileChartColumn />} text="Reports" open={open} />
        <NavItem to="/contacts" icon={<Users />} text="Contacts" open={open} />
        <NavItem to="/doctors" icon={<Plus />} text="Doctors" open={open} />
        <NavItem to="/chatbot" icon={<MessageCircle />} text="Chatbot" open={open} />
      </div>

      {/* BOTTOM SECTION */}
      <div className="sidebar-bottom">

        {/* Dark Mode Button */}
        <button className="mode-btn" onClick={toggleMode}>
          {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* USER BOX */}
        <div className="user-box">

          {isLoggedIn ? (
            <>
              <NavItem
                to="/profile"
                icon={<User />}
                text="Profile"
                open={open}
              />

              <button className="logout-btn" onClick={handleLogout}>
                <LogOut className="icon" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavItem
              to="/login"
              icon={<User />}
              text="Login"
              open={open}
            />
          )}

        </div>
      </div>
    </div>
  );
};

/* Reusable Nav Item */
const NavItem = ({ to, icon, text, open }) => (
  <div className="tooltip-wrapper">
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      <span className="icon">{icon}</span>
      <span>{text}</span>
    </NavLink>

    {!open && <div className="tooltip">{text}</div>}
  </div>
);

export default Navbar;

