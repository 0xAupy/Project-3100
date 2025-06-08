import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Home.css";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/reports")
      .then((res) => setReports(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load reports");
      });
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>All Crime Reports</h2>
        <Link to="/reports/new" className="new-report-btn">
          + New Report
        </Link>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="reports-list">
        {reports.map((report) => (
          <Link
            key={report._id}
            to={`/reports/${report._id}`}
            className="report-card"
          >
            <h3>{report.title}</h3>
            <p>{report.description.slice(0, 100)}…</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
