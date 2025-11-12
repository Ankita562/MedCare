// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { fakePatientDetails, fakeMedicines } from "../data/fakeData";
import "./Dashboard.css";

const Dashboard = () => {
  const [patient, setPatient] = useState(fakePatientDetails);
  const [meds, setMeds] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Fetch medicines from fake API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.medicines.list();
        setMeds(res.data || fakeMedicines);
      } catch (err) {
        console.error("Error loading medicines:", err);
      }
    };
    fetchData();
  }, []);

  // Apply dark mode globally
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Derived alerts based on patient and medicines
  const alerts = [];
  if (patient.age > 60)
    alerts.push("👵 Elderly Mode: Frequent reminders & emergency alerts.");
  alerts.push("⏰ It’s time for your next checkup (last: 2025-08-15)");
  if (meds.some((m) => m.name === "Vitamin D3"))
    alerts.push("⚠️ 1 medicine expiring soon.");

  return (
    <div className="dashboard-page">
      {/* 🧍‍♂️ Patient Info */}
      <section className="section patient-info">
        <h2>Good afternoon, {patient.name}!</h2>
        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phone}</p>
        <p>Age: {patient.age}</p>
      </section>

      {/* 🚨 Alerts Section */}
      <section className="section alerts-section">
        <h2>Health Alerts</h2>
        <div className="alerts">
          {alerts.map((a, i) => (
            <div key={i} className="alert">
              {a}
            </div>
          ))}
        </div>
      </section>

      {/* 💊 Medicines Section */}
      <section className="section medicines-section">
        <h2>My Medicines</h2>
        <Link to="/medicines/new" className="add-medicine">
          + Add Medicine
        </Link>

        <div className="medicine-grid">
          {meds.map((med) => (
            <div key={med.id} className="medicine-card">
              <h3>{med.name}</h3>
              <div className="dosage">{med.dosage}</div>
              <p>{med.notes}</p>
              <p>{med.frequency}</p>
              <Link to={`/medicines/${med.id}`} className="edit-link">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ⚙️ Quick Actions */}
      <section className="section">
        <h2>Quick Actions</h2>
        <div className="actions">
          <Link to="/appointments" className="action-btn">
            📅 Book Appointment
          </Link>
          <Link to="/scan-report" className="action-btn">
            📄 Scan Report
          </Link>
          <Link to="/timeline" className="action-btn">
            🕒 View Timeline
          </Link>
          <Link to="/analytics" className="action-btn">
            📊 Analytics
          </Link>
          <Link to="/contacts" className="action-btn">
            🚨 Emergency Contacts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


