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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">Products List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imgPath}
                  // alt={product.name}
                  className="w-full h-48 object-cover object-center"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h2>
                </Link>
                <p className="text-gray-700 mb-2">{product.scientificName}</p>
                <p className="text-gray-900 font-semibold mb-2">Price: {product.totalRate} Rs</p>
                <p className="text-gray-700 mb-2">Gross Weight: {product.grossWeight} g</p>
                <p className="text-gray-700 mb-2">Ingredients: {product.ingredients}</p>
                <p className="text-gray-700 mb-2">Certification ID: {product.certification.name}</p>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                  >
                    View Details
                  </button>
                  {/* <span className="text-gray-600">Free Shipping</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
