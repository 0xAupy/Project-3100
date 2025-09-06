import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";
import { Mail, Lock, Eye, EyeOff, Users, AlertTriangle } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  useEffect(() => {
    document.body.classList.add("no-padding-top");
    return () => {
      document.body.classList.remove("no-padding-top");
    };
  }, []);

  return (
    <div className="login-page">
      <div className="layout-root">
        <div className="login-wrapper">
          <div className="login-header">
            <h1>Crime Alert</h1>
            <p>Stay alert and stay safe from crimes around you</p>
          </div>

          <div className="stats-banner">
            <div className="stat-item">
              <Users size={16} color="#c62828" />
              <span>10K+ Reports</span>
            </div>
            <div className="stat-item">
              <AlertTriangle size={16} color="#c62828" />
              <span>24/7 Platform Availability</span>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-icon">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
            <p className="forgot-password">
              <a href="/reset-password">Forgot password?</a>
            </p>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-btn">
              Log In to Dashboard
            </button>

            <p className="form-footer">
              Don't have an account? <a href="/register">Sign up here</a>
            </p>
          </form>
          <p className="footer-note">
            © 2025 CrimeAlert. Keeping communities safe together.
          </p>
        </div>
      </div>
    </div>
  );
}
