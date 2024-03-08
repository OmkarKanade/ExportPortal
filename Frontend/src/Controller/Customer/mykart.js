import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10.99, quantity: 1 },
    // Add more items as needed
  ]);

  const handleRemove = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleAddQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto my-10 p-4 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
        Your Cart
      </h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg">
          <div className="flex items-center space-x-4">
            
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <button
              onClick={() => (item.quantity > 1 ? handleRemoveQuantity(item.id) : handleRemove(item.id))}
              className="bg-red-500 text-white hover:bg-red-600 focus:outline-none px-2 py-1 rounded-full"
            >
              Remove
            </button>
            <button
              onClick={() => handleAddQuantity(item.id)}
              className="bg-green-500 text-white hover:bg-green-600 focus:outline-none px-2 py-1 rounded-full"
            >
              Add Quantity
            </button>
            <p className="mx-2">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}


    </div>
  );
};

export default CartPage;





// THIS IS CODE FOR VALUES TAKE FROM BACKEND API
// import React, { useState, useEffect } from 'react';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Replace the placeholder URL with your actual API endpoint
//     fetch('https://your-api-endpoint.com/products')
//       .then((response) => response.json())
//       .then((data) => setCartItems(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

//   const handleRemove = (itemId) => {
//     const updatedCart = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(updatedCart);
//   };

//   const handleAddQuantity = (itemId) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const handleRemoveQuantity = (itemId) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCartItems(updatedCart);
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="container mx-auto my-10 p-4 border rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
//         Your Cart
//       </h1>

//       {cartItems.map((item) => (
//         <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg">
//           <div className="flex items-center space-x-4">
//             {/* Adjust the content based on your API response */}
//             <div>
//               <p className="text-lg font-semibold">{item.name}</p>
//               <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => (item.quantity > 1 ? handleRemoveQuantity(item.id) : handleRemove(item.id))}
//               className="text-red-500 hover:text-red-700 hover:bg-red-100 focus:outline-none px-2 py-1 rounded-full"
//             >
//               Remove
//             </button>
//             <button
//               onClick={() => handleAddQuantity(item.id)}
//               className="bg-green-500 text-white hover:bg-green-600 focus:outline-none px-2 py-1 rounded-full"
//             >
//               +
//             </button>
//             <p className="mx-2">Quantity: {item.quantity}</p>
//           </div>
//         </div>
//       ))}

      
//     </div>
//   );
// };

// export default CartPage;
