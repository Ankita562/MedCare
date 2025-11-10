import React, { useState, useEffect } from "react";
import "./ScanReport.css";

const ScanReport = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // sync dark/light mode
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // handle file input
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // fake upload simulation
  const handleUpload = () => {
    if (files.length === 0) return alert("Please select a file to upload.");
    setUploading(true);
    setTimeout(() => {
      alert("✅ Files uploaded successfully!");
      setUploading(false);
      setFiles([]);
    }, 1500);
  };

  return (
    <div className={`scan-report-page ${darkMode ? "dark" : "light"}`}>
      <div className="scan-report-container">
        <h1>📄 Scan Report Upload</h1>
        <p>Upload and manage your scanned medical reports easily.</p>

        {/* Drag and Drop Zone */}
        <div
          className={`drop-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>
            {isDragging
              ? "📂 Drop files here"
              : "Drag & drop your reports here or click to upload"}
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleFileSelect}
          />
        </div>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="file-preview">
            {files.map((file, idx) => (
              <div key={idx} className="file-card">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="preview-img"
                  />
                ) : (
                  <div className="pdf-icon">📕</div>
                )}
                <p className="file-name">{file.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "⏳ Uploading..." : "🚀 Upload Reports"}
        </button>

        {/* Mode Toggle */}
        <button
          className="toggle-mode-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default ScanReport;
