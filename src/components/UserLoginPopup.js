// src/components/UserLoginPopup.js
import React, { useState } from 'react';
import './UserLoginPopup.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const UserLoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      navigate('/');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>User Sign In</h2>
        <form onSubmit={handleLogin}>
          <label>Email (Gmail):</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Login</button>
        </form>
        <p className="signup-redirect">
          New user? <a href="/sign-up">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default UserLoginPopup;
