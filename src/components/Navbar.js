import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure this file includes styles for active links

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <strong>MedCare</strong>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/medical-history" activeClassName="active">History</NavLink>
        </li>
        <li>
          <NavLink to="/reports" activeClassName="active">Reports</NavLink>
        </li>
        <li>
          <NavLink to="/contacts" activeClassName="active">Contacts</NavLink>
        </li>
        <li>
          <NavLink to="/checkups" activeClassName="active">Checkup Alerts</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}