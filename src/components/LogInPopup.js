import React, { useState } from 'react';
import './LogInPopup.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // ✅ NEW

const LogInPopup = ({ onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ NEW

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!');
      setLoading(false);

      setTimeout(() => {
        setSuccess('');
        onClose(); // Close popup after showing success
        navigate('/'); // ✅ Redirect to homepage
      }, 1500);
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?{' '}
          <span className="switch-link" onClick={onSwitchToSignUp}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LogInPopup;
