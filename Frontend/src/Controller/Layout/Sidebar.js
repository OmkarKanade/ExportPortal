import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const lists = [
    { name: 'Create Customer Account', path: '/create-customerForm' },
    { name: 'Create Vendor Account', path: '/create-vendorForm' },
    { name: 'Create Product', path: '/create-ProductForm'},
    { name: 'Create Category', path: '/create-Category'}
  ];

  return (
    <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'bar1-open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'bar2-open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'bar3-open' : ''}`}></div>
      </div>
      <div className="sidebar">
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              <Link to={list.path} onClick={() => setMenuOpen(false)}>
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
