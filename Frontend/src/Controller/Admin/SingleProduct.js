import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Scientific Name: {product.scientificName}</p>
      <p>Total Price: {product.totalRate} Rs</p>
      <p>Gross Weight: {product.grossWeight} g</p>
      <p>Ingredients: {product.ingredients}</p>
      <p>Certification ID: {product.certificationId}</p>
      <p>Vendor Category ID: {product.vendorCategoryId}</p>
      <p>Vendor ID 1: {product.vendorId1}</p>
      <p>Vendor ID 2: {product.vendorId2}</p>
      <p>Vendor ID 3: {product.vendorId3}</p>
      <p>HSN Code: {product.hsnCode}</p>
      <p>To Pune Freight: {product.toPuneFreight}</p>
      <p>Inner Package Material: {product.innerPackageMaterial}</p>
      <p>Outer Package Material: {product.outerPackageMaterial}</p>
      <p>Manual Package: {product.manualPackage}</p>
      <p>Machine Package: {product.machinePackage}</p>
      <p>Local Transport: {product.localTransport}</p>
      <p>Fumigation: {product.fumigation}</p>
      <p>Pouch Type: {product.pouchType}</p>
      <p>Bumper is Pouches: {product.bumperisPouches}</p>
      <p>Bag or Box: {product.bagOrBox}</p>
      <p>Bag or Box Bumpers: {product.bagOrBoxBumpers}</p>
      <p>Manufacturing Process: {product.manufacturingProcess}</p>
      <p>Dairy Declaration Required: {product.dairyDeclarationRequired ? 'Yes' : 'No'}</p>
      <p>Is For Human Consumption: {product.isForHumanConsumption ? 'Yes' : 'No'}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default SingleProduct;
