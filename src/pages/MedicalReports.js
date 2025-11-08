import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function MedicalReports() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.reports.list().then((res) => setReports(res.data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const newReport = {
      id: Date.now().toString(),
      title,
      url: URL.createObjectURL(file),
    };

    setReports([...reports, newReport]);
    setTitle('');
    setFile(null);
  };

  return (
    <div className="container">
      <h2>Medical Reports</h2>

      <form onSubmit={handleUpload} className="card" style={{ maxWidth: 500 }}>
        <input
          className="input"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ height: 10 }} />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div style={{ height: 10 }} />

        <button className="btn btn-primary">Upload</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {reports.map((r) => (
          <div key={r.id} className="card" style={{ maxWidth: 500 }}>
            <h3>{r.title}</h3>
            <img
              src={r.url}
              alt={r.title}
              style={{ width: '100%', borderRadius: 8 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
