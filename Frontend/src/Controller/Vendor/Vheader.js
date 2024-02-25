import { Link } from 'react-router-dom';
import "./vheader.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="headerr">
      <div className='left'>
      <button className="toggle-btn" onClick={toggleSidebar}>
      ☰
      </button>
      <h1>Vendor</h1>
      </div>
      <div className='right'>
      <div className="HeaderButtons">
        <button className="HeaderButton">My Cart</button>
         <button className="HeaderButton"><Link to="/" className="href">
          Logout
        </Link></button>
       </div>
      </div>
      
    </div>
  );
};

export default Header;

