import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import './productDetails.css'; // Import the CSS file for styling
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Define showForm state

  const [formData, setFormData] = useState({
    toPuneFreight: 0,
    innerPackageMaterial: 0,
    outerPackageMaterial: 0,
    manualPackage: 0,
    machinePackage: 0,
    localTransport: 0,
    fumigation: 0,
    totalRate: 0,
    grossWeight: 0,
    pouchType: '',
    bumperisPouches: 0,
    bagOrBox: '',
    bagOrBoxBumpers: 0,
    ingredients: '',
    manufacturingProcess: '',
    dairyDeclarationRequired: true,
    isForHumanConsumption: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Only 'id' is needed as dependency, not 'match.params.id'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7051/api/Product/${id}`, formData);
      // Optionally, you can fetch the updated product data and set it to the state
      // Or display a success message
      setShowForm(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error, display error message, etc.
    }
  };

  const handleEdit = () => {
    setShowForm(true); // Show the edit form/modal
  };

  return (
    <Layout>
      <div className="product-details-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {product && (
          <div className="product-details">
            <h1>{product.name}</h1>
            {/* <p>Product ID: {product.id}</p> */}
            <p>Scientific Name: {product.scientificName}</p>
            <p>Vendor Category: {product.vendorCategory.name}</p>
            <p>Vendor ID 1: {product.vendorId1}</p>
            <p>Vendor Name 1: {product.vendorName1}</p>
            <p>Vendor ID 2: {product.vendorId2}</p>
            <p>Vendor Name 2: {product.vendorName2}</p>
            <p>Vendor ID 3: {product.vendorId3}</p>
            <p>Vendor Name 3: {product.vendorName3}</p>
            <p>HSN Code: {product.hsnCode}</p>
            <p>To Pune Freight: {product.toPuneFreight}</p>
            <p>Inner Package Material: {product.innerPackageMaterial}</p>
            <p>Outer Package Material: {product.outerPackageMaterial}</p>
            <p>Manual Package: {product.manualPackage}</p>
            <p>Machine Package: {product.machinePackage}</p>
            <p>Local Transport: {product.localTransport}</p>
            <p>Fumigation: {product.fumigation}</p>
            <p>Total Rate: {product.totalRate} Rs</p>
            <p>Gross Weight: {product.grossWeight} g</p>
            <p>Pouch Type: {product.pouchType}</p>
            <p>Bumper is Pouches: {product.bumperisPouches}</p>
            <p>Bag or Box: {product.bagOrBox}</p>
            <p>Bag or Box Bumpers: {product.bagOrBoxBumpers}</p>
            <p>Ingredients: {product.ingredients}</p>
            <p>Manufacturing Process: {product.manufacturingProcess}</p>
            <p>Dairy Declaration Required: {product.dairyDeclarationRequired ? 'Yes' : 'No'}</p>
            <p>For Human Consumption: {product.isForHumanConsumption ? 'Yes' : 'No'}</p>
            <p>Certification ID: {product.certification.id}</p>
            <p>Certification Name: {product.certification.name}</p>

            <button onClick={handleEdit}>Edit</button>
          </div>
        )}

        {showForm && (
          <div className="modal">
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-left">
                <label htmlFor="toPuneFreight">To Pune Freight:</label>
                <input
                  type="number"
                  id="toPuneFreight"
                  name="toPuneFreight"
                  value={formData.toPuneFreight}
                  onChange={handleChange}
                />

                <label htmlFor="innerPackageMaterial">Inner Package Material:</label>
                <input
                  type="number"
                  id="innerPackageMaterial"
                  name="innerPackageMaterial"
                  value={formData.innerPackageMaterial}
                  onChange={handleChange}
                />

                <label htmlFor="outerPackageMaterial">Outer Package Material:</label>
                <input
                  type="number"
                  id="outerPackageMaterial"
                  name="outerPackageMaterial"
                  value={formData.outerPackageMaterial}
                  onChange={handleChange}
                />

                <label htmlFor="manualPackage">Manual Package:</label>
                <input
                  type="number"
                  id="manualPackage"
                  name="manualPackage"
                  value={formData.manualPackage}
                  onChange={handleChange}
                />

                <label htmlFor="machinePackage">Machine Package:</label>
                <input
                  type="number"
                  id="machinePackage"
                  name="machinePackage"
                  value={formData.machinePackage}
                  onChange={handleChange}
                />

                <label htmlFor="localTransport">Local Transport:</label>
                <input
                  type="number"
                  id="localTransport"
                  name="localTransport"
                  value={formData.localTransport}
                  onChange={handleChange}
                />
              </div>
              <div className="form-right">
                <label htmlFor="fumigation">Fumigation:</label>
                <input
                  type="number"
                  id="fumigation"
                  name="fumigation"
                  value={formData.fumigation}
                  onChange={handleChange}
                />

                <label htmlFor="totalRate">Total Rate:</label>
                <input
                  type="number"
                  id="totalRate"
                  name="totalRate"
                  value={formData.totalRate}
                  onChange={handleChange}
                />

                <label htmlFor="grossWeight">Gross Weight:</label>
                <input
                  type="number"
                  id="grossWeight"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                />

                <label htmlFor="pouchType">Pouch Type:</label>
                <input
                  type="text"
                  id="pouchType"
                  name="pouchType"
                  value={formData.pouchType}
                  onChange={handleChange}
                />

                <label htmlFor="bumperisPouches">Bumper is Pouches:</label>
                <input
                  type="number"
                  id="bumperisPouches"
                  name="bumperisPouches"
                  value={formData.bumperisPouches}
                  onChange={handleChange}
                />

                <label htmlFor="bagOrBox">Bag or Box:</label>
                <input
                  type="text"
                  id="bagOrBox"
                  name="bagOrBox"
                  value={formData.bagOrBox}
                  onChange={handleChange}
                />

                <label htmlFor="bagOrBoxBumpers">Bag or Box Bumpers:</label>
                <input
                  type="number"
                  id="bagOrBoxBumpers"
                  name="bagOrBoxBumpers"
                  value={formData.bagOrBoxBumpers}
                  onChange={handleChange}
                />

                <label htmlFor="ingredients">Ingredients:</label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                />

                <label htmlFor="manufacturingProcess">Manufacturing Process:</label>
                <input
                  type="text"
                  id="manufacturingProcess"
                  name="manufacturingProcess"
                  value={formData.manufacturingProcess}
                  onChange={handleChange}
                />

                <label htmlFor="dairyDeclarationRequired">Dairy Declaration Required:</label>
                <select
                  id="dairyDeclarationRequired"
                  name="dairyDeclarationRequired"
                  value={formData.dairyDeclarationRequired}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>

                <label htmlFor="isForHumanConsumption">For Human Consumption:</label>
                <select
                  id="isForHumanConsumption"
                  name="isForHumanConsumption"
                  value={formData.isForHumanConsumption}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default ProductDetails;
