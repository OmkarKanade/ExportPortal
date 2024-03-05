import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faPlus, faListAlt, faCertificate, faList, faBook,  faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');

  const lists = [
    { name: 'Create Account', items: [
      { name: 'Customer Account', path: '/create-customerForm', icon: faUser },
      { name: 'Vendor Account', path: '/create-vendorForm', icon: faUserTie }
    ]},
    { name: 'Manage Product', items: [
      { name: 'Add new Product', path: '/create-ProductForm', icon: faPlus },
      { name: 'Product Catalog', path: '/product-catalog', icon: faBook },
      { name: 'Product List', path: '/ProductList', icon: faList }
    ]},
    { name: 'Create Category', path: '/create-Category', icon: faListAlt },
    { name: 'Add Certification', path: '/addCertificate', icon: faCertificate }
  ];

  const toggleSubMenu = (menuName) => {
    setActiveMenu(menuName === activeMenu ? '' : menuName);
  };

  return (
    <div className={`lg:w-64 bg-gray-200 text-gray border-2 leading-9 border-gray-400 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="lg:block hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold"></h1>
        </div>
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              {list.items ? (
                <div>
                  <div className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => toggleSubMenu(list.name)}>
                    <FontAwesomeIcon icon={list.items[0].icon} className="mr-3" />
                    <span>{list.name}</span>
                    <FontAwesomeIcon icon={activeMenu === list.name ? faChevronUp : faChevronDown} className="mr-3 ml-2" />
                  </div>
                  {activeMenu === list.name && (
                    <ul>
                      {list.items.map((item, idx) => (
                        <li key={idx}>
                          <Link to={item.path} className={`flex items-center px-8 py-2 hover:bg-gray-400 ${location.pathname === item.path ? 'bg-gray-400' : ''}`}>
                            <FontAwesomeIcon icon={item.icon} className="mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={list.path} className={`flex items-center px-4 py-2 hover:bg-gray-400 ${location.pathname === list.path ? 'bg-gray-400' : ''}`}>
                  <FontAwesomeIcon icon={list.icon} className="mr-3" />
                  <span>{list.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="flex justify-between items-center p-4">
          {/* <h1 className="text-2xl font-bold">Menu</h1> */}
        </div>
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              {list.items ? (
                <div>
                  <div className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => toggleSubMenu(list.name)}>
                    <FontAwesomeIcon icon={list.items[0].icon} className="mr-3" />
                    <span>{list.name}</span>
                    <FontAwesomeIcon icon={activeMenu === list.name ? faChevronUp : faChevronDown} className="mr-3 ml-2" />
                  </div>
                  {activeMenu === list.name && (
                    <ul>
                      {list.items.map((item, idx) => (
                        <li key={idx}>
                          <Link to={item.path} className={`flex items-center px-8 py-2 hover:bg-gray-400 ${location.pathname === item.path ? 'bg-gray-400' : ''}`}>
                            <FontAwesomeIcon icon={item.icon} className="mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={list.path} className={`flex items-center px-4 py-2 hover:bg-gray-400 ${location.pathname === list.path ? 'bg-gray-400' : ''}`}>
                  <FontAwesomeIcon icon={list.icon} className="mr-3" />
                  <span>{list.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
