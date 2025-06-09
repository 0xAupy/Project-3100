import { useState, useContext } from "react";
import { Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import logoImage from "../assets/shield.png"; // adjust the path if needed

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
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-circle">
          <img src={logoImage} alt="Logo" className="logo-img" />
        </div>
        <span className="navbar-brand">CrimeAlert</span>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/reports/new">Report Crime</Link>
        <Link to="/safety-tips">Safety Tips</Link>

        {/* notification icon here */}
        {/* <button className="icon-button">
          <Bell size={20} />
        </button> */}

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
                  <Link to="/profile">View Profile</Link>
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
  );
}
