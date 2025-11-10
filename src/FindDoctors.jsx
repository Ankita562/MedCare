import React, { useState } from "react";
import "./CommonPage.css";

const FindDoctors = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  // 🧠 Handles Google redirect with small popup
  const handleGoogleRedirect = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowCheck(true);
      setTimeout(() => {
        window.open(
          "https://www.google.com/maps/search/doctors+near+me",
          "_blank",
          "noopener,noreferrer"
        );
        setShowPopup(false);
        setShowCheck(false);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="common-page-container">
      <h1>👨‍⚕️ Find Doctors</h1>
      <p className="subtitle">
        Instantly find nearby doctors, clinics, and hospitals using Google Maps.
      </p>

      <button className="primary-btn" onClick={handleGoogleRedirect}>
        🌍 Open in Google Maps
      </button>

      <div className="coming-box">
        <p>✨ More advanced search features (by specialty & ratings) coming soon!</p>
      </div>

      {/* ✅ Redirect Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {!showCheck ? (
              <>
                <div className="spinner"></div>
                <p>Redirecting to Google Maps...</p>
              </>
            ) : (
              <>
                <div className="checkmark">✅</div>
                <p>All set! Opening Google Maps...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDoctors;
