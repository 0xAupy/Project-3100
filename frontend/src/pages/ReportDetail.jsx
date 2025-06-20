// src/pages/ReportDetail.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./ReportDetail.css";

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/reports/${id}`)
      .then((res) => setReport(res.data))
      .catch(() => setError("Failed to load report"));

    api
      .get(`/reports/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch(() => setError("Failed to load comments"));
  }, [id]);

  const handleDeleteReport = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await api.delete(`/reports/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete report");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/reports/${id}/comments`, {
        comment: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/reports/${id}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete comment");
    }
  };

  function getBBoxFromCoords(coordString) {
    const [lat, lng] = coordString.split(",").map(Number);
    const delta = 0.002;
    return `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  }

  if (!report) return <div className="detail-container">Loading…</div>;

  return (
    <>
      <Navbar />
      <div className="detail-container">
        <h2 style={{ marginBottom: "8px" }}>
          {report.crimeType} — {report.area}
        </h2>

        {report.location && report.location.includes(",") && (
          <div className="map-preview-container">
            <iframe
              title="map-preview"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "8px", marginBottom: "16px" }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${getBBoxFromCoords(
                report.location
              )}&layer=mapnik&marker=${report.location}`}
            />
          </div>
        )}

        <p>{report.description}</p>
        <small>Reported on {new Date(report.createdAt).toLocaleString()}</small>

        {user && report.userId === user.id && (
          <button className="delete-report-btn" onClick={handleDeleteReport}>
            Delete Report
          </button>
        )}

        <section className="comments-section">
          <h3>Comments</h3>
          {error && <p className="error">{error}</p>}

          {comments.map((c) => (
            <div key={c._id} className="comment">
              <p>{c.comment}</p>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
              {user && c.userId._id === user.id && (
                <button onClick={() => handleDeleteComment(c._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}

          {user ? (
            <form className="comment-form" onSubmit={handleAddComment}>
              <textarea
                placeholder="Add a comment…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button type="submit">Post Comment</button>
            </form>
          ) : (
            <p>Please log in to leave a comment.</p>
          )}
        </section>
      </div>
    </>
  );
}
