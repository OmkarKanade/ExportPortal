import React, { useState } from 'react';
import './customerform.css';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      organizationName: '',
      phoneNumber: '',
      email: '',
      state: '',
      city: '',
      address: '',
      zipcode: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    axios.post('https://localhost:7051/api/Customer/Register', formData)
      .then(response => {
        toast.success('New Customer Created!', {
          autoClose: 3000, // 3 seconds
          style: {
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden', // Hide overflow text
            textOverflow: 'ellipsis' // Show ellipsis for overflow text
          }
        });
        console.log('Response from server:', response.data);
        resetForm();
      })
      .catch(error => {
        toast.error('Failed to create customer');
        console.error('Error creating customer:', error);
      });
  };


  return (
    <Layout>
      <div className="form-container">
        <div className="outer-box">
          <h1>Create Customer Account</h1>
          <form onSubmit={handleSubmit} className="form">
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
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
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
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn sbtbtn">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCustomerForm;
