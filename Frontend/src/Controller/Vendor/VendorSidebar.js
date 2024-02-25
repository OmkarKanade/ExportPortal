import React from 'react';
import { Link } from 'react-router-dom';
import './vsidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'View Profile', path: '/vendor-Profile' },
    { name: 'View Assigned Products', path: '/vendor-assignedProducts'},
  ];

  return (
      <div className="vsidebar">
        <ul className='vul'>
          {lists.map((list, index) => (
            <li key={index} className='vlll'>
              <Link to={list.path}>{list.name}</Link>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;