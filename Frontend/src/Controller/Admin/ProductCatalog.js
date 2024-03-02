import React from 'react';

const ProductCatalog = ({ products }) => (
  <table>
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>HSN code</th>
        <th>Net Weight (In Grams)</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={product.ProductID}>
          <td>{index + 1}</td>
          <td>{product.ProductID}</td>
          <td>{product.ProductName}</td>
          <td>{product.Category}</td>
          <td>{product.HSNcode}</td>
          <td>{product['Net Weight (In Grams)']}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductCatalog;