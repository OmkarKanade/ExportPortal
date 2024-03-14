import React, { useState, useEffect, Fragment } from "react";
import VendorDashboard from "./VendorDashboard";
import axios from "axios";

const VProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  return (
    <Fragment>
      <VendorDashboard>
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          View Quotations
        </h1>
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
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Id
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Quantity
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

                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {product.item.productId}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.item.quantity}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
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
