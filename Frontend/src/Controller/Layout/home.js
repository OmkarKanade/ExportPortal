// Home.js

import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 grid place-items-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Website!</h1>
          <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
          <ul className="list-disc pl-4 mb-4">
            <li>Quality Products</li>
            <li>Exceptional Service</li>
            <li>Customer Satisfaction</li>
          </ul>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;

