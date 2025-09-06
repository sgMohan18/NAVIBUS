import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUpPopup.css';

const SignUpPopup = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, mobile, password, confirmPassword } = formData;
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    if (!/^\d{10}$/.test(mobile)) {
      return 'Mobile number must be 10 digits.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      });

      setSuccess('Account created successfully!');
      setTimeout(() => {
        setSuccess('');
        onSwitchToLogin(); // Switch to login popup after showing success
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <form onSubmit={handleSubmit}>
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
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
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
          <button type="submit">Register</button>
        </form>
        <p className="switch-text">
          Already have an account?{' '}
          <span className="switch-link" onClick={onSwitchToLogin}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPopup;
