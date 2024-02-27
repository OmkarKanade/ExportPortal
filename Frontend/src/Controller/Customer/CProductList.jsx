import React, { useState, useEffect } from 'react';
import './cproductlist.css'; // Import the CSS file for styling
import Header from './CustomerHeader';
import Sidebar from '../Layout/CustomerSidebar';
import axios from 'axios';

const ProductCard = ({ name, scientificName, totalRate, grossWeight, ingredients, certificationId, image }) => {
  return (
    <div className="carddd">
      <div className="carddd-img">
        <img src={image} alt={name} />
      </div>
      <div className="carddd-info">
        <h5 className="carddd-text">Name:   {name}</h5>
        <p className="carddd-text">ScientificName:  {scientificName}</p>
        <p className="carddd-text">Total Price:  {totalRate} Rs</p>
        <p className='carddd-text'>Gross Weight:  {grossWeight} g</p>
        <p className='carddd-text'>Ingredients:  {ingredients}</p>
        <p className='carddd-text'>CertificationId:  {certificationId}</p>
      </div>
    </div>
  );
};

const ProductPagee = () => {
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
    <div className='mainpage'>
      <Header/>
      <div className='containerpage'>
        <aside className="psidebar">
          <Sidebar />
        </aside>
        <div className="product-page">
          <h1>Products List</h1>
          <div className="product-cards">
            {products.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                scientificName={product.scientificName}
                totalRate={product.totalRate}
                grossWeight={product.grossWeight}
                ingredients={product.ingredients}
                certificationId={product.certificationId}
                image={product.image} // Pass the random image path here
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPagee;
