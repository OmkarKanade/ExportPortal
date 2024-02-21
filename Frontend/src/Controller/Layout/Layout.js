import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css'; 

const Layout = (Component) => (props) => (
    <div className="layout">
      <Header />
      <div className="container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-container">
          <Component {...props} />
        </div>
      </div>
    </div>
);

export default Layout;
