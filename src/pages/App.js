// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Auth from './pages/Auth';
import PatientDetailsForm from './pages/PatientDetailsForm';
import AppointmentChoice from './pages/AppointmentChoice';
import Dashboard from './pages/Dashboard';
import AddEditMedicine from './pages/AddEditMedicine';
import MedicalHistory from './pages/MedicalHistory';
import MedicalReports from './pages/MedicalReports';
import EmergencyContacts from './pages/EmergencyContacts';
import DoctorAppointment from './pages/DoctorAppointment';
import ScanReport from './pages/ScanReport';

import { fakePatientDetails } from './data/fakeData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [patientInfo, setPatientInfo] = useState(fakePatientDetails);
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Auth onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Auth onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/details" element={isLoggedIn ? <PatientDetailsForm onSubmit={() => setDetailsSubmitted(true)} /> : <Navigate to="/login" />} />
          <Route path="/next-step" element={detailsSubmitted ? <AppointmentChoice /> : <Navigate to="/details" />} />
          <Route path="/dashboard" element={<Dashboard patient={patientInfo} />} />
          <Route path="/medicines/new" element={<AddEditMedicine />} />
          <Route path="/medicines/:id" element={<AddEditMedicine />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/reports" element={<MedicalReports />} />
          <Route path="/contacts" element={<EmergencyContacts />} />
          <Route path="/appointments" element={<DoctorAppointment />} />
          <Route path="/scan-report" element={<ScanReport />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;