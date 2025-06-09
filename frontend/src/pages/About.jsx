import React from "react";
import {
  Shield,
  Users,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import "./About.css";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>About Crime Alert</h1>
            <p className="hero-subtitle">
              Empowering communities through transparent crime reporting and
              safety awareness
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p>
                  Crime Alert is dedicated to creating safer communities by
                  providing a platform where citizens can report crimes, share
                  safety information, and stay informed about local incidents.
                  We believe that transparency and community engagement are key
                  to reducing crime and improving public safety.
                </p>
                <p>
                  Our platform serves as a bridge between law enforcement and
                  the community, facilitating better communication and faster
                  response times to incidents that matter to you and your
                  neighbors.
                </p>
              </div>
              <div className="mission-icon">
                <Shield size={120} className="shield-icon" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2>How We Help</h2>
            <div className="features-grid">
              <div className="feature-card">
                <AlertTriangle size={48} className="feature-icon" />
                <h3>Crime Reporting</h3>
                <p>
                  Report incidents quickly and anonymously to help law
                  enforcement and warn your community about potential dangers.
                </p>
              </div>
              <div className="feature-card">
                <Users size={48} className="feature-icon" />
                <h3>Community Alerts</h3>
                <p>
                  Stay informed about crimes in your area with real-time
                  notifications and community-driven safety updates.
                </p>
              </div>
              <div className="feature-card">
                <MapPin size={48} className="feature-icon" />
                <h3>Location-Based Safety</h3>
                <p>
                  Get safety information specific to your neighborhood and
                  surrounding areas to make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Reports Submitted</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Communities Served</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Platform Availability</p>
              </div>
              <div className="stat-item">
                <h3>99%</h3>
                <p>User Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <h2>Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <Phone size={32} className="contact-icon" />
                <h3>Emergency</h3>
                <p>For immediate emergencies, always call 999</p>
              </div>
              <div className="contact-card">
                <Clock size={32} className="contact-icon" />
                <h3>Support Hours</h3>
                <p>
                  Sunday - Thursday: 8AM - 6PM
                  <br />
                  Weekend: 9AM - 4PM
                </p>
              </div>
              <div className="contact-card">
                <MapPin size={32} className="contact-icon" />
                <h3>Address</h3>
                <p>
                  Level 9, Simple Tree GSR
                  <br />
                  Gulshan-2, Dhaka-1212
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Join Our Community</h2>
            <p>
              Help make your neighborhood safer by reporting incidents and
              sharing safety information.
            </p>
            {/* <button className="cta-button">Get Started</button> */}
          </div>
        </section>
      </div>
    </>
  );
}
