import React, { useState } from 'react';
import './customerform.css';

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    organization: '',
    contactNumber: '',
    email: '',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    zipCode: '',
    password: 'passwor@1234', // Default password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send formData to an API or perform any other action
    console.log(formData);
  };

  return (
    <div className="form-container">
      <div className="outer-box">
        <h1>Create Customer Account</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Organization:</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Address Line 1:</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Address Line 3:</label>
            <input
              type="text"
              name="addressLine3"
              value={formData.addressLine3}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerForm;