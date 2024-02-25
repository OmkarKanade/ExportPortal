
import React, { useState } from 'react';
import Header from './CustomerHeader';
import CustomerSidebar from '../Layout/CustomerSidebar';
import './cdash.css';


const CustomerDashboard = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layoutt">
    <Header toggleSidebar={toggleSidebar}/>
    <div className="containerr">
      <aside className={`CustomerSidebar ${showSidebar ? 'show' : 'hide'}`}>
        <CustomerSidebar />
      </aside>
      <main className="contentt">
         {children}
      </main>
    </div>
  </div>
  )
}

export default CustomerDashboard;