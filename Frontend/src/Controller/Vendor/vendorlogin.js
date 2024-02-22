import React from "react";
import "./header.css";
import Layout from '../Layout/Navbar';
<Layout>
      <div className="form-container">
        <div className="outer-box">
          <h1>Create New Category</h1><br></br>
          <form onSubmit={handleCategorySubmit} className="form">
            <div className="form-group">
              <label>Category Name:</label>
              <input
                type="text"
                name="categoryName"
                value={categoryData.categoryName}
                onChange={handleCategoryChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Category Description:</label><br></br>
              <input
                type="text"
                name="categoryDescription"
                value={categoryData.categoryDescription}
                onChange={handleCategoryChange}
                className="input-field"
              />
            </div><br></br>
            <button type="submit" className="submit-btn sbtbtn">Create Category</button>
          </form>
        </div>
      </div>
    </Layout>