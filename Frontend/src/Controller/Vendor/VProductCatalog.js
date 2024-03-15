import React, { useState, useEffect, Fragment } from "react";
import VendorDashboard from "./VendorDashboard";
import axios from "axios";

const VProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sid = sessionStorage.getItem("sid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/VendorQuotation/Vendor/${sid}`
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products with all products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sid) {
      fetchData();
    }
  }, [sid]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    applyFilters(searchTerm);
  }, [searchTerm, products]);

  // Function to apply filters
  const applyFilters = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        Object.values(product).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    }
  };

  // Function to handle sending to admin
  const handleSendToAdmin = () => {
    // Logic to send data to admin
    alert("Sending to admin...");
  };

  return (
    <Fragment>
      <VendorDashboard>
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View Quotations
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Customer Name or Product Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 px-3 py-2 rounded-md mr-2"
          />
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Sr
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Quotation ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Set Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          placeholder="Enter Amount"
                          className="border border-gray-300 rounded-md px-3 py-2 w-32"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={handleSendToAdmin}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Send to Admin
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </VendorDashboard>
    </Fragment>
  );
};

export default VProductCatalog;
