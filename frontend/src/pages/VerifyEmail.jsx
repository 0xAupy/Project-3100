import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./VerifyEmail.css";

export default function VerifyEmail() {
  const { sendVerifyOtp, verifyEmail } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    try {
      await sendVerifyOtp();
      setMessage("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await verifyEmail({ otp });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  useEffect(() => {
    // Remove top padding for login page
    document.body.classList.add("no-padding-top");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-padding-top");
    };
  }, []);

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>Verify Your Email</h2>
        <button type="button" onClick={handleSendOtp}>
          Send OTP
        </button>
        {message && <p className="message">{message}</p>}
        <form className="verify-form" onSubmit={handleVerify}>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
