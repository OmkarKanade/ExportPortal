import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCustomerForm from "./Controller/Admin/CreateCustomerForm";
import CreateVendorForm from "./Controller/Admin/CreateVendorForm";
import NewProductForm from "./Controller/Admin/NewProductForm";
import AddNewCategory from "./Controller/Admin/AddNewCategory";
import LoginForm from "./Component/LoginForm";
import Home from "./Controller/Layout/home";
import Vendord from "./Controller/Vendor/VendorDashboard";
import Layout from "./Controller/Layout/Layout";
import Customer from "./Controller/Customer/customer";
import CustomerDashboard from "./Controller/Customer/CustomerDashboard";
import VendorProfileView from "./Controller/Vendor/vendorProfileView";
import AssignedProducts from "./Controller/Vendor/AssignedProducts";
import PageNotFound from "./Component/PageNotFound";
import ProductList from "./Controller/Admin/ProductList";
import CProductList from "./Controller/Customer/CProductList";
import UserList from "./Controller/UsersList";
import AboutUsPage from "./Controller/Layout/aboutus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Controller/Admin/ProductDetails";
import AddNewCertificate from "./Controller/Admin/AddNewCertificate";
import ProductCatalog from "./Controller/Admin/ProductCatalog";
import AddNewCurrency from "./Controller/Admin/AddNewCurrency";
import ViewAllCurrency from "./Controller/Admin/ViewAllCurrency";
import CProductCatalog from "./Controller/Customer/CProductCatalog";
import CustomerProfileView from "./Controller/Customer/CustomerProfileView";
import ViewQuotaionsPage from "./Controller/Admin/ViewQuotaionsPage";
import VProductCatalog from "./Controller/Vendor/VProductCatalog";
import ViewAllQuotationsPage from "./Controller/Customer/ViewAllQuotationsPage";
import ViewCurrentQuotation from "./Controller/Customer/ViewCurrentQuotation";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Get All Users */}
        <Route path="/getAll-users" element={<UserList />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Routes */}
        <Route path="/layout" element={<Layout />} />
        <Route path="/create-vendorForm" element={<CreateVendorForm />} />
        <Route path="/create-customerForm" element={<CreateCustomerForm />} />
        <Route path="/create-ProductForm" element={<NewProductForm />} />
        <Route path="/create-Category" element={<AddNewCategory />} />
        <Route path="/addCertificate" element={<AddNewCertificate />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/add-Currency" element={<AddNewCurrency />} />
        <Route path="/viewAll-currencies" element={<ViewAllCurrency />} />

        {/* Vendor Routes */}
        <Route path="/vendorDashboard" element={<Vendord />} />
        <Route path="/vendor-Profile" element={<VendorProfileView />} />
        <Route path="/vendor-assignedProducts" element={<AssignedProducts />} />
        <Route path="/vendor-productCatalog" element={<VProductCatalog />} />
        <Route
          path="/viewsent-quotations"
          element={<ViewAllQuotationsPage />}
        />

        {/* Customer Routes */}
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/customer-id" element={<Customer />} />
        <Route path="/customer-profile" element={<CustomerProfileView />} />
        <Route path="/cProductList" element={<CProductList />} />
        <Route path="/Cproduct-Catalog" element={<CProductCatalog />} />
        <Route path="/customer-Quotaions" element={<ViewQuotaionsPage />} />
        <Route
          path="/viewsent-Quotations"
          element={<ViewAllQuotationsPage />}
        />
        <Route
          path="/viewCurrent-Quotation"
          element={<ViewCurrentQuotation />}
        />
      </Routes>
    </Router>
  );
};

export default App;
