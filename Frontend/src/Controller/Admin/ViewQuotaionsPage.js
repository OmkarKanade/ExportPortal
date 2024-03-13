import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

const ViewQuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null); // State to manage selected quotation for modal

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7051/api/Quotation"
        );
        setQuotations(response.data);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    };

    fetchQuotations();
  }, []);

  const openProductsModal = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const closeProductsModal = () => {
    setSelectedQuotation(null);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View Quotations
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Quotation ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Products
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href="#"
                      onClick={() => openProductsModal(quotation)} // Open modal on click
                      className="text-blue-600 hover:underline"
                    >
                      View Products
                    </a>
                  </td>
                </tr>
              ))}
              {quotations.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap">
                    No quotations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for displaying products */}
      {selectedQuotation && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-sky-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Vendors
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedQuotation.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.productId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
                onClick={closeProductsModal}
                className="mt-4 mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Quotation to vendor
            </button>

          </div>
        </div>
      )}
    </Layout>
  );
};

export default ViewQuotationsPage;
