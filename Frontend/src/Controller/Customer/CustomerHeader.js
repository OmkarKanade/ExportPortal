import React from "react";
import "./customerheader.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="headerr">
      <div className='left'>
      <button className="toggle-btn" onClick={toggleSidebar}>
      ☰
      </button>
      <h1>Customer</h1>
      </div>
      <div className='right'>
      <div className="HeaderButtons">
        <button className="HeaderButton">My Cart</button>
         <button className="HeaderButton">Logout</button>
       </div>
      </div>
      
    </div>
  );
};

export default Header;

