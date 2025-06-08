import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { sendResetOtp, resetPassword } = useContext(AuthContext);
  const [step, setStep] = useState(1); // 1: send OTP, 2: reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    try {
      await sendResetOtp();
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
      await resetPassword({ otp, newPassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        {step === 1 ? (
          <>
            <button type="button" onClick={handleSendOtp}>
              Send Reset OTP
            </button>
          </>
        ) : (
          <form className="reset-form" onSubmit={handleReset}>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
