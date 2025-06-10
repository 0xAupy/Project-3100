// src/components/StatsCard.jsx
import React from "react";
import "./StatsCard.css";

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}
