// import React from "react";
// import "./header.css";

// export default function Header() {
//   return (
//     <header className="Header">
//       <h1><a href="#">Admin</a></h1>
//       <div className="HeaderButtons">
//         <button className="HeaderButton">My Cart</button>
//         <button className="HeaderButton">Logout</button>
//       </div>
//     </header>
//   );
// }
import { Link } from 'react-router-dom';
import React  from 'react';
import "./header.css"; // Import the CSS file for the header

const Header = ({ toggleSidebar }) => {
  return (
    <div className="headerr">
      <div className='left'>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Admin</h1>
      </div>
      <div className='right'>
        <div className="HeaderButtons">
          <Link to="/getAll-users" className="HeaderButton">View Users</Link>
          <button className="HeaderButton">
            <Link to="/" className="href">
              Logout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

