// src/components/SignUp.js
import React, { useState } from 'react';
import './AuthPopup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, mobile, password, confirmPassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) return 'Mobile number must be 10 digits';

    if (password !== confirmPassword) return 'Passwords do not match';

    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userDoc = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        uid: user.uid,
      };
      await setDoc(doc(db, 'users', user.uid), userDoc);
      onSwitchToLogin(); // Switch back to login
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else {
        setError('Sign up failed. Please try again.');
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onSwitchToLogin} title="Close">×</button>
        <h2>Create an Account</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <p className="switch-text">
          Already have an account?{' '}
          <span className="switch-link" onClick={onSwitchToLogin}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
