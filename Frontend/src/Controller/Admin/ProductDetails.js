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
         <table className="details-table">
            <tbody>
              {/* <tr>
                <td>Product Id:</td>
                <td>{product.id}</td>
              </tr> */}
              <tr>
                <td>Product Name:</td>
                <td>{product.name}</td>
              </tr>
              <tr>
                <td>Product Scientific name:</td>
                <td>{product.scientificName}</td>
              </tr>
              <tr>
                <td>Vendor Category:</td>
                <td>{product.vendorCategory.name}</td>
              </tr>
              <tr>
                <td>Vendor Name 1:</td>
                <td>{product.vendorName1}</td>
              </tr>
              <tr>
                <td>Vendor Name 2:</td>
                <td>{product.vendorName2}</td>
              </tr>
              <tr>
                <td>Vendor Name 3:</td>
                <td>{product.vendorName3}</td>
              </tr>
              <tr>
                <td>HSN Code:</td>
                <td>{product.hsnCode}</td>
              </tr>
              <tr>
                <td>To Pune Freight:</td>
                <td>{product.toPuneFreight}</td>
              </tr>
              <tr>
                <td>Inner Package Material:</td>
                <td>{product.innerPackageMaterial}</td>
              </tr>
              <tr>
                <td>Outer Package Material:</td>
                <td>{product.outerPackageMaterial}</td>
              </tr>
              <tr>
                <td>Manual Package:</td>
                <td>{product.manualPackage}</td>
              </tr>
              <tr>
                <td>Machine Package:</td>
                <td>{product.machinePackage}</td>
              </tr>
              <tr>
                <td>Local Transport:</td>
                <td>{product.localTransport}</td>
              </tr>
              <tr>
                <td>Fumigation:</td>
                <td>{product.fumigation}</td>
              </tr>
              <tr>
                <td>Total Rate:</td>
                <td>{product.totalRate} Rs</td>
              </tr>
              <tr>
                <td>Gross Weight:</td>
                <td>{product.grossWeight} g</td>
              </tr>
              <tr>
                <td>Pouch Type:</td>
                <td>{product.pouchType}</td>
              </tr>
              <tr>
                <td>Bumper is Pouches:</td>
                <td>{product.bumperisPouches}</td>
              </tr>
              <tr>
                <td>Bag or Box:</td>
                <td>{product.bagOrBox}</td>
              </tr>
              <tr>
                <td>Bag or Box Bumpers:</td>
                <td>{product.bagOrBoxBumpers}</td>
              </tr>
              <tr>
                <td>Ingredients:</td>
                <td>{product.ingredients}</td>
              </tr>
              <tr>
                <td>Manufacturing Process:</td>
                <td>{product.manufacturingProcess}</td>
              </tr>
              <tr>
                <td>Dairy Declaration Required:</td>
                <td>{product.dairyDeclarationRequired ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>For Human Consumption:</td>
                <td>{product.isForHumanConsumption ? 'Yes' : 'No'}</td>
              </tr>
              {/* <tr>
                <td>Certification Name:</td>
                <td>{product.certification.name}</td>
              </tr> */}
            </tbody>
          </table>


        {/* ////////////////////////////////////////////// */}


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
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
            </form>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default ProductDetails;
