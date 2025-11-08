import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AddEditMedicine from './pages/AddEditMedicine';
import MedicalHistory from './pages/MedicalHistory';
import MedicalReports from './pages/MedicalReports';
import EmergencyContacts from './pages/EmergencyContacts';

function App() {
  return (
    <div className="app-container">
      {/* Common layout */}
      <Navbar />
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicines/new" element={<AddEditMedicine />} />
          <Route path="/medicines/:id" element={<AddEditMedicine />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/reports" element={<MedicalReports />} />
          <Route path="/contacts" element={<EmergencyContacts />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
