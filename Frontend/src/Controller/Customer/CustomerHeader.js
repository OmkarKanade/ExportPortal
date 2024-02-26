import { Link, useNavigate } from 'react-router-dom';
import "./customerheader.css";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here...
    // For example, clearing localStorage, removing tokens, etc.

    // Redirect to the home page ("/")
    navigate('/');
  };

  return (
    <div className="Header">
      <div className='left'>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Customer</h1>
      </div>
      <div className='right'>
        <div className="HeaderButtons">
          <button className="HeaderButton">My Cart</button>
          <button className="HeaderButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
  
export default Header;

