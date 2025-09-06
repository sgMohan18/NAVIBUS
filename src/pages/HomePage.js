import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

import LogInPopup from '../components/LogInPopup';
import SignUpPopup from '../components/SignUpPopup';
import TrackerLoginPopup from '../components/TrackerLoginPopup';
import CityCard from '../components/CityCard';
import FeatureCard from '../components/FeatureCard';

import './HomePage.css';

const cities = [
  { name: 'Salem', image: '/assets/cities/salem.png' },
  { name: 'Bengaluru', image: '/assets/cities/dharmapuri.png' },
  { name: 'Coimbatore', image: '/assets/cities/coimbatore.png' },
  { name: 'Chennai', image: '/assets/cities/chennai.png' },
  { name: 'Madurai', image: '/assets/cities/madurai.png' },
  { name: 'Trichy', image: '/assets/cities/trichy.png' },
];

const features = [
  {
    title: 'Live Bus Tracking',
    image: '/assets/features/feature1.png',
    description: 'Track your bus in real-time and know exactly when it will arrive.',
  },
  {
    title: 'Mobile Ticketing',
    image: '/assets/features/feature2.png',
    description: 'Buy bus tickets directly from your mobile device.',
  },
  {
    title: 'Time Saver',
    image: '/assets/features/feature3.png',
    description: 'Save more time with our travel plans.',
  },
];

const HomePage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showTrackerLoginPopup, setShowTrackerLoginPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { userData, setUserData, isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();

  const handleOpenLogin = () => {
    setShowLoginPopup(true);
    setShowSignUpPopup(false);
    setShowTrackerLoginPopup(false);
  };

  const handleOpenSignUp = () => {
    setShowSignUpPopup(true);
    setShowLoginPopup(false);
    setShowTrackerLoginPopup(false);
  };

  const handleOpenTrackerLogin = () => {
    setShowTrackerLoginPopup(true);
    setShowLoginPopup(false);
    setShowSignUpPopup(false);
  };

  const handleClosePopups = () => {
    setShowLoginPopup(false);
    setShowSignUpPopup(false);
    setShowTrackerLoginPopup(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUserData(null);
      setIsAdminLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="header-left">
          <div className="logo">NAVI</div>
          <div
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bar" />
            <div className="bar" />
          </div>
          <nav className={`menu ${menuOpen ? 'show' : ''}`}>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/ContactUs" onClick={() => setMenuOpen(false)}>ContactUs</Link>
            {isAdminLoggedIn ? (
              <Link to="/busdetails" onClick={() => setMenuOpen(false)}>Bus Details</Link>
            ) : userData ? (
              <>
                <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
                <Link to="/busroute" onClick={() => setMenuOpen(false)}>Bus Route</Link>
              </>
            ) : null}
          </nav>
        </div>

        <div className="auth-buttons">
          {isAdminLoggedIn ? (
            <>
              <span className="welcome-msg">Welcome, Admin</span>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : userData ? (
            <>
              <span className="welcome-msg">Welcome, {userData.name || 'User'}</span>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleOpenLogin}>User Login</button>
              <button className="login-btn" onClick={handleOpenTrackerLogin}>Admin Login</button>
            </>
          )}
        </div>
      </header>

      {/* Popups */}
      {showLoginPopup && (
        <LogInPopup
          onClose={handleClosePopups}
          onSwitchToSignUp={handleOpenSignUp}
        />
      )}
      {showSignUpPopup && (
        <SignUpPopup
          onClose={handleClosePopups}
          onSwitchToLogin={handleOpenLogin}
        />
      )}
      {showTrackerLoginPopup && (
        <TrackerLoginPopup onClose={handleClosePopups} />
      )}

      {/* Hero Section */}
      <main className="home-page">
        <section className="hero">
          <h1>Never Wait at the Bus Stop Ever Again</h1>
          <p>Take control of your daily travel by knowing the live location and arrival time of your bus.</p>
          <Link to="/get-started">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </section>

        {/* Cities Section */}
        <section className="cities">
          <h2>Cities We Serve</h2>
          <div className="city-grid center-align">
            {cities.map((city) => (
              <CityCard key={city.name} name={city.name} image={city.image} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Choose NAVI BUS</h2>
          <div className="feature-grid center-align">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                image={feature.image}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Name:Mohanakumar Sugavasan</p>
            <p>Email: inworldaitechnologies@gmail.com</p>
            <p>Address: Final year Student, Department of ECE, GCE Dharmapuri</p>
            <p>Mobile Number: +91 7835497552</p>
          </div>

          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/facebook.png" alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/twitter.png" alt="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/instagram.png" alt="Instagram" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/linkedin.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="footer-section legal">
            <h3>Legal</h3>
            <Link to="/privacy">Privacy Policy</Link><br />
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
