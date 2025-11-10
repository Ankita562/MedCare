import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './MedicalHistory.css';

export default function MedicalHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.history.list().then((res) => setRecords(res.data));
  }, []);

  return (
    <main className="history-page">
      <section className="history-container">
        <h1 className="history-title">🩺 Medical History</h1>
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
            {records.map((record) => (
              <article key={record.id} className="history-card">
                <header className="card-header">
                  <h3>{record.title}</h3>
                  <time className="date-tag">{record.date}</time>
                </header>
                <p className="notes">{record.notes}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}