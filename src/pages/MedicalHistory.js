import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './MedicalHistory.css';

export default function MedicalHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.history.list().then((res) => setRecords(res.data));
  }, []);

  return (
    <div className="history-page">
      <div className="history-container">
        <h2 className="history-title">🩺 Medical History</h2>
        <p className="history-subtitle">
          View your previous diagnoses, treatments, and health notes.
        </p>

        {records.length === 0 ? (
          <div className="empty-state">
            <p>No medical history records found.</p>
            <p className="empty-hint">Your future records will appear here.</p>
          </div>
        ) : (
          <div className="history-grid">
            {records.map((h) => (
              <div key={h.id} className="history-card">
                <div className="card-header">
                  <h3>{h.title}</h3>
                  <span className="date-tag">{h.date}</span>
                </div>
                <p className="notes">{h.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
