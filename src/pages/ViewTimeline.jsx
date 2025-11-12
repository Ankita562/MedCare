// src/pages/ViewTimeline.js
import React, { useEffect, useState } from "react";
import "./ViewTimeline.css";
import { fakeTimeline } from "../data/fakeData";

const typeIcons = {
  appointment: "📅",
  report: "📄",
  medicine: "💊",
  update: "⚙️",
};

const ViewTimeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    // 🕓 Sort timeline from newest → oldest
    const sorted = [...fakeTimeline].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setTimeline(sorted);
  }, []);

  return (
    <div className="timeline-page-container">
      <h1>🕒 Health Timeline</h1>
      <p className="subtitle">
        Track your medical journey — appointments, reports, and updates all in one place.
      </p>

      {timeline.length === 0 ? (
        <p className="empty-timeline">No records found yet.</p>
      ) : (
        <div className="timeline-container">
          {timeline.map((event) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-dot">
                {typeIcons[event.type] || "📌"}
              </div>
              <div className="timeline-content card fade-in">
                <h3>{event.title}</h3>
                <p className="event-desc">{event.description}</p>
                <p className="event-date">
                  🗓 {new Date(event.date).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTimeline;
