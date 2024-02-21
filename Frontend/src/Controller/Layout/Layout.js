// Layout.js
import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="content">
        {/* Content for different pages goes here */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
