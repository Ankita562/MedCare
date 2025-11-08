import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './AddEditMedicine.css';

export default function AddEditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (id) {
      api.medicines.get(id).then((r) => {
        if (r.data) {
          setName(r.data.name);
          setDosage(r.data.dosage);
          setNotes(r.data.notes);
          setReminders(r.data.reminders || []);
        }
      });
    }
  }, [id]);

  const addReminder = () =>
    setReminders((prev) => [
      ...prev,
      { id: Date.now().toString(), time: '08:00', days: ['Daily'] },
    ]);

  const updateReminder = (rid, field, val) =>
    setReminders((prev) =>
      prev.map((x) => (x.id === rid ? { ...x, [field]: val } : x))
    );

  const removeReminder = (rid) =>
    setReminders((prev) => prev.filter((x) => x.id !== rid));

  const submit = async (e) => {
    e.preventDefault();
    const payload = { name, dosage, notes, reminders };
    if (id) await api.medicines.update(id, payload);
    else await api.medicines.create(payload);
    navigate('/dashboard');
  };

  return (
    <div className="med-form-container">
      <div className="med-form-card">
        <div className="form-header">
          <h2>{id ? '✏️ Edit Medicine' : '➕ Add Medicine'}</h2>
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <form onSubmit={submit} className="medicine-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. Paracetamol"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Dosage</label>
            <input
              type="text"
              placeholder="e.g. 500mg"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Notes</label>
            <input
              type="text"
              placeholder="Any specific instructions?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="reminder-section">
            <h4>⏰ Reminders</h4>
            {reminders.map((r) => (
              <div key={r.id} className="reminder-card">
                <input
                  type="time"
                  value={r.time}
                  onChange={(e) => updateReminder(r.id, 'time', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Days (e.g. Mon, Wed, Fri)"
                  value={Array.isArray(r.days) ? r.days.join(', ') : r.days}
                  onChange={(e) =>
                    updateReminder(
                      r.id,
                      'days',
                      e.target.value.split(',').map((s) => s.trim())
                    )
                  }
                />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeReminder(r.id)}
                >
                  ✖
                </button>
              </div>
            ))}
            <button type="button" className="btn-add-reminder" onClick={addReminder}>
              + Add Reminder
            </button>
          </div>

          <div className="form-actions">
            <button className="btn-save" type="submit">
              💾 Save Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
