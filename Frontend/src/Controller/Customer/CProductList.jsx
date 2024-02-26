import React, { useState, useEffect } from 'react';
import './cproductlist.css'; // Import the CSS file for styling
import Header from './CustomerHeader';
import Sidebar from '../Layout/CustomerSidebar';
import axios from 'axios';

const ProductCard = ({ image, name, price, description }) => {
  return (
    <div className="carddd">
      <div className="carddd-img">
        <img src={image} alt={name} />
      </div>
      <div className="carddd-info">
        <h5 className="carddd-title">{name}</h5>
        <p className="carddd-text">{description}</p>
        <p className="carddd-price">{price} Rs</p>
      </div>
    </div>
  );
};

const ProductPagee = () => {
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
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductPagee;
