import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'View Profile', path: '/vendor-Profile' },
    { name: 'View Assigned Products', path: '/assigned-products'},
  ];

  return (
    <div className='app-container'>
      <div className="sidebar">
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              <Link to={list.path}>{list.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;