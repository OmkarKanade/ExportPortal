// Home.js

import React from 'react';
import './home.css';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Our Website!</h1>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Quality Products</li>
          <li>Exceptional Service</li>
          <li>Customer Satisfaction</li>
        </ul>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Home;
