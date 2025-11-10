// src/pages/DoctorAppointment.js
import React, { useState } from "react";
import "./DoctorAppointment.css";

const DoctorAppointment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  // 🧠 Handles Apollo redirect with confirmation popup
  const handleApolloRedirect = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowCheck(true);
      setTimeout(() => {
        window.open(
          "https://www.apollo247.com/book-appointment",
          "_blank",
          "noopener,noreferrer"
        );
        setShowPopup(false);
        setShowCheck(false);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="appointment-page-container">
      <div className="appointment-card">
        <h1>📅 Doctor Appointment</h1>
        <p className="subtitle">
          Schedule your medical consultations easily and conveniently.
        </p>

        <div className="options">
          <button className="primary-btn" onClick={handleApolloRedirect}>
            🩺 Book via Apollo
          </button>

          <button
            className="secondary-btn"
            onClick={() => alert("Manual booking feature coming soon!")}
          >
            💊 Add Appointment Manually
          </button>
        </div>

        <div className="coming-soon">
          <p>✨ Coming soon: Search doctors by specialty, availability, and location.</p>
        </div>
      </div>

      {/* ✅ Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {!showCheck ? (
              <>
                <div className="spinner"></div>
                <p>Redirecting to Apollo Booking Portal...</p>
              </>
            ) : (
              <>
                <div className="checkmark">✅</div>
                <p>All set! Opening Apollo...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
