import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="content">
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;