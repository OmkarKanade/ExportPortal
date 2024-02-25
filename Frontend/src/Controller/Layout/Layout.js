// import React from 'react';
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import './Layout.css'; 

// const Layout = ({ children }) => {
//   return (
//     <div className="layout">
//       <Header />
//       <div className="container">
//         <aside className="sidebar">
//           <Sidebar />
//         </aside>
//         <main className="content">
          
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css"; // Import the CSS file for the layout

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="containerrr">
        <aside className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
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
