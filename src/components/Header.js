import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const { userData, isAdminLoggedIn, setUserData, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setIsAdminLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky-header">
      <div className="logo">NAVI BUS</div>

      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/get-started">Get Started</Link>
        <Link to="/ContactUs">Contact Us</Link> {/* ✅ Added Contact Us link */}
        {isAdminLoggedIn && <Link to="/busdetails">Bus Details</Link>}
        {userData && <Link to="/account">Account</Link>}
        {userData && <Link to="/busroute">Bus Route</Link>}
      </nav>

      <div className="auth-buttons">
        {isAdminLoggedIn ? (
          <>
            <span className="welcome-msg">Welcome, Admin</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : userData ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <button onClick={onLoginClick} className="login-btn">User Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
