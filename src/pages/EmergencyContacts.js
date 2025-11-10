import React, { useEffect, useState } from "react";
import { api } from "../api";
import "./Dashboard.css";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", relation: "", phone: "" });

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await api.contacts.list();
      setContacts(res.data);
    };
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.contacts.create(form);
    setContacts([...contacts, res.data]);
    setForm({ name: "", relation: "", phone: "" });
  };

  return (
    <div className="dashboard-container">
      <h2>🚨 Emergency Contacts</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          name="relation"
          placeholder="Relation"
          value={form.relation}
          onChange={(e) => setForm({ ...form, relation: e.target.value })}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button className="btn primary">➕ Add Contact</button>
      </form>

      <ul className="medicine-list">
        {contacts.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.relation} 📞 {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyContacts;
