import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp, getApps } from 'firebase/app';

import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import GetStarted from './pages/GetStarted';
import AccountPage from './pages/AccountPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import TrackerLogin from './pages/TrackerLogin';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';   // ✅ Global layout with Header

import { AuthProvider } from './context/AuthContext';

import BusDetailsPage from './components/BusDetailsPage';
import BusRoute from './components/BusRoute';
import BusMapPage from './pages/BusMapPage';
import ContactUs from './pages/ContactUs';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA9F8lRsoGw7e_GEUf8jRF7BwjH41H88v0",
  authDomain: "navi-bus-7d6bb.firebaseapp.com",
  projectId: "navi-bus-7d6bb",
  storageBucket: "navi-bus-7d6bb.appspot.com",
  messagingSenderId: "1083785954102",
  appId: "1:1083785954102:web:299f1db4010c2b7ea9a997",
};

// Initialize Firebase only once
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Homepage WITHOUT global Header */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ All other pages use Layout (with Header) */}
          <Route element={<Layout />}>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/tracker-login" element={<TrackerLogin />} />
            <Route path="/bus-map/:id" element={<BusMapPage />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            {/* Admin only route */}
            <Route
              path="/busdetails"
              element={
                <PrivateRoute adminOnly={true}>
                  <BusDetailsPage />
                </PrivateRoute>
              }
            />

            {/* User + Admin protected route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* User Bus Route page */}
            <Route
              path="/busroute"
              element={
                <PrivateRoute>
                  <BusRoute />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
