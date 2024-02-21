import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'Create Customer Account', path: '/create-customerForm' },
    { name: 'Create Vendor Account', path: '/create-vendorForm' },
  ];

  return (
    <div className='app-container'>
    <div className="sidebar">
      <ul>
        {lists.map((list, index) => (
          <li key={index}>{list.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
