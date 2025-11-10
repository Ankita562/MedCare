// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Auth from "./pages/Auth";
import PatientDetailsForm from "./pages/PatientDetailsForm";
import AppointmentChoice from "./pages/AppointmentChoice";
import DoctorAppointment from "./pages/DoctorAppointment";
import Dashboard from "./pages/Dashboard";
import AddEditMedicine from "./pages/AddEditMedicine";
import MedicalHistory from "./pages/MedicalHistory";
import EmergencyContacts from "./pages/EmergencyContacts";
import ScanReport from "./pages/ScanReport";
import MedicalReports from "./pages/MedicalReports";
import ViewTimeline from "./pages/ViewTimeline";
import Analytics from "./pages/Analytics";
// ❌ You said you don’t want “Find Doctors” in dashboard, so we exclude it

// Data + API (✅ corrected paths)
import { fakePatientDetails } from "./data/fakeData";
import { api } from "./api";

// Global styles
import "./App.css";

function App() {
  // ------------------ STATE ------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [patientInfo] = useState(fakePatientDetails);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // ------------------ EFFECTS ------------------

  // ✅ Load login state on mount
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  // ✅ Persist login state
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // ✅ Manage dark/light mode on body
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ------------------ HANDLERS ------------------
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // ------------------ RENDER ------------------
  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* 🧭 Navbar */}
      <Navbar
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* 🌐 Page Content */}
      <main style={{ padding: "20px", minHeight: "80vh", overflowX: "hidden" }}>
        <Routes>
          {/* 🏠 Default Redirect */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 🔐 Authentication */}
          <Route
            path="/login"
            element={<Auth onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/register"
            element={<Auth onLogin={() => setIsLoggedIn(true)} />}
          />

          {/* 👤 Patient Details */}
          <Route
            path="/details"
            element={
              isLoggedIn ? (
                <PatientDetailsForm onSubmit={() => setDetailsSubmitted(true)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 💬 Next Step → Appointment Choice */}
          <Route
            path="/next-step"
            element={
              detailsSubmitted ? (
                <AppointmentChoice />
              ) : (
                <Navigate to="/details" replace />
              )
            }
          />

          {/* 🏠 Dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard patient={patientInfo} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 💊 Medicine Management */}
          <Route
            path="/medicines/new"
            element={
              isLoggedIn ? <AddEditMedicine /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/medicines/:id"
            element={
              isLoggedIn ? <AddEditMedicine /> : <Navigate to="/login" replace />
            }
          />

          {/* 🩺 Doctor Appointment */}
          <Route
            path="/appointments"
            element={
              isLoggedIn ? (
                <DoctorAppointment />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 📜 View Timeline */}
          <Route
            path="/timeline"
            element={
              isLoggedIn ? <ViewTimeline /> : <Navigate to="/login" replace />
            }
          />

          {/* 📊 Analytics */}
          <Route
            path="/analytics"
            element={
              isLoggedIn ? <Analytics /> : <Navigate to="/login" replace />
            }
          />

          {/* 🧾 Medical Modules */}
          <Route
            path="/medical-history"
            element={
              isLoggedIn ? <MedicalHistory /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/reports"
            element={
              isLoggedIn ? <MedicalReports /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/scan-report"
            element={
              isLoggedIn ? <ScanReport /> : <Navigate to="/login" replace />
            }
          />

          {/* 🚨 Emergency Contacts */}
          <Route
            path="/contacts"
            element={
              isLoggedIn ? (
                <EmergencyContacts />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 🚫 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 🦶 Footer */}
      <Footer />
    </div>
  );
}

export default App;
