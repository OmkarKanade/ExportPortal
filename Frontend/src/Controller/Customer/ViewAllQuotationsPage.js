import React, { useState, useEffect, Fragment } from "react";
import CustomerDashboard from "./CustomerDashboard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllQuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const sid = sessionStorage.getItem("sid");
        if (!sid) {
          throw new Error("Session ID is missing.");
        }
        const response = await axios.get(
          `https://localhost:7051/api/Quotation/Customer/${sid}`
        );
        setQuotations(response.data.items);
        setFilteredQuotations(response.data.items);
      } catch (error) {
        console.error("Error fetching quotations:", error);
        toast.error("Failed to fetch quotations");
      }
    };

    fetchQuotations();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    applyFilters(searchTerm);
  };

  // Function to apply filters
  const applyFilters = (searchTerm) => {
    let filtered = quotations;

    // Filter by search term
    filtered = filtered.filter(
      (quotation) =>
        quotation.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredQuotations(filtered);
  };

  return (
    <Fragment>
      <CustomerDashboard>
        {/* Search Input */}
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View All Sent Quotations
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by Product ID or Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 px-3 py-2 rounded-md mr-2 w-72"
          />
        </div>

        {/* Quotation Table */}
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations && filteredQuotations.length > 0 ? (
                filteredQuotations.map((quotation) => (
                  <tr key={quotation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quotation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quotation.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quotation.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quotation.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap">
                    No quotations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CustomerDashboard>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Fragment>
  );
};

export default ViewAllQuotationsPage;
