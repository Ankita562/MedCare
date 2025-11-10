import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './PatientDetailsForm.css';

const PatientDetailsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    allergies: '',
    contact: '',
    email: ''
  });

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('patientDetails');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.warn('Invalid patientDetails in localStorage');
      }
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('patientDetails', JSON.stringify(formData));
    try {
      await api.patient.submit(formData);
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Failed to submit patient details:', error);
    }
  };

  return (
    <main className="patient-form">
      <h1>🧑‍⚕️ Enter Patient Details</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Full Name
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Weight (kg)
          <input
            name="weight"
            type="number"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Allergies (if any)
          <input
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </label>

        <label>
          Contact Number
          <input
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">💾 Save & Continue</button>
      </form>
    </main>
  );
};

export default PatientDetailsForm;