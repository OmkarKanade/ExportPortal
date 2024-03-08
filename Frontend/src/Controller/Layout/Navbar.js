import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Navbar() {
  return (
    <header className="bg-sky-700 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8gPyOfRdsRtvKSGnT1tosE5gbhB7maF2XA&usqp=CAU"
          alt="no img"
          className="w-12 h-12 rounded-full"
        />
        <nav className="space-x-10 mr-5">
          <Link to="/" className="text-white hover:text-gray-300 mr-50px">
            Home
          </Link>
          <Link to="/aboutus" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
