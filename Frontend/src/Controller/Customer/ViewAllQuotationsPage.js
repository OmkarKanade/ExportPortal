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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editQuotation, setEditQuotation] = useState({
    id: null,
    productId: "",
    productName: "",
    quantity: 0,
  });

  useEffect(() => {
    const sid = sessionStorage.getItem("sid");
    const fetchQuotations = async () => {
      try {
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

  // Function to handle edit icon click
  const handleEditClick = (quotation) => {
    setEditQuotation(quotation);
    setEditModalOpen(true);
  };

  // Function to handle delete icon click
  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(
        `https://localhost:7051/api/Quotation/DeleteItems/${itemId}`
      );

      const updatedQuotations = quotations.filter(
        (quotation) => quotation.id !== itemId
      );
      setQuotations(updatedQuotations);

      const updatedFilteredQuotations = filteredQuotations.filter(
        (quotation) => quotation.id !== itemId
      );
      setFilteredQuotations(updatedFilteredQuotations);

      toast.success("Quotation deleted successfully");
    } catch (error) {
      console.error("Error deleting quotation:", error);
      toast.error("Failed to delete quotation");
    }
  };

  // Function to handle save changes
  const handleSaveChanges = async () => {
    try {
      const updatedQuotation = {
        id: editQuotation.id,
        productId: editQuotation.productId,
        productName: editQuotation.productName,
        quantity: editQuotation.quantity,
      };

      const response = await axios.put(
        `https://localhost:7051/api/Quotation/UpdateItem/${editQuotation.id}`,
        { quantity: editQuotation.quantity }
      );

      if (response.status === 200) {
        const updatedQuotations = quotations.map((quotation) =>
          quotation.id === updatedQuotation.id ? updatedQuotation : quotation
        );
        setQuotations(updatedQuotations);

        // Update filteredQuotations state for displaying updated data in the table
        const updatedFilteredQuotations = filteredQuotations.map((quotation) =>
          quotation.id === updatedQuotation.id ? updatedQuotation : quotation
        );
        setFilteredQuotations(updatedFilteredQuotations);

        toast.success("Quotation updated successfully");
      } else {
        toast.error("Failed to update quotation");
      }

      // Close the edit modal
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating quotation:", error);
      toast.error("Failed to update quotation");
    }
  };

  // Function to handle sending quotations to admin
  const handleSendQuotations = async () => {
    try {
      // Here you can implement the logic to send quotations to the admin
      // This could involve making a POST request to an endpoint with the list of quotations to send

      // For demonstration purposes, let's assume a successful "send"
      toast.success("Quotations sent to admin successfully");
    } catch (error) {
      console.error("Error sending quotations to admin:", error);
      toast.error("Failed to send quotations to admin");
    }
  };

  return (
    <Fragment>
      <CustomerDashboard>
        {/* Search Input */}
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View All Quotations: {quotations.customerName}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.length > 0 ? (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(quotation)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(quotation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                    No quotations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Send Quotations to Admin Button */}
        <div className="flex justify-end mt-4">
          <button
            // onClick={handleSendQuotations}
            className="bg-sky-700 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            style={{ marginRight: 0 }}
          >
            Send Quotations to Admin
          </button>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-4 shadow-lg rounded-md w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Edit Quotation Quantity
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="editQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="editQuantity"
                    value={editQuotation.quantity}
                    onChange={(e) =>
                      setEditQuotation({
                        ...editQuotation,
                        quantity: e.target.value,
                      })
                    }
                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomerDashboard>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Fragment>
  );
};

export default ViewAllQuotationsPage;
