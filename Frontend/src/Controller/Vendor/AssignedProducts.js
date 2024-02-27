import React from 'react';
import './vassinedproducts.css'; // Import the CSS file for styling
import Header from './Vheader';
import Sidebar from './VendorSidebar';

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
  const products = [
    {
      id: 1,
      name: 'Parle G Biscuits',
      price: 10,
      image: '/images/parleg.jpeg',
      description: 'Weight: 20gm',
    },
    {
      id: 2,
      name: 'Good Day Biscuits',
      price: 25,
      image: '/images/GoodDay.png',
      description: 'Weight: 25g',
    },
    {
      id: 3,
      name: 'Krack Jack Biscuits',
      price: 35,
      image: '/images/KrackJack.jpeg',
      description: 'Weight: 35g',
    },
  ];

//   <div className="layout">
//       <Header toggleSidebar={toggleSidebar} />
//       <div className="container">
//         <aside className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
//           <Sidebar />
//         </aside>
//         <main className="content">
//           {children}
//         </main>
//       </div>
//     </div>

  return (
    <div className='mainpage'>
        <Header/>
        <div className='containerpage'>
        <aside className="vasidebar">
//           <Sidebar />
//       </aside>
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
