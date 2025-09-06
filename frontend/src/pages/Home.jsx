import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import CrimeTypeChart from "../components/charts/CrimeTypeChart";
import ReportsOverTimeChart from "../components/charts/ReportsOverTimeChart";
import ActiveVsResolvedChart from "../components/charts/ActiveVsResolvedChart";
import TopAreasChart from "../components/charts/TopAreasChart";

import "./Home.css";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [error, setError] = useState("");

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

  const dhakaAreas = [
    "Gulshan",
    "Dhanmondi",
    "Banani",
    "Uttara",
    "Mirpur",
    "Mohammadpur",
    "Tejgaon",
    "Motijheel",
    "Old Dhaka",
    "Bashundhara",
  ];

  useEffect(() => {
    api
      .get("/reports")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(sorted);
        setFilteredReports(sorted);
      })

      .catch((err) => {
        console.error(err);
        setError("Failed to load reports");
      });
  }, []);

  useEffect(() => {
    const filtered = reports.filter((report) => {
      const title = report.title || "";
      const description = report.description || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType
        ? report.crimeType === selectedType
        : true;
      const matchesArea = selectedArea ? report.area === selectedArea : true;

      return matchesSearch && matchesType && matchesArea;
    });

    setFilteredReports(filtered);
  }, [searchTerm, selectedType, selectedArea, reports]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Stats Section */}
        <div className="charts-container">
          <div className="chart-card">
            <h4>Crime Types</h4>
            <div className="chart-wrapper">
              <CrimeTypeChart />
            </div>
          </div>
          <div className="chart-card">
            <h4>Reports Over Time</h4>
            <div className="chart-wrapper">
              <ReportsOverTimeChart />
            </div>
          </div>
          <div className="chart-card">
            <h4>Active vs Resolved</h4>
            <div className="chart-wrapper">
              <ActiveVsResolvedChart />
            </div>
          </div>
          {/* <div className="chart-card">
            <h4>Top Areas</h4>
            <div className="chart-wrapper">
              <TopAreasChart />
            </div>
          </div> */}
        </div>

        {/* Search and Filters */}
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Crime Types</option>
            {crimeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">All Areas</option>
            {dhakaAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <Link to="/reports/new" className="new-report-btn">
            + New Report
          </Link>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Report List */}
        <div className="reports-list">
          {filteredReports.length === 0 ? (
            <p className="no-results">No reports match your criteria.</p>
          ) : (
            filteredReports.map((report) => (
              <Link
                key={report._id}
                to={`/reports/${report._id}`}
                className="report-card expanded"
              >
                <h3 className="report-title">{report.title || "(No Title)"}</h3>

                <div className="report-meta">
                  <span className="badge">{report.crimeType} </span>
                  <span className="badge light">
                    {report.area || report.location}
                  </span>
                </div>

                <p className="report-description">
                  {report.description.length > 250
                    ? report.description.slice(0, 250) + "…"
                    : report.description}
                </p>

                <div className="report-footer">
                  <span>
                    <strong>Reported by:</strong>{" "}
                    {report.userId?.name || "Anonymous"}
                  </span>
                  <br />
                  <span>
                    <strong>On:</strong>{" "}
                    {new Date(report.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
