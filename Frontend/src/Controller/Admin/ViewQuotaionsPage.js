import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

const ViewQuotaionsPage = () => {
  // State to hold the fetched quotations
  const [quotations, setQuotations] = useState([]);

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
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Customer ID
                </th> */}
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
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.customerId}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {quotation.items.map((item) => (
                        <li key={item.id} className="py-2">
                          <div>
                            <strong>Product Name:</strong> {item.productName}
                          </div>
                          <div className="mt-1">
                            <strong>Product ID:</strong> {item.productId}
                          </div>
                          <div className="mt-1">
                            <strong>Quantity:</strong> {item.quantity}
                          </div>
                          {/* Add more item details as needed */}
                        </li>
                      ))}
                    </ul>
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
    </Layout>
  );
};

export default ViewQuotaionsPage;
