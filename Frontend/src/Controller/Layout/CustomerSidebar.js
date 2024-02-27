import React from 'react';
import { Link } from 'react-router-dom';
import './csiderbar.css';

const Sidebar = () => {
  const lists = [
    { name: 'View Profile', path: '/customer-profile' },
    // { name: 'View Products', path: '/customer-id'},
    { name: 'Products List', path: '/cProductList'}
  ];

  return (
    <div className="csidebar">
      <ul className='cul'>
        {lists.map((list, index) => (
          <li key={index} className='clll'>
            <Link to={list.path}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
