import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";


const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7051/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
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

//     // Here you can check the credentials
//     if (username === 'admin' && password === 'admin') {
//       // Redirect to Admin page
//       history.push('/layout');
//     } else if (username === 'customer' && password === 'customer') {
//       // Redirect to Customer Dashboard
//       history.push('/customerDashboard');
//     } else if (username === 'vendor' && password === 'vendor') {
//       // Redirect to Vendor Dashboard
//       history.push('/vendorDashboard');
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
//   };

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