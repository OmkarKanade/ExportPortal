import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBoxOpen,
  faBook,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  const lists = [
    { name: "View Profile", path: "/customer-profile", icon: faUser },
    { name: "Products List", path: "/cProductList", icon: faBoxOpen },
    { name: "Product Catalog", path: "/Cproduct-Catalog", icon: faBook },
  ];

  const toggleSubMenu = (menuName) => {
    setActiveMenu(menuName === activeMenu ? "" : menuName);
  };

  return (
    <div
      className={`sidebar lg:w-64 bg-gray-200 text-gray border-2 leading-9 border-gray-400 ${
        isOpen ? "sidebar-open" : "sidebar-close"
      }`}
    >
      <div className="lg:block hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold"></h1>
        </div>
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              {list.items ? (
                <div>
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
                    onClick={() => toggleSubMenu(list.name)}
                  >
                    <FontAwesomeIcon
                      icon={list.items[0].icon}
                      className="mr-3"
                    />
                    <span>{list.name}</span>
                    <FontAwesomeIcon
                      icon={
                        activeMenu === list.name ? faChevronUp : faChevronDown
                      }
                      className="mr-3 ml-2"
                    />
                  </div>
                  {activeMenu === list.name && (
                    <ul>
                      {list.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            className={`flex items-center px-8 py-2 hover:bg-gray-400 ${
                              location.pathname === item.path
                                ? "bg-gray-400"
                                : ""
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="mr-3"
                            />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={list.path}
                  className={`flex items-center px-4 py-2 hover:bg-gray-400 ${
                    location.pathname === list.path ? "bg-gray-400" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={list.icon} className="mr-3" />
                  <span>{list.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="flex justify-between items-center p-4">
          {/* <h1 className="text-2xl font-bold">Menu</h1> */}
        </div>
        <ul>
          {lists.map((list, index) => (
            <li key={index}>
              {list.items ? (
                <div>
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
                    onClick={() => toggleSubMenu(list.name)}
                  >
                    <FontAwesomeIcon
                      icon={list.items[0].icon}
                      className="mr-3"
                    />
                    <span>{list.name}</span>
                    <FontAwesomeIcon
                      icon={
                        activeMenu === list.name ? faChevronUp : faChevronDown
                      }
                      className="mr-3 ml-2"
                    />
                  </div>
                  {activeMenu === list.name && (
                    <ul>
                      {list.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            className={`flex items-center px-8 py-2 hover:bg-gray-400 ${
                              location.pathname === item.path
                                ? "bg-gray-400"
                                : ""
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="mr-3"
                            />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={list.path}
                  className={`flex items-center px-4 py-2 hover:bg-gray-400 ${
                    location.pathname === list.path ? "bg-gray-400" : ""
                  }`}
                >
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
