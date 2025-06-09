import React, { useState } from "react";
import {
  Home,
  Car,
  Smartphone,
  Users,
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";
import "./SafetyTips.css";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary

export default function SafetyTips() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [expandedTip, setExpandedTip] = useState(null);

  const categories = [
    { id: "home", name: "Home Safety", icon: Home },
    { id: "personal", name: "Personal Safety", icon: Shield },
    { id: "vehicle", name: "Vehicle Safety", icon: Car },
    { id: "digital", name: "Digital Safety", icon: Smartphone },
    { id: "public", name: "Public Safety", icon: Users },
  ];

  const safetyTips = {
    home: [
      {
        title: "Secure Your Entry Points",
        summary:
          "Always lock doors and windows when leaving home or going to sleep.",
        details: [
          "Install deadbolt locks on all exterior doors",
          "Use door and window alarms for added security",
          "Consider smart locks for remote monitoring",
          "Install security cameras at entry points",
          "Use motion-sensor lights around entrances",
        ],
      },
      {
        title: "Home Security System",
        summary: "Install a comprehensive security system to deter burglars.",
        details: [
          "Choose a system with 24/7 monitoring",
          "Place security signs and stickers visibly",
          "Install door and window sensors",
          "Use security cameras with night vision",
          "Test your system regularly",
        ],
      },
      {
        title: "Emergency Preparedness",
        summary: "Keep emergency supplies and have an evacuation plan.",
        details: [
          "Maintain a first aid kit and emergency supplies",
          "Create and practice a family evacuation plan",
          "Keep important documents in a fireproof safe",
          "Have flashlights and battery-powered radio ready",
          "Know your neighbors and local emergency contacts",
        ],
      },
    ],
    personal: [
      {
        title: "Stay Alert and Aware",
        summary:
          "Always be conscious of your surroundings and trust your instincts.",
        details: [
          "Avoid wearing headphones in isolated areas",
          "Make eye contact with people around you",
          "Trust your gut feelings about situations",
          "Stay in well-lit, populated areas when possible",
          "Keep your phone charged and accessible",
        ],
      },
      {
        title: "Walking Safety",
        summary: "Take precautions when walking alone, especially at night.",
        details: [
          "Walk confidently and with purpose",
          "Stick to well-traveled, well-lit routes",
          "Carry a whistle or personal alarm",
          "Let someone know your route and expected arrival time",
          "Avoid shortcuts through isolated areas",
        ],
      },
      {
        title: "Self-Defense Basics",
        summary:
          "Learn basic self-defense techniques and carry legal protection.",
        details: [
          "Take a self-defense or martial arts class",
          "Carry legal self-defense tools (pepper spray, whistle)",
          "Practice situational awareness techniques",
          "Learn to identify and avoid potential threats",
          "Know how to break free from common grabs",
        ],
      },
    ],
    vehicle: [
      {
        title: "Vehicle Security",
        summary: "Protect your vehicle from theft and break-ins.",
        details: [
          "Always lock your car, even for short stops",
          "Never leave valuables visible in your car",
          "Park in well-lit, busy areas when possible",
          "Don't leave your car running unattended",
          "Consider installing an anti-theft system",
        ],
      },
      {
        title: "Safe Driving Practices",
        summary:
          "Drive defensively and stay alert to avoid accidents and carjacking.",
        details: [
          "Keep doors locked while driving",
          "Be aware of your surroundings at traffic lights",
          "Don't pick up hitchhikers or approach stranded motorists alone",
          "If followed, drive to a police station or busy public place",
          "Keep your gas tank at least half full",
        ],
      },
      {
        title: "Parking Safety",
        summary:
          "Choose safe parking locations and be alert when returning to your vehicle.",
        details: [
          "Park close to building entrances when possible",
          "Look around and under your car before approaching",
          "Have your keys ready before reaching your vehicle",
          "If you feel unsafe, ask for a security escort",
          "Report suspicious activity to security or police",
        ],
      },
    ],
    digital: [
      {
        title: "Password Security",
        summary: "Use strong, unique passwords for all your accounts.",
        details: [
          "Create complex passwords with mixed characters",
          "Use different passwords for each account",
          "Enable two-factor authentication when available",
          "Use a reputable password manager",
          "Change passwords if you suspect a breach",
        ],
      },
      {
        title: "Social Media Safety",
        summary: "Protect your privacy and personal information online.",
        details: [
          "Review and adjust privacy settings regularly",
          "Don't share location information in real-time",
          "Be cautious about what personal information you post",
          "Don't accept friend requests from strangers",
          "Report and block suspicious or harassing accounts",
        ],
      },
      {
        title: "Online Fraud Prevention",
        summary: "Recognize and avoid common online scams and fraud attempts.",
        details: [
          "Never give personal information to unsolicited contacts",
          "Verify the legitimacy of websites before entering data",
          "Be skeptical of 'too good to be true' offers",
          "Use secure payment methods for online purchases",
          "Regularly monitor your bank and credit card statements",
        ],
      },
    ],
    public: [
      {
        title: "Crowd Safety",
        summary: "Stay safe in large crowds and public gatherings.",
        details: [
          "Know where exits are located when entering venues",
          "Stay with your group and designate a meeting point",
          "Be aware of crowd dynamics and unusual behavior",
          "Keep personal belongings secure",
          "Follow instructions from security and law enforcement",
        ],
      },
      {
        title: "Public Transportation",
        summary:
          "Take precautions when using buses, trains, and other public transport.",
        details: [
          "Stay alert and aware of your surroundings",
          "Sit near the driver or conductor when possible",
          "Keep bags and valuables close to your body",
          "Have your phone charged and accessible",
          "Trust your instincts about fellow passengers",
        ],
      },
      {
        title: "ATM and Banking Safety",
        summary:
          "Protect yourself when using ATMs and conducting banking business.",
        details: [
          "Use ATMs in well-lit, busy locations",
          "Shield your PIN when entering it",
          "Be aware of people nearby who might be watching",
          "Don't count cash in public",
          "Report suspicious activity around ATMs immediately",
        ],
      },
    ],
  };

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="safety-tips-page">
        {/* Safe Section */}
        <section className="safe-section">
          <div className="safe-content">
            <AlertTriangle size={64} className="safe-icon" />
            <h1>Safety Tips & Guidelines</h1>
            <p>
              Essential safety information to help keep you and your community
              safe
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="main-content">
          <div className="container">
            {/* Category Navigation */}
            <div className="category-nav">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`category-btn ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <IconComponent size={24} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tips Content */}
            <div className="tips-content">
              <h2 className="category-title">
                {categories.find((cat) => cat.id === activeCategory)?.name} Tips
              </h2>

              <div className="tips-list">
                {safetyTips[activeCategory]?.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <div
                      className="tip-header"
                      onClick={() => toggleTip(index)}
                    >
                      <h3>{tip.title}</h3>
                      <div className="tip-summary">
                        <p>{tip.summary}</p>
                        {expandedTip === index ? (
                          <ChevronUp size={20} className="expand-icon" />
                        ) : (
                          <ChevronDown size={20} className="expand-icon" />
                        )}
                      </div>
                    </div>

                    {expandedTip === index && (
                      <div className="tip-details">
                        <ul>
                          {tip.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Section */}
        <section className="emergency-section">
          <div className="container">
            <div className="emergency-content">
              <div className="emergency-text">
                <h2>In Case of Emergency</h2>
                <div className="emergency-numbers">
                  <div className="emergency-number">
                    <h3>911</h3>
                    <p>Police, Fire, Medical Emergency</p>
                  </div>
                  <div className="emergency-number">
                    <h3>109</h3>
                    <p>Violence & Abuse</p>
                  </div>
                  <div className="emergency-number">
                    <h3>1098</h3>
                    <p>Child Protection</p>
                  </div>
                </div>
              </div>
              <div className="emergency-tips">
                <h3>Emergency Preparedness</h3>
                <ul>
                  <li>Keep emergency numbers posted in visible locations</li>
                  <li>Maintain a well-stocked first aid kit</li>
                  <li>Have flashlights and batteries readily available</li>
                  <li>Keep important documents in a fireproof safe</li>
                  <li>Practice emergency evacuation routes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Report Section */}
        <section className="report-section">
          <div className="container">
            <div className="report-content">
              <MapPin size={48} className="report-icon" />
              <h2>Report a Crime or Safety Concern</h2>
              <p>
                If you witness a crime or have safety concerns in your area,
                report them to help keep your community safe.
              </p>
              <button className="report-button">
                <a href="/reports/new"></a>Report Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
