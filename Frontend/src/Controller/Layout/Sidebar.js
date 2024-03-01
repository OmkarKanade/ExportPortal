import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faPlus, faListAlt, faCertificate, faList } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'Create Customer Account', path: '/create-customerForm', icon: faUser },
    { name: 'Create Vendor Account', path: '/create-vendorForm', icon: faUserTie },
    { name: 'Add new Product', path: '/create-ProductForm', icon: faPlus },
    { name: 'Create Category', path: '/create-Category', icon: faListAlt },
    { name: 'Add Certification', path: '/addCertificate', icon: faCertificate },
    { name: 'Product List', path: '/ProductList', icon: faList }
  ];

  return (
    <div className='app-container'>
      <div className="sidebar">
        <ul className='ul'>
          {lists.map((list, index) => (
            <li key={index} className='lll'>
              <Link to={list.path} className="sidebar-link">
                <FontAwesomeIcon icon={list.icon} className="sidebar-icon" />
                <span className="sidebar-text">{list.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
