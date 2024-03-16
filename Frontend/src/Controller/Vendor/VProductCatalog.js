import React, { useState, useEffect, Fragment } from "react";
import VendorDashboard from "./VendorDashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPrices, setNewPrices] = useState({}); // Store new prices for each product

  const sid = sessionStorage.getItem("sid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/VendorQuotation/Vendor/${sid}`
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products with all products
        // Initialize newPrices with default values (0 for each product)
        const initialNewPrices = {};
        response.data.forEach((product) => {
          product.items.forEach((item) => {
            initialNewPrices[item.productId] = 0;
          });
        });
        setNewPrices(initialNewPrices);
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

  // Function to handle price input change for a specific product
  const handlePriceChange = (event, productId) => {
    const updatedPrices = { ...newPrices, [productId]: event.target.value };
    setNewPrices(updatedPrices);
  };

  // Function to handle submitting the updated prices for a specific product
  const handleSubmitPrice = async (productId) => {
    try {
      await axios.put(
        `https://localhost:7051/api/Product/UpdatePrice/${productId}`,
        {
          vendorId: sid,
          price: newPrices[productId],
        }
      );
      // Assuming the request is successful
      toast.success("Price updated successfully");
      console.log(`Price for Product ID ${productId} updated successfully`);
      // You might want to refetch the products after updating the prices
    } catch (error) {
      toast.error("Error updating price");
      console.error(`Error updating price for Product ID ${productId}:`, error);
    }
  };

  return (
    <Fragment>
      <VendorDashboard>
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Set Quotation Pricing
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
                  Quotation ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Set Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  return product.items.map((item, index) => (
                    <tr key={item.id}>
                      {index === 0 && (
                        <td
                          rowSpan={product.items.length}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {product.quotationId}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        Add Pricing
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.productName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          placeholder="Enter Amount"
                          value={newPrices[item.productId]}
                          onChange={(event) =>
                            handlePriceChange(event, item.productId)
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 w-32"
                        />
                        <button
                          onClick={() => handleSubmitPrice(item.productId)}
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ));
                })
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </VendorDashboard>
      <ToastContainer />
    </Fragment>
  );
};

export default VProductCatalog;
