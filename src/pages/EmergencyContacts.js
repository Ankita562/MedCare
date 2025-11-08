import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './EmergencyContacts.css';

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    api.contacts.list().then((res) => setContacts(res.data));
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    if (!name || !relation || !phone) return;
    const newContact = { id: Date.now().toString(), name, relation, phone };
    setContacts([...contacts, newContact]);
    setName('');
    setRelation('');
    setPhone('');
  };

  return (
    <div className="contacts-page">
      <div className="contacts-container">
        <h2 className="contacts-title">🚑 Emergency Contacts</h2>
        <p className="contacts-subtitle">
          Add and manage people to contact during emergencies.
        </p>

        {/* Add contact form */}
        <form onSubmit={addContact} className="contact-form">
          <h3>Add New Contact</h3>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Relation</label>
            <input
              type="text"
              placeholder="e.g. Brother"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="e.g. +1 555-123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-add">
            ➕ Add Contact
          </button>
        </form>

        {/* Contacts list */}
        <div className="contacts-list">
          <h3>Saved Contacts</h3>
          {contacts.length === 0 ? (
            <p className="empty-text">No contacts added yet.</p>
          ) : (
            <div className="contact-grid">
              {contacts.map((c) => (
                <div key={c.id} className="contact-card">
                  <div className="contact-icon">👤</div>
                  <div className="contact-info">
                    <h4>{c.name}</h4>
                    <p className="relation">{c.relation}</p>
                    <p className="phone">📞 {c.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
