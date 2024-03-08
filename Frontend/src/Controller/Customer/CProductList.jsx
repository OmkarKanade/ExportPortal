import React, { useState, useEffect } from 'react';
import CustomerDashboard from './CustomerDashboard';
import axios from 'axios';

const ProductCard = ({ name, scientificName, totalRate, grossWeight, ingredients, certificationId, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <img src={image} alt={name} className="w-full h-auto" />
        <div className="mt-4">
          <h5 className="text-xl font-semibold mb-2">Name: {name}</h5>
          <p>Scientific Name: {scientificName}</p>
          <p>Total Price: {totalRate} Rs</p>
          <p>Gross Weight: {grossWeight} g</p>
          <p>Ingredients: {ingredients}</p>
          <p>CertificationId: {certificationId}</p>
        </div>
      </div>
    </div>
  );
};

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
            <ProductCard
              key={product.productId}
              name={product.name}
              scientificName={product.scientificName}
              totalRate={product.totalRate}
              grossWeight={product.grossWeight}
              ingredients={product.ingredients}
              certificationId={product.certification.name}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </CustomerDashboard>
  );
};

export default ProductPage;
