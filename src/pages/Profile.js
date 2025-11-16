// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SAFE initial user shape
  const userTemplate = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    photo: "",
  };

  const [user, setUser] = useState(userTemplate);
  const [backup, setBackup] = useState(null);

  /* =====================================================
        SAFE USER LOADING — NEVER CRASHES
  ====================================================== */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");

      // If no user → redirect safely
      if (!stored) {
        navigate("/");
        return;
      }

      const parsed = JSON.parse(stored);

      // If invalid structure → replace with template
      if (!parsed || typeof parsed !== "object") {
        localStorage.setItem("user", JSON.stringify(userTemplate));
        setUser(userTemplate);
        return;
      }

      // Auto-fill missing keys (prevents undefined errors)
      const fixedUser = { ...userTemplate, ...parsed };

      setUser(fixedUser);
      localStorage.setItem("user", JSON.stringify(fixedUser));

    } catch (err) {
      console.error("Invalid user data:", err);
      localStorage.setItem("user", JSON.stringify(userTemplate));
      setUser(userTemplate);
    }
  }, [navigate]);

  /* =====================================================
        FORM HANDLERS
  ====================================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Allow re-upload
  };

  /* =====================================================
        EDIT / SAVE / CANCEL
  ====================================================== */
  const startEditing = () => {
    setBackup({ ...user }); // deep copy
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!user.firstName || !user.lastName || !user.email) {
      alert("First name, last name & email are required.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (backup) setUser({ ...backup });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  /* =====================================================
        COMPONENT UI
  ====================================================== */
  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="profile-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <h2 className="title">My Profile</h2>

        {/* PROFILE PHOTO */}
        <div className="profile-photo-section">
          <motion.div className="photo-wrapper" whileHover={{ scale: 1.05 }}>
            <img
              src={
                user.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="profile-photo"
            />

            {isEditing && (
              <>
                <label htmlFor="photo" className="photo-overlay">
                  Change Photo
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file-input"
                />
              </>
            )}
          </motion.div>
        </div>

        {/* INFORMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? "edit" : "view"}
            initial={{ opacity: 0, x: isEditing ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEditing ? -40 : 40 }}
            transition={{ duration: 0.35 }}
            className={`profile-info ${isEditing ? "editing" : ""}`}
          >
            <div className="row-group">
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>

              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
            </div>

            <label>
              Age
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Gender
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Password
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </motion.div>
        </AnimatePresence>

        {/* BUTTONS */}
        <div className="profile-buttons">
          {!isEditing ? (
            <>
              <button className="edit-btn" onClick={startEditing}>
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* BACK TO DASHBOARD */}
      <motion.button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ⬅ Back to Dashboard
      </motion.button>
    </motion.div>
  );
};

export default Profile;
