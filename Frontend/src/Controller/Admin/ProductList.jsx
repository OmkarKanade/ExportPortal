import React, { useState, useEffect } from 'react';
import './productlist.css'; // Import the CSS file for styling
import Layout from '../Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ProductCard = ({ id, name, scientificName, totalRate, grossWeight, ingredients, certificationid }) => {
  return (
    <div className="carddd">
      <div className="carddd-info">
        <h5 className="carddd-text">Product ID: {id}</h5>
        <h5 className="carddd-text">Name: {name}</h5>
        <p className="carddd-text">Scientific Name: {scientificName}</p>
        <p className="carddd-text">Total Price: {totalRate} Rs</p>
        <p className="carddd-text">Gross Weight: {grossWeight} g</p>
        <p className="carddd-text">Ingredients: {ingredients}</p>
        <p className="carddd-text">Certification ID: {certificationid}</p>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7051/api/Product');
        setProducts(response.data);
        console.log(ProductCard);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // const products = [
  //   {
  //     id: 1,
  //     name: 'Parle G Biscuits',
  //     price: 10,
  //     image: '/images/parleg.jpeg',
  //     description: 'Weight: 20gm',
  //   },
  //   {
  //     id: 2,
  //     name: 'Good Day Biscuits',
  //     price: 25,
  //     image: '/images/GoodDay.png',
  //     description: 'Weight: 25g',
  //   },
  //   {
  //     id: 3,
  //     name: 'Krack Jack Biscuits',
  //     price: 35,
  //     image: '/images/KrackJack.jpeg',
  //     description: 'Weight: 35g',
  //   },
  // ];
  return (
    <Layout>
      <div className="product-page">
        <h1>Products List</h1>
        <div className="product-cards">
          {products.map(product => (
            <ProductCard
              key={product.id} 
              id={product.id}
              name={product.name}
              scientificName={product.scientificName}
              totalRate={product.totalRate}
              grossWeight={product.grossWeight}
              ingredients={product.ingredients}
              certificationId={product.certification.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
