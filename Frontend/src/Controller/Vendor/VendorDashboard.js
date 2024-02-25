import React, { useState } from 'react';
import Header from './Vheader';
import './vsidebar.css';
import VendorSidebar from './VendorSidebar';


const VendorDashboard = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="layoutt">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="containerr">
        <aside className={`VendorSidebar ${showSidebar ? 'show' : 'hide'}`}>
          <VendorSidebar />
        </aside>
        <main className="content">
        {children}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;

