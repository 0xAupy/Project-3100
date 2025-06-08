// src/pages/NewReport.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./NewReport.css";

export default function NewReport() {
  const [form, setForm] = useState({
    crimeType: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const crimeTypes = [
    "Theft",
    "Assault",
    "Burglary",
    "Vandalism",
    "Fraud",
    "Drug Offense",
    "Homicide",
    "Cybercrime",
    "Domestic Violence",
    "Road Accident",
    "Other",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/reports", form);
      setSuccess("Report created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create report");
    }
  };

  return (
    <div className="new-report-container">
      <form className="new-report-form" onSubmit={handleSubmit}>
        <h2>Create New Report</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label htmlFor="crimeType">Crime Type</label>
        <select
          id="crimeType"
          name="crimeType"
          value={form.crimeType}
          onChange={handleChange}
          required
        >
          <option value="">Select a type</option>
          {crimeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
