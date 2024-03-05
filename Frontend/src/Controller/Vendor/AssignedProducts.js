import React, { useState, useEffect } from 'react';
import './vassinedproducts.css'; // Import the CSS file for styling
import VendorDashboard from './VendorDashboard';
import axios from 'axios';

const ProductCard = ({ name, scientificName, totalRate, grossWeight, ingredients, certificationId, image }) => {
  return (
    <div className="border-2 border-gray-500 mr-3 mb-3 card p-4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="card-img">
        <img src={image} alt={name} className="w-full h-auto" />
      </div>
      <div className="card-info">
        <h5 className="card-text">{name}</h5>
        <p className="card-text">{scientificName}</p>
        <p className="card-text">Total Price: {totalRate} Rs</p>
        <p className="card-text">Gross Weight: {grossWeight} g</p>
        <p className="card-text">Ingredients: {ingredients}</p>
        {/* <p className="card-text">Certification: {certificationId}</p> */}
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
    fetchData();
  }, []);

  const sid = sessionStorage.getItem('sid');
  
  const fetchData = async () => {
    console.log(products);
    try {
      const response = await axios.get(`https://localhost:7051/api/Product/Vendor/${sid}`);
      const updatedProducts = response.data.map(product => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return { ...product, image: images[randomIndex] };
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <VendorDashboard>
          <div className="w-full md:w-3/4 px-4">
            <h1 className="text-2xl font-bold mt-8 mb-4">Assigned Products</h1>
            <div className=" flex flex-wrap -mx-4">
              {products.map(product => (
                <ProductCard
                  key={product.id} // Assuming product.id is unique
                  name={product.name}
                  scientificName={product.scientificName}
                  totalRate={product.totalRate}
                  grossWeight={product.grossWeight}
                  ingredients={product.ingredients}
                  certification={product.certification.name}
                  image={product.image} // Pass the random image path here
                />
              ))}
            </div>
          </div>
          </VendorDashboard>
  );
};

export default ProductPage;
