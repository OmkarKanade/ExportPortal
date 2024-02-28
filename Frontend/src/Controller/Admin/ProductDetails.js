// ProductDetails.js
import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import './productDetails.css'; // Import the CSS file for styling

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Product/${match.params.id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [match.params.id]);

  return (
    <Layout>
      <div className="product-details-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {product && (
          <div className="product-details">
            <h1>{product.name}</h1>
            <p>Product ID: {product.id}</p>
            <p>Scientific Name: {product.scientificName}</p>
            {/* Add other product details here */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
