import React, { useState } from 'react';
import './vendorform.css'; // Import CSS file
import Layout from '../Layout/Layout';

const CreateVendorForm = () => {
  const [formData, setFormData] = useState({
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
    vendorCategory: '',
    password: '123456',// Default password
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
    
    console.log(formData);
  };

  return (
    <Layout>
    <div className="form-container">
      <div className="outer-box">
        <div className="form-box">
          <h2>Create Vendor Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Organization:</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address Line 1:</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address Line 3:</label>
              <input
                type="text"
                name="addressLine3"
                value={formData.addressLine3}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Vendor Category:</label>
              <input
                type="text"
                name="vendorCategory"
                value={formData.vendorCategory}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CreateVendorForm;