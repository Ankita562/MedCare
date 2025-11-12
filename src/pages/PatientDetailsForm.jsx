import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "./PatientDetailsForm.css";

const PatientDetailsForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    allergies: "",
    contact: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("patientDetails");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.warn("Invalid patientDetails data in localStorage");
      }
    }
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.age || !formData.contact) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Save locally + in mock API
      localStorage.setItem("patientDetails", JSON.stringify(formData));
      await api.patient.submit(formData);

      setMessage("✅ Details saved successfully!");
      if (onSubmit) onSubmit();

      // Navigate to next step
      setTimeout(() => navigate("/next-step"), 1000);
    } catch (error) {
      console.error("❌ Error submitting patient details:", error);
      setMessage("❌ Failed to save details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="patient-form fade-in">
      <h1>🧑‍⚕️ Patient Information</h1>
      <p className="form-subtitle">Please enter your medical details carefully.</p>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Saving..." : "💾 Save & Continue"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </main>
  );
};

export default PatientDetailsForm;
