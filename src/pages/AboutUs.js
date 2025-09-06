// src/pages/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Optional for styling, you can add your custom styles here.

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Wavy Background Section */}
      <div className="wavy-bg"></div>
      
      <div className="about-content">
        <h1>About NAVI BUS</h1>
        <div className="bus-wrapper">
          <img src="/assets/bus.png" alt="Bus" className="bus-img" />
          <div className="text-content">
            <p>
              NAVI BUS is dedicated to providing an easy, reliable, and efficient bus navigation
              experience. Our goal is to help commuters track buses in real-time, save time, and improve
              their travel experience.
            </p>

            <h2>Our Mission</h2>
            <p>
              At NAVI BUS, our mission is to ensure that every commuter can easily access real-time
              bus tracking and reliable travel information. We are passionate about making transportation
              seamless, user-friendly, and timely.
            </p>

            <h2>Our Vision</h2>
            <p>
              We envision a world where bus navigation is simplified, giving people the power to make
              informed travel decisions. NAVI BUS is committed to contributing to the future of smart
              transportation and urban mobility.
            </p>

            <h2>How NAVI BUS Works</h2>
            <p>
              With our advanced GPS tracking system, each bus is equipped with a GPS tracker, which
              sends live data to the cloud. This data is displayed on the NAVI BUS platform, enabling
              commuters to track bus locations, view arrival times, and plan their journeys more
              effectively.
            </p>

            <h2>Contact Us</h2>
            <p>
              For any inquiries or feedback, feel free to reach out to us at <strong>support@navibus.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
