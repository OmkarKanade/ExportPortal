import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7051/api/VendorCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('New category created:', data);
      
      // Show toast notification for success
      toast.success('New category created!');

      // Clear the form data after successful submission
      setCategoryData({
        name: '',
        description: ''
      });
      
    } catch (error) {
      console.error('Error creating new category:', error);
      
      // Show toast notification for error
      toast.error('Failed to create new category');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 ml-20 text-gray-700">Create New Category</h1>
          <form onSubmit={handleCategorySubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-sky-700 shadow-sky-700">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category Name:</label>
              <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category Description:</label>
              <input
                type="text"
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Category</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewCategory;
