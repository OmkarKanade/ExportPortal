import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = ({
        username: username,
        password: password
          });
            const response = await axios.post(
              "https://localhost:7051/api/Login",
              body
            );
    
      console.log(response);
      if (response.data) {
        const authToken = response.data.jwtToken;
              const decodeToken = jwtDecode(authToken);
              const roles =
                decodeToken[
                  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];
              sessionStorage.setItem("authToken", authToken);
              sessionStorage.setItem("roles", roles);

              console.log(roles);
              // console.log(authToken);
              // navigate("/layout");
        // Redirect based on role
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
        // Handle unsuccessful login
        console.error('Login failed');
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="outer">
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='input-box'>
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon'/>
          </div>
          
          <div className="forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
