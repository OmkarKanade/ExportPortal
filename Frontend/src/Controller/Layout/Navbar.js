import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="Header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8gPyOfRdsRtvKSGnT1tosE5gbhB7maF2XA&usqp=CAU"
        alt="no img"
        className="src"
      ></img>
      <div className="HeaderButtons">
        <Link to="/" className="href">
          Home
        </Link>
        <Link to="/about" className="href">
          AboutUs
        </Link>
        <Link to="/login" className="href">
          Login
        </Link>
      </div>
    </header>
  );
}
