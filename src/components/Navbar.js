import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="nav">
      <div>
        <strong>MedCare</strong>
      </div>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/medical-history">History</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
