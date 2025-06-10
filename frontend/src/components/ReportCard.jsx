// src/components/ReportCard.jsx
import React from "react";
import "./ReportCard.css";

export default function ReportCard({ report }) {
  const date = new Date(report.createdAt).toLocaleDateString();
  return (
    <div className="report-card">
      <h4>{report.crimeType}</h4>
      <p className="area">{report.area || "Unknown area"}</p>
      <p className="date">{date}</p>
    </div>
  );
}
