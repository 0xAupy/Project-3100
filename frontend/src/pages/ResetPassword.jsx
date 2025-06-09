import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Mail,
  Lock,
  Shield,
  AlertTriangle,
  Users,
  KeyRound,
} from "lucide-react";
import "./Login.css"; // Reuse the Login styles for consistency
import logoImage from "../assets/shield.png"; // same logo as login

export default function ResetPassword() {
  const { sendResetOtp, resetPassword } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    try {
      await sendResetOtp(email);
      setMessage("Reset OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword({ email, otp, newPassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="layout-root">
      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo-circle">
            <img src={logoImage} alt="Logo" className="logo-img" />
          </div>
          <h1>Crime Alert</h1>
          <p>Stay alert and stay safe from crimes around you</p>
        </div>

        <div className="stats-banner">
          <div className="stat-item">
            <Users size={16} color="#c62828" />
            <span>50K+ Active Users</span>
          </div>
          <div className="stat-item">
            <AlertTriangle size={16} color="#c62828" />
            <span>Real-time Alerts</span>
          </div>
        </div>

        {step === 1 ? (
          <div className="login-form">
            {error && <p className="error-text">{error}</p>}
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="submit-btn" onClick={handleSendOtp}>
              Send Reset OTP
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleReset}>
            {message && <p className="message">{message}</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="form-group">
              <label>Enter OTP</label>
              <div className="input-icon">
                <KeyRound size={18} />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="input-icon">
                <Lock size={18} />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Reset Password
            </button>
          </form>
        )}

        <p className="form-footer">
          Remembered your password? <a href="/login">Go back to login</a>
        </p>
        <p className="footer-note">
          © 2025 CrimeAlert. Keeping communities safe together.
        </p>
      </div>
    </div>
  );
}
