import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./NewReport.css";

import { AlertTriangle } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationSelector({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

function SearchControl({ onLocationFound }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      searchLabel: "Search for location...",
      style: "bar",
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat } = result.location;
      onLocationFound({ lat, lng });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onLocationFound]);

  return null;
}

export default function NewReport() {
  const [form, setForm] = useState({
    title: "",
    crimeType: "",
    area: "",
    description: "",
    location: "",
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter] = useState([23.8103, 90.4125]); // Dhaka
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (latlng) => {
    setMarkerPosition(latlng);
    setForm({ ...form, location: `${latlng.lat}, ${latlng.lng}` });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("crimeType", form.crimeType);
      formData.append("area", form.area);
      formData.append("description", form.description);
      formData.append("location", form.location);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Report created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create report");
    }
  };

  return (
    <>
      <Navbar />
      <section className="title-section">
        <div className="title-content">
          <h1 className="title-heading">
            <AlertTriangle size={64} className="title-icon" />
            <span>Report a crime</span>
          </h1>
        </div>
      </section>
      <div className="new-report-container">
        {/* Left: Hotline Numbers */}
        <div className="hotline-section">
          <h1>Emergency Hotlines</h1>

          <ul>
            <li>
              <strong>999</strong> – Police, Fire, Ambulance
              <br />
              <span>
                Use this number for any immediate emergency assistance from law
                enforcement, fire brigade, or medical help.
              </span>
            </li>
            <li>
              <strong>109</strong> – Violence Against Women
              <br />
              <span>
                Call this number to report domestic violence, abuse, or seek
                legal and counseling support.
              </span>
            </li>
            <li>
              <strong>121</strong> – City Corporation Info
              <br />
              <span>
                For complaints about city services including waste management,
                water, and sanitation.
              </span>
            </li>
            <li>
              <strong>106</strong> – Anti-Corruption
              <br />
              <span>
                Report bribery, embezzlement, or any form of corruption
                anonymously.
              </span>
            </li>
            <li>
              <strong>16123</strong> – Health Services
              <br />
              <span>
                General health inquiries, doctor consultation, or ambulance
                dispatch information.
              </span>
            </li>
            <li>
              <strong>333</strong> – Govt Services & Info
              <br />
              <span>
                Get help with local government services, social support, or
                administrative queries.
              </span>
            </li>
            <li>
              <strong>16263</strong> – Mental Health
              <br />
              <span>
                Reach professional counselors for mental health support,
                depression, or stress-related issues.
              </span>
            </li>
            <li>
              <strong>16430</strong> – Child HelpLine
              <br />
              <span>
                Protect children from abuse, trafficking, or child labor.
                Connect with child protection officers.
              </span>
            </li>

            <li>
              <strong>12123</strong> – Disaster Response
              <br />
              <span>
                Get information or assistance during floods, cyclones, and other
                natural disasters.
              </span>
            </li>
            <li>
              <strong>9999</strong> – National Anti-Terrorism Hotline
              <br />
              <span>
                Call this number to report suspicious activities, terrorism
                threats, or extremist behavior. Provides direct access to law
                enforcement agencies for urgent security concerns.
              </span>
            </li>
          </ul>
        </div>

        {/* Right: Report Form */}
        <form className="new-report-form" onSubmit={handleSubmit}>
          <h1>Create New Report</h1>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <label htmlFor="title">Report Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a brief title"
            value={form.title}
            onChange={handleChange}
            required
          />

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

          <label htmlFor="area">Nearby Area</label>
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
          >
            <option value="">Select an area</option>
            {dhakaAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <label>Search or Pinpoint Location on Map</label>
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "300px", marginBottom: "12px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <SearchControl onLocationFound={handleLocationSelect} />
            <LocationSelector onLocationSelect={handleLocationSelect} />
            {markerPosition && <Marker position={markerPosition} />}
          </MapContainer>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Report</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
