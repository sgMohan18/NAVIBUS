import React, { useState } from 'react';
import './TrackerLoginPopup.css';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const TrackerLoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setTrackerData, setIsAdminLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email !== 'mohanexternal@gmail.com') {   //sgMohan18@
        await signOut(auth);
        setError('Access denied: Not an authorized tracker.');
        return;
      }

      const data = {
        id: user.uid,
        email: user.email,
      };
      setTrackerData(data);
      localStorage.setItem('trackerData', JSON.stringify(data));
      setIsAdminLoggedIn(true);
      setError('');
      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Tracker login error:', err);
      setError('Invalid credentials');
      setSuccess(false);
    }
  };

  return (
    <div className="tracker-login-popup">
      <div className="tracker-popup-content">
        <h2>Tracker Login</h2>
        <input
          type="email"
          placeholder="Tracker Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="tracker-error">{error}</p>}
        {success && <p className="tracker-success">✅ Successful login</p>}
        <div className="popup-buttons">
          <button className="tracker-login-button" onClick={handleLogin}>Login</button>
          <button className="tracker-popup-close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
};

export default TrackerLoginPopup;