import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './csiderbar.css';

const Sidebar = () => {
  const lists = [
    { name: 'View Profile', path: '/customer-profile', icon: faUser },
    // { name: 'View Products', path: '/customer-id', icon: faList },
    { name: 'Products List', path: '/cProductList', icon: faBoxOpen }
  ];

  return (
    <div className="csidebar">
      <ul className='cul'>
        {lists.map((list, index) => (
          <li key={index} className='clll'>
            <Link to={list.path}>
              <FontAwesomeIcon icon={list.icon} className="csidebar-icon" />
              <span>{list.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
