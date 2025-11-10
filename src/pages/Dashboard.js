// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api"; // ✅ correct path (since api.js is in src/)
import { fakePatientDetails } from "../data/fakeData"; // ✅ data folder is also inside src/
import "./Dashboard.css"; // ✅ CSS in same folder as Dashboard.js

/** ===========================
 *  🏥 Dashboard Page
 *  ===========================
 */
const Dashboard = () => {
  const [meds, setMeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );
  const navigate = useNavigate();

  /** 🌐 Fetch medicines */
  useEffect(() => {
    let active = true;
    api.medicines
      .list()
      .then((res) => active && setMeds(res.data || []))
      .catch((err) => console.error('Failed to load medicines:', err));
    return () => (active = false);
  }, []);

  /** ⏳ Auto logout after 30 mins */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.confirm('Session expired. Return to login?')) {
        navigate('/login', { replace: true });
      }
    }, 30 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  /** 💡 Persist dark mode */
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  /** 👤 User details with fallback */
  const safe = (v, fallback = '') => (v && v !== 'null' ? v : fallback);
  const name = safe(localStorage.getItem('userName'), fakePatientDetails.name);
  const email = safe(localStorage.getItem('userEmail'), fakePatientDetails.email);
  const number = safe(localStorage.getItem('userNumber'), fakePatientDetails.emergencyContact.phone);
  const age = Number(localStorage.getItem('userAge')) || fakePatientDetails.age;
  const lastCheckup = safe(localStorage.getItem('lastCheckup'), fakePatientDetails.lastCheckup);

  /** 🕒 Greeting */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  /** 💊 Helpers */
  const daysUntilExpiry = (date) =>
    Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = (date) => daysUntilExpiry(date) <= 7;

  /** 🩺 Checkup Logic */
  const needsCheckup = () => {
    const last = new Date(lastCheckup);
    const now = new Date();
    const monthsSince =
      (now.getFullYear() - last.getFullYear()) * 12 +
      now.getMonth() - last.getMonth();

    if (age >= 60 && monthsSince >= 3) return true;
    if (age >= 5 && age < 60 && monthsSince >= 12) return true;
    return false;
  };

  /** 🔍 Filter Medicines */
  const filteredMeds = meds.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiringCount = meds.filter(
    (m) => m.expiryDate && isExpiringSoon(m.expiryDate)
  ).length;

  /** ===========================
   *  🧩 JSX Layout
   *  ===========================
   */
  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      {/* 🌗 Theme Toggle */}
      <div className="theme-toggle">
        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* 👤 User Info */}
      <div className="user-info">
        <h2>{getGreeting()}, {name}!</h2>
        <p>Email: {email}</p>
        <p>Phone: {number}</p>
        <p>Age: {age}</p>

        {/* 🎭 User Mode */}
        {age < 5 && (
          <div className="role-banner infant">
            👶 Infant Mode: Guardian-managed reminders and pediatric checkups.
          </div>
        )}
        {age >= 60 && (
          <div className="role-banner elderly">
            👵 Elderly Mode: Daily alerts, quarterly checkups, and emergency access.
          </div>
        )}
        {age >= 5 && age < 60 && (
          <div className="role-banner general">
            🧑 General Mode: Annual checkups and flexible medicine tracking.
          </div>
        )}

        {/* ⚠️ Alerts */}
        {needsCheckup() && (
          <div className="checkup-alert">
            ⏰ It's been a while since your last checkup ({lastCheckup}). Consider scheduling one soon!
          </div>
        )}
        {expiringCount > 0 && (
          <div className="expiry-summary">
            ⚠️ {expiringCount} medicine{expiringCount > 1 ? 's' : ''} expiring within 7 days.
          </div>
        )}
      </div>

      {/* ⚡ Quick Actions */}
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/appointments')}>📅 Book Appointment</button>
        <button onClick={() => navigate('/scan-report')}>🧾 Scan Report</button>
        <button onClick={() => navigate('/medicines/new')}>💊 Add Medicine</button>
        <button onClick={() => navigate('/timeline')}>📜 View Timeline</button>
        <button onClick={() => navigate('/analytics')}>📊 Analytics</button>
        <button onClick={() => navigate('/doctors')}>👨‍⚕️ Find Doctors</button>
        <button onClick={() => navigate('/contacts')}>🚨 Emergency Contacts</button>
      </div>

      {/* 🔍 Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 💊 Medicines */}
      <div className="dashboard-header">
        <h2>My Medicines</h2>
        <Link to="/medicines/new" className="add-btn">+ Add Medicine</Link>
      </div>

      {filteredMeds.length === 0 ? (
        <p className="empty-text">No medicines found. Try searching by name or add a new one!</p>
      ) : (
        <div className="meds-grid">
          {filteredMeds.map((m) => (
            <div key={m.id} className="med-card">
              <div className="med-header">
                <h3 className="med-title">{m.name}</h3>
                {m.dosage && <span className="dosage-tag">{m.dosage}</span>}
              </div>

              {m.expiryDate && isExpiringSoon(m.expiryDate) && (
                <div className="expiry-warning">
                  ⚠️ Expires in {daysUntilExpiry(m.expiryDate)} days
                </div>
              )}

              <p className="med-notes">{m.notes || 'No notes added.'}</p>

              <div className="reminders">
                {m.reminders?.length > 0 ? (
                  m.reminders.map((r) => (
                    <div key={r.id} className="reminder-item">
                      {r.time} — <span className="days">{r.days?.join(', ')}</span>
                    </div>
                  ))
                ) : (
                  <div className="reminder-item none">No reminders set.</div>
                )}
              </div>

              <div className="card-footer">
                <Link to={`/medicines/${m.id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
