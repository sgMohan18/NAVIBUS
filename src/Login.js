// src/Login.js
import React, { useState } from 'react';
import './App.css';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('user');
  const [busNo, setBusNo] = useState('');
  const [gsmNo, setGsmNo] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'gps') {
      onLogin({ type: 'gps', busNo, gsmNo });
    } else {
      onLogin({ type: 'user', name, mobile });
    }
  };

  return (
    <div className="login-container">
      <div className="login-toggle">
        <button onClick={() => setMode('user')} className={mode === 'user' ? 'active' : ''}>User</button>
        <button onClick={() => setMode('gps')} className={mode === 'gps' ? 'active' : ''}>GPS Tracker</button>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        {mode === 'gps' ? (
          <>
            <input
              type="text"
              placeholder="Bus Number"
              value={busNo}
              onChange={(e) => setBusNo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="GSM Number"
              value={gsmNo}
              onChange={(e) => setGsmNo(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
} 
