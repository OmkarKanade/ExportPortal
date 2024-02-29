import React, { useState, useEffect } from 'react';
import './productlist.css'; // Import the CSS file for styling
import Layout from '../Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7051/api/Product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="product-page">
        <h1>Products List</h1>
        <div className="product-cards">
          {products.map(product => (
            <div className="carddd" key={product.id}>
              <div className="carddd-info">
                <Link to={`/product/${product.id}`}>
                  <h5 className="carddd-text">Product ID: {product.id}</h5>
                </Link>
                <h5 className="carddd-text">Name: {product.name}</h5>
                <p className="carddd-text">Scientific Name: {product.scientificName}</p>
                <p className="carddd-text">Total Price: {product.totalRate} Rs</p>
                <p className="carddd-text">Gross Weight: {product.grossWeight} g</p>
                <p className="carddd-text">Ingredients: {product.ingredients}</p>
                <p className="carddd-text">Certification ID: {product.certification.name}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;