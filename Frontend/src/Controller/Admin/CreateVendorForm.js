import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        // toast.error('Failed to fetch vendor category');
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
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md ">
          <h1 className="text-2xl font-bold mb-4 ml-20 text-gray-700">Create Vendor Account</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-sky-700 shadow-sky-700">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Organization:</label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address Line 1:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code:</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categorySelect" className="block text-gray-700 text-sm font-bold mb-2">Vendor Category:</label>
              <select
                id="categorySelect"
                name="vendorCategoryId"
                value={formData.vendorCategoryId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>Select an option</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateVendorForm;
