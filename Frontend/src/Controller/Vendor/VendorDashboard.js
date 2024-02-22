import React from "react";
import Header from './Vheader';
import VendorSidebar from "../Layout/VendorSidebar";


const Vlogin = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <aside className="VendorSidebar">
          <VendorSidebar />
        </aside>
        <main className="content">
          
        </main>
      </div>
    </div>
  );
};

export default Vlogin;

