import React, { useState } from 'react';
import './loginform.css'
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex justify-center items-center h-screen">
      <div className="loginbox  w-full  border-2 border-sky-700 shadow-md shadow-sky-700 rounded-lg p-8 flex flex-col md:flex-row">
        <div className="mb-8 md:mb-0 md:mr-8">
          <img src={loginImage} alt="Login" className="w-54 h-54 mx-auto md:mx-0" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleLogin} className="space-y-4">
            <h1 className="text-4xl font-bold text-center mb-10 mt-5 text-gray-600">Login</h1>
            <div className='relative'>
              <input className='w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400' />
            </div>
            <div className='relative'>
              <input className='w-full pl-10 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? <FaEyeSlash className='absolute top-1/2  left-3 transform -translate-y-1/2 text-gray-400 cursor-pointer' onClick={() => setShowPassword(false)} /> : <FaEye className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 cursor-pointer' onClick={() => setShowPassword(true)} />}
            </div>
            
            <div className="forgot text-right mt-2 md:mt-0">
              <a href="/forgot-Password" className="text-blue-500 hover:text-blue-700">Forgot password?</a>
            </div>

            <button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600' type="submit">Login</button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
