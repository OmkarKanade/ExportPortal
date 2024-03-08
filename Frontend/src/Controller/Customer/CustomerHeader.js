import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="headerr flex justify-between items-center px-4 py-2 h-19 bg-sky-700 text-white">
      <div className='flex items-center'>
        <button onClick={toggleSidebar} className="mr-4">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
        <h1 className="text-3xl font-bold">Customer</h1>
      </div>
      <div className='hidden md:flex'>
        <div className="HeaderButtons">
          <Link
            to="#"
            className="HeaderButton py-1 px-3 mr-5 bg-gray-600 hover:bg-gray-700 rounded-md"
          >
            My Cart
          </Link>
          <Link
            to="/"
            className="HeaderButton py-1 px-3 mr-5 bg-gray-600 hover:bg-red-700 rounded-md"
          >
            Logout
          </Link>
        </div>
      </div>
      <div className='md:hidden'>
        <div className="relative">
          <button className="HeaderButton" onClick={toggleMenu} aria-haspopup="true" aria-expanded={isMenuOpen}>
            <FontAwesomeIcon icon={faEllipsisV} className="text-2xl" />
          </button>
          {isMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <Link
                  to="/getAll-users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  View Users
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
