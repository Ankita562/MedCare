import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    api.medicines.list().then((r) => setMeds(r.data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>💊 My Medicines</h2>
        <Link to="/medicines/new" className="add-btn">
          + Add Medicine
        </Link>
      </div>

      {meds.length === 0 ? (
        <p className="empty-text">No medicines added yet. Click “Add Medicine” to get started!</p>
      ) : (
        <div className="meds-grid">
          {meds.map((m) => (
            <div key={m.id} className="med-card">
              <div className="med-header">
                <h3 className="med-title">{m.name}</h3>
                <span className="dosage-tag">{m.dosage}</span>
              </div>
              <p className="med-notes">{m.notes || 'No notes added.'}</p>

              <div className="reminders">
                {m.reminders && m.reminders.length > 0 ? (
                  m.reminders.map((r) => (
                    <div key={r.id} className="reminder-item">
                      ⏰ {r.time} — <span className="days">{r.days?.join(', ')}</span>
                    </div>
                  ))
                ) : (
                  <div className="reminder-item none">No reminders set.</div>
                )}
              </div>

              <div className="card-footer">
                <Link to={`/medicines/${m.id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

