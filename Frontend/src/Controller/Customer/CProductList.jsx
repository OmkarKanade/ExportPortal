import React, { useState, useEffect } from 'react';
import CustomerDashboard from './CustomerDashboard';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const images = [
    '/images/1.png',
    '/images/2.jpeg',
    '/images/3.jpeg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7051/api/Product');
        const updatedProducts = response.data.map(product => {
          const randomIndex = Math.floor(Math.random() * images.length);
          return { ...product, image: images[randomIndex] };
        });
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomerDashboard>
      <div className="ml-8">
        <h1 className="text-3xl font-semibold mb-4">Products List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover object-center" />
              <div className="px-6 py-4">
                <h5 className="text-xl font-semibold mb-2">{product.name}</h5>
                <p className="text-gray-700 mb-2">Scientific Name: {product.scientificName}</p>
                <p className="text-gray-700 mb-2">Total Price: {product.totalRate} Rs</p>
                <p className="text-gray-700 mb-2">Gross Weight: {product.grossWeight} g</p>
                <p className="text-gray-700 mb-2">Ingredients: {product.ingredients}</p>
                <p className="text-gray-700 mb-2">Certification ID: {product.certification.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboard>
  );
};

export default ProductPage;
