import React, { useState, useEffect } from 'react';
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
      <div className="Aproduct-page">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">Products List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div className="cardd bg-white p-4 rounded-lg shadow-md" key={product.id}>
              <div className="carddd-info">
                <Link to={`/product/${product.id}`}>
                  <h5 className="carddd-text font-semibold">Product ID: {product.id}</h5>
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
