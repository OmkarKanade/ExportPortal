// ProductDetails.js
import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Product/${match.params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [match.params.id]);

  return (
    <Layout>
      <div className="product-details">
        {product ? (
          <>
            <h1>{product.name}</h1>
            <p>Product ID: {product.id}</p>
            <p>Scientific Name: {product.scientificName}</p>
            {/* Add other product details here */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
