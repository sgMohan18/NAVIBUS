import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_h2t1hjv",   // Replace with your EmailJS Service ID
        "template_a1669mw",  // Replace with your EmailJS Template ID
        formRef.current,
        "z7uQaule6d_HCgzUk"    // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          alert("Message sent successfully ✅");
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send message ❌, please try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      {/* Left side - Email form */}
      <div className="contact-form">
        <h2>Email Us</h2>
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="user_name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" name="user_email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder="Write your message..." rows="6" required></textarea>
          </div>
          <button type="submit" className="send-btn">Send Message</button>
        </form>
      </div>

      {/* Right side - Social Media */}
      <div className="contact-socials">
        <h2>Follow Us</h2>
        <p>Stay connected with us on social platforms:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
