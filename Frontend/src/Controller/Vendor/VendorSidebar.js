import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './vsidebar.css';

const Sidebar = () => {
  const lists = [
    { name: 'View Profile', path: '/vendor-Profile', icon: faUser },
    { name: 'View Assigned Products', path: '/vendor-assignedProducts', icon: faBoxOpen },
  ];

  return (
    <div className="vsidebar">
      <ul className='vul'>
        {lists.map((list, index) => (
          <li key={index} className='vlll'>
            <Link to={list.path}>
              <FontAwesomeIcon icon={list.icon} className="vsidebar-icon" />
              <span>{list.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
