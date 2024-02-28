import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './vendorform.css';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateVendorForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipcode: '',
    vendorCategoryId: '',
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
      vendorCategoryId: '',
    });
  };
 

  const fetchVendorCategory = () => {
    axios.get('https://localhost:7051/api/VendorCategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        toast.error('Failed to fetch vendor category');
        console.error('Error fetching vendor category:', error);
      });
  };

  useEffect(() =>{
    fetchVendorCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('https://localhost:7051/api/Vendor/Register', formData)
      .then(response => {
        toast.success('Vendor created successfully');
        console.log('Response from server:', response.data);
        resetForm();
      })
      .catch(error => {
        toast.error('Failed to create Vendor');
        console.error('Error creating Vendor:', error.response);
      });
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="outer-box">
          <div className="form-box">
            <h2>Create Vendor Account</h2>
            <form onSubmit={handleSubmit} className='VForm'>
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
                <label htmlFor="categorySelect">Vendor-Category :</label>
                <select
                  required
                  id="categorySelect"
                  name="vendorCategoryId"
                  value={formData.vendorCategoryId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select an option</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
