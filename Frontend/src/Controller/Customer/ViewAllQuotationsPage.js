import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerDashboard from "./CustomerDashboard";

const ViewAllQuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7051/api/Quotation/08dc401a-be93-4635-8191-4402adb8393c"
        );
        // Assuming data.items contains the list of products
        setQuotations(response.data.items);
      } catch (error) {
        console.error("Error fetching quotations:", error);
        // Handle error if needed
      }
    };

    fetchQuotations();
  }, []);

  const handleEdit = (productId) => {
    // Handle edit action for a product
    console.log("Edit product with ID:", productId);
  };

  const handleDelete = (productId) => {
    // Handle delete action for a product
    console.log("Delete product with ID:", productId);
  };

  return (
    <CustomerDashboard>
      <div className="overflow-x-auto">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View All Quotations
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotations.map((quotation) => (
              <tr key={quotation.id}>
                <td className="px-6 py-4 whitespace-nowrap">{quotation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.productId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(quotation.productId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quotation.productId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {quotations.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                  No quotations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CustomerDashboard>
  );
};

export default ViewAllQuotationsPage;
