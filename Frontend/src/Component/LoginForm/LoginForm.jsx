import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
// import { useHistory } from 'react-router-dom';
// import React, { useState } from 'react';


const LoginForm = () => {

//     const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleLogin = (e) => {
//     e.preventDefault();
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
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
            {/* <div className='input-box'>
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
          </div> */}
                <input type="text" placeholder='Username' required />
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Password' required />
                <FaLock className='icon'/>
            </div>
            
            <div className="forgot">
                <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>
        </form>

    </div>
    </div>
  )
}

export default LoginForm
