import React, { useState, useEffect, Fragment } from "react";
import CustomerDashboard from "./CustomerDashboard";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [addedToQuotation, setAddedToQuotation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7051/api/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const sid = sessionStorage.getItem("sid");
    setCustomerId(sid || ""); // Set default value to empty string if sid is null

    // Retrieve added products from sessionStorage
    const addedProducts =
      JSON.parse(sessionStorage.getItem("addedToQuotation")) || {};
    setAddedToQuotation(addedProducts);
  }, []);

  useEffect(() => {
    // Save added products to sessionStorage whenever it changes
    sessionStorage.setItem(
      "addedToQuotation",
      JSON.stringify(addedToQuotation)
    );
  }, [addedToQuotation]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const totalQuantity = newQuantity * product.bagOrBoxBumpers;
        return {
          ...product,
          netquantity: newQuantity,
          totalQuantity: totalQuantity,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const postQuotation = async (productId, totalQuantity, customerId) => {
    try {
      const response = await axios.post(
        "https://localhost:7051/api/Quotation/AddItem",
        {
          productId: productId,
          quantity: totalQuantity,
          customerId: customerId,
        }
      );

      console.log("Quotation posted successfully:", response.data);
      toast.success("Added to Quotation successfully!");
      setAddedToQuotation((prev) => ({
        ...prev,
        [productId]: true,
      }));
    } catch (error) {
      console.error("Error posting quotation:", error);
      toast.error("Failed to add to Quotation. Please try again.");
    }
  };

  return (
    <Fragment>
      <CustomerDashboard>
        <ToastContainer />
        {/* Product Table */}
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Products Catalog
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Sr
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Bag or Box
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Net Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  const isAdded = addedToQuotation[product.id];
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.productId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.vendorCategory.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.totalRate} Rs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.bagOrBoxBumpers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            value={product.netquantity || 0}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="border border-gray-300 px-3 py-1 w-16 text-center"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.totalQuantity || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className={`${
                            isAdded
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-sky-700 hover:bg-sky-900"
                          } text-white font-bold py-2 px-4 rounded`}
                          onClick={() =>
                            postQuotation(
                              product.id,
                              product.totalQuantity,
                              customerId
                            )
                          }
                          disabled={isAdded}
                        >
                          {isAdded ? "Added to Quotation" : "Add to Quotation"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 whitespace-nowrap">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CustomerDashboard>
    </Fragment>
  );
};

export default CProductCatalog;
