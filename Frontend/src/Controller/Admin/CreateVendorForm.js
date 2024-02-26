import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './vendorform.css'; // Import CSS file
import Layout from '../Layout/Layout';

const CreateVendorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    // addressLine2: '',
    // addressLine3: '',
    zipcode: '',
    vendorCategoryId: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    console.log("Form Data:", formData);


    axios.post('https://localhost:7051/api/Vendor/Register', formData)
      .then(response => {
        setSuccessMessage('Vendor created successfully');
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to create Vendor');
        console.error('Error creating Vendor:', error.response);
      });
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
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Contact Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                <label>Address: </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
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
              </div> */}
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Vendor Category Id:</label>
                <input
                  type="text"
                  name="vendorCategoryId"
                  value={formData.vendorCategoryId}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div> */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateVendorForm;
