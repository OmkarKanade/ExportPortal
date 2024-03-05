import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-y-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

