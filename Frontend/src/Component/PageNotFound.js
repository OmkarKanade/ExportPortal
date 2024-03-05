import React from 'react';
import { Link } from "react-router-dom";
import PageNotFoundImage from './PageNotFound.png'; // Import the image

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container mx-auto">
        <div className="pcontainer bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-red-600">404 Page Not Found</h1>
            <p className="text-gray-600">We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
            <ul className="mt-4">
              <li><Link to="/" className="text-blue-600 hover:text-blue-800">Go to Homepage</Link></li>
            </ul>
          </div>
          <div className="text-center">
            <img className="w-64 h-auto" src={PageNotFoundImage} alt="Page Not Found" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
