import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
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
        setFormData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7051/api/Product/${id}`, formData);
      setProduct(formData);
      toast.success('Product updated successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product. Please try again.');
    }
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  return (
    <Layout>
      <div className="flex justify-center container mx-auto mt-8">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {product && (
          <div className="border-2 border-sky-700 shadow-sky-700 w-full md:w-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-lg font-bold mb-4">Product Details</h2>
            <table className="table-auto border border-collapse">
            <tbody>
            <tr className="border-2 border-sky-700">
                <td className="font-medium border">Product Id:</td>
                <td className="ml-2 border-2 border-sky-700">{id}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Product Name:</td>
                <td className="ml-2 border-2 border-sky-700">{product.name}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Product Scientific name:</td>
                <td className="border-2 border-sky-700">{product.scientificName}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Vendor Category:</td>
                <td className="border-2 border-sky-700">{product.vendorCategory.name}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Vendor Name 1:</td>
                <td className="border-2 border-sky-700">{product.vendorName1}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Vendor Name 2:</td>
                <td className="border-2 border-sky-700">{product.vendorName2}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Vendor Name 3:</td>
                <td className="border-2 border-sky-700">{product.vendorName3}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">HSN Code:</td>
                <td className="border-2 border-sky-700">{product.hsnCode}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">To Pune Freight:</td>
                <td className="border-2 border-sky-700">{product.toPuneFreight}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Inner Package Material:</td>
                <td className="border-2 border-sky-700">{product.innerPackageMaterial}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Outer Package Material:</td>
                <td className="border-2 border-sky-700">{product.outerPackageMaterial}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Manual Package:</td>
                <td className="border-2 border-sky-700">{product.manualPackage}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Machine Package:</td>
                <td className="border-2 border-sky-700">{product.machinePackage}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Local Transport:</td>
                <td className="border-2 border-sky-700">{product.localTransport}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Fumigation:</td>
                <td className="border-2 border-sky-700">{product.fumigation}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Total Rate:</td>
                <td className="border-2 border-sky-700">{product.totalRate} Rs</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Gross Weight:</td>
                <td className="border-2 border-sky-700">{product.grossWeight} g</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Pouch Type:</td>
                <td className="border-2 border-sky-700">{product.pouchType}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Bumper is Pouches:</td>
                <td className="border-2 border-sky-700">{product.bumperisPouches}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Bag or Box:</td>
                <td className="border-2 border-sky-700">{product.bagOrBox}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Bag or Box Bumpers:</td>
                <td className="border-2 border-sky-700">{product.bagOrBoxBumpers}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Ingredients:</td>
                <td className="border-2 border-sky-700">{product.ingredients}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Manufacturing Process:</td>
                <td className="border-2 border-sky-700">{product.manufacturingProcess}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">Dairy Declaration Required:</td>
                <td className="border-2 border-sky-700">{product.dairyDeclarationRequired ? 'Yes' : 'No'}</td>
              </tr>
              <tr className="border-2 border-sky-700">
                <td className="font-medium border">For Human Consumption:</td>
                <td className="border-2 border-sky-700">{product.isForHumanConsumption ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}

{showForm && (
          <div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-10">
            <div className="bg-gray-800 opacity-75 fixed inset-0"></div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full z-50">
              <h2 className="text-lg font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="toPuneFreight" className="block text-gray-700 font-medium">To Pune Freight:</label>
                  <input
                    type="number"
                    id="toPuneFreight"
                    name="toPuneFreight"
                    value={formData.toPuneFreight}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="innerPackageMaterial" className="block text-gray-700 font-medium">Inner Package Material:</label>
                  <input
                    type="number"
                    id="innerPackageMaterial"
                    name="innerPackageMaterial"
                    value={formData.innerPackageMaterial}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="outerPackageMaterial" className="block text-gray-700 font-medium">Outer Package Material:</label>
                  <input
                    type="number"
                    id="outerPackageMaterial"
                    name="outerPackageMaterial"
                    value={formData.outerPackageMaterial}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="manualPackage" className="block text-gray-700 font-medium">Manual Package:</label>
                  <input
                    type="number"
                    id="manualPackage"
                    name="manualPackage"
                    value={formData.manualPackage}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="machinePackage" className="block text-gray-700 font-medium">Machine Package:</label>
                  <input
                    type="number"
                    id="machinePackage"
                    name="machinePackage"
                    value={formData.machinePackage}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="localTransport" className="block text-gray-700 font-medium">Local Transport:</label>
                  <input
                    type="number"
                    id="localTransport"
                    name="localTransport"
                    value={formData.localTransport}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="fumigation" className="block text-gray-700 font-medium">Fumigation:</label>
                  <input
                    type="number"
                    id="fumigation"
                    name="fumigation"
                    value={formData.fumigation}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="totalRate" className="block text-gray-700 font-medium">Total Rate:</label>
                  <input
                    type="number"
                    id="totalRate"
                    name="totalRate"
                    value={formData.totalRate}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="grossWeight" className="block text-gray-700 font-medium">Gross Weight:</label>
                  <input
                    type="number"
                    id="grossWeight"
                    name="grossWeight"
                    value={formData.grossWeight}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="pouchType" className="block text-gray-700 font-medium">Pouch Type:</label>
                  <input
                    type="text"
                    id="pouchType"
                    name="pouchType"
                    value={formData.pouchType}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="bumperisPouches" className="block text-gray-700 font-medium">Bumper is Pouches:</label>
                  <input
                    type="number"
                    id="bumperisPouches"
                    name="bumperisPouches"
                    value={formData.bumperisPouches}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="bagOrBox" className="block text-gray-700 font-medium">Bag or Box:</label>
                  <input
                    type="text"
                    id="bagOrBox"
                    name="bagOrBox"
                    value={formData.bagOrBox}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="bagOrBoxBumpers" className="block text-gray-700 font-medium">Bag or Box Bumpers:</label>
                  <input
                    type="number"
                    id="bagOrBoxBumpers"
                    name="bagOrBoxBumpers"
                    value={formData.bagOrBoxBumpers}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="ingredients" className="block text-gray-700 font-medium">Ingredients:</label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="manufacturingProcess" className="block text-gray-700 font-medium">Manufacturing Process:</label>
                  <input
                    type="text"
                    id="manufacturingProcess"
                    name="manufacturingProcess"
                    value={formData.manufacturingProcess}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                  />

                  <label htmlFor="dairyDeclarationRequired" className="block text-gray-700 font-medium">Dairy Declaration Required:</label>
                  <select
                    id="dairyDeclarationRequired"
                    name="dairyDeclarationRequired"
                    value={formData.dairyDeclarationRequired}
                    onChange={handleChange}
                    className="form-select mt-1 block w-full"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>

                  <label htmlFor="isForHumanConsumption" className="block text-gray-700 font-medium">For Human Consumption:</label>
                  <select
                    id="isForHumanConsumption"
                    name="isForHumanConsumption"
                    value={formData.isForHumanConsumption}
                    onChange={handleChange}
                    className="form-select mt-1 block w-full"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Save
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
};

export default ProductDetails;