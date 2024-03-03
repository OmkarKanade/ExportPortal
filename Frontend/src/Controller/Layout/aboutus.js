import React from 'react';
import Navbar from './Navbar';
import './aboutus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const AboutUsPage = () => {
  return (
    <div className='aboutdiv'><Navbar/>
    <div className="about-us-container">
        
      <h1 class="gradient-text">About Our Export Vendor Portal</h1>

      <p>
        Welcome to our Export Vendor Portal – your gateway to streamlined and efficient international trade. We are dedicated to simplifying the export process for vendors, ensuring seamless communication, and fostering strong business relationships around the globe.
      </p>

      <h2 class="h2">Our Mission</h2>

      <p>
        At Export Vendor Portal, our mission is to empower vendors in the export industry by providing a user-friendly platform that enhances collaboration, transparency, and overall efficiency. We strive to be the go-to solution for vendors looking to expand their reach and optimize their export operations.
      </p>

      <h2 class="h2">Key Features</h2>

      <ul>
        <li>Effortless Communication: Our portal facilitates real-time communication between vendors and stakeholders, fostering a collaborative environment.</li>
        <li>Secure Data Management: We prioritize the security of your data, implementing robust measures to protect sensitive information throughout the export process.</li>
        <li>Intuitive Dashboard: Navigate through your export activities with ease using our intuitive dashboard, providing a comprehensive overview of your operations.</li>
        <li>Document Management: Upload, store, and manage essential export documents securely within the portal, ensuring compliance and easy access.</li>
      </ul>

      <h2 class="h2">Why Choose Export Vendor Portal?</h2>

      <p>
        Our platform stands out due to its commitment to user experience, technological innovation, and dedication to the success of our vendors. Whether you are a seasoned exporter or just starting, Export Vendor Portal is designed to meet your needs and exceed your expectations.
      </p>

      <h2 class="h2">Contact Us</h2>

      <p>
        Have questions or need assistance? Our support team is here to help. Reach out to us at <b>support@exportvendorportal.com</b>, and we'll get back to you promptly.
      </p>

      <p>
        Thank you for choosing Export Vendor Portal for your export endeavors. We look forward to being a part of your success story.
      </p>
    </div>
    <footer className="footer">
    <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGoogle} /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
        <p>&copy; 2024 Export Vendor Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
