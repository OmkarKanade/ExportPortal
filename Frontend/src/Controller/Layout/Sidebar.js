import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'Create Customer Account', path: '/create-customerForm' },
    { name: 'Create Vendor Account', path: '/create-vendorForm' },
    { name: 'Create Product', path: '/create-ProductForm'},
    { name: 'Create Category', path: '/create-Category'},
    { name: 'Add Certification', path: '/addCertificate'},
    { name: 'Product List', path: '/ProductList'}
  ];

  return (
    <div className='app-container'>
      <div className="sidebar">
        <ul className='ul'>
          {lists.map((list, index) => (
            <li key={index} className='lll'>
              <Link to={list.path}>{list.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

