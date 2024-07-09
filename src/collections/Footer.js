import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="footer-sections">
          <div className="footer-section">
            <h5>About Us</h5>
            <p>We are a leading e-commerce platform providing a wide range of products to meet all your needs.</p>
          </div>
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="https://policies.google.com/terms?hl=en-US">Terms and conditions</Link></li>
              <li><Link to="https://policies.google.com/privacy?hl=en-US">privacy polocy</Link></li>
              
            </ul>
          </div>
          <div className="footer-section">
            <h5>Contact Us</h5>
            <p>Email:myntra@example.com</p>
            <p>Phone: +91 45667 78908</p>
            <p>Address: gachibowli,hyderabad near vijay pg anjayah nagar 506132</p>
          </div>
          <div className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter/></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><CiInstagram/></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} myntra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
