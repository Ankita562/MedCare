import React, { useState } from "react";
import { api } from "../api";
import "./Dashboard.css";

const AddEditMedicine = () => {
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.medicines.create(form);
    alert("Medicine added successfully!");
    setForm({ name: "", dosage: "", frequency: "", notes: "" });
  };

  return (
    <div className="dashboard-container">
      <h2>Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input
          name="name"
          placeholder="Medicine Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="dosage"
          placeholder="Dosage (e.g. 500mg)"
          value={form.dosage}
          onChange={handleChange}
        />
        <input
          name="frequency"
          placeholder="Frequency (e.g. Twice a day)"
          value={form.frequency}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn primary">
          💾 Save Medicine
        </button>
      </form>
    </div>
  );
};

export default AddEditMedicine;
