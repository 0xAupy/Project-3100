import { useState, useContext } from "react";
import { Bell, User, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
// import logoImage from "../assets/shield.png"; // adjust the path if needed

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleProfileCard = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <AlertTriangle size={24} className="warning-icon" />
          <Link to="/">
            <span className="navbar-brand">Crime Alert</span>
          </Link>
        </div>

        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/reports/new">Report Crime</Link>
          <Link to="/safety-tips">Safety Tips</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="navbar-right">
          <button className="icon-button">
            <Bell size={20} />
          </button>

          <div className="profile-wrapper">
            <button className="icon-button" onClick={toggleProfileCard}>
              <User size={20} />
            </button>

            {showProfile && (
              <div className="profile-card">
                {user ? (
                  <>
                    <p>
                      <strong>{user.name}</strong>
                    </p>
                    <p>{user.email}</p>
                    <hr />
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p>Not logged in</p>
                    <Link to="/login">Login</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="emergency-banner">
        For emergencies, always call 999. This platform is for non-emergency
        reporting only.
      </div>
    </>
  );
}
