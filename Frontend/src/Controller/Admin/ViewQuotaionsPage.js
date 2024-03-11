import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

const ViewQuotationsPage = () => {
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

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Quotations List:</h2>
          <ul>
            {quotations.map((quotation) => (
              <li key={quotation.id}>
                <strong>Quotation ID:</strong> {quotation.id}
                <br />
                <strong>Customer Name:</strong> {quotation.customerName}
                <br />
                <strong>Status:</strong>{" "}
                {quotation.status ? "Active" : "Inactive"}
              </li>
            ))}
            {quotations.length === 0 && <li>No quotations found.</li>}
          </ul>
        </div>

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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotations.map((quotation) =>
                quotation.items.map((item) => (
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
                  </tr>
                ))
              )}
              {quotations.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
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

export default ViewQuotationsPage;
  