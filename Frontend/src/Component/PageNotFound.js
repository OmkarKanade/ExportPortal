import React from 'react';
import './PageNotFound.css';
import { Link } from "react-router-dom";
import PageNotFoundImage from './PageNotFound.png'; // Import the image

const PageNotFound = () => {
  return (
    <div className="pcontainer">
      <div className="text">
        <h1>404 Page Not Found</h1>
        <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
        <ul className="menu">
          <li><Link to="/" className="href">Go to Homepage</Link></li>
        </ul>
      </div>
      {/* Use the imported image */}
      <div><img className="image" src={PageNotFoundImage} alt="Page Not Found" /></div>
    </div>
  );
};

export default PageNotFound;
