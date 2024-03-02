import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the image
import loginImage from './img11.jpeg';

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username: username,
        password: password
      };
      const response = await axios.post(
        "https://localhost:7051/api/Login",
        body
      );

      console.log(response);
      if (response.data) {
        const authToken = response.data.jwtToken;
        const decodeToken = jwtDecode(authToken);
        const roles = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const sid = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
        sessionStorage.setItem('sid', sid);
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("roles", roles);

        toast.success(`Login Successful!!!`, {
          autoClose: 3000,
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        });

        console.log(roles);
        console.log(sid);
        console.log(authToken);

        switch (roles) {
          case 'Admin':
            navigate('/layout');
            break;
          case 'Customer':
            navigate('/customerDashboard');
            break;
          case 'Vendor':
            navigate('/vendorDashboard');
            break;
          default:
            navigate('/');
            break;
        }

        console.log('Login successful!');
      } else {
        console.error('Login failed');
        toast.error('Invalid credentials. Please try again.', {
          autoClose: 3000,
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again later.', {
        autoClose: 3000,
        style: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      });
    }
  };

  return (
    <div className="outer">
      <div className='wrapper'>
        <div className="image-container">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <h1>Login</h1>
          <div className='input-box'>
            <input className='username'
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input className='password'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>

          <div className="forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button className='submit' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;