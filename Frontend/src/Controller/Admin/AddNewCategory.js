import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './createCategory.css';

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
      <div className="form-container">
        <div className="outer-box">
          <h1>Create New Category</h1><br></br>
          <form onSubmit={handleCategorySubmit} className="form">
            <div className="form-group">
              <label>Category Name:</label>
              <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Category Description:</label><br></br>
              <input
                type="text"
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
                className="input-field"
              />
            </div><br></br>
            <button type="submit" className="submit-btn sbtbtn">Create Category</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewCategory;
