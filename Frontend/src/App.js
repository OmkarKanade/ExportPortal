import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomerForm from './Controller//Admin/CreateCustomerForm';
import CreateVendorForm from './Controller/Admin/CreateVendorForm';
import ProductForm from './Controller/Admin/ProductForm';
import AddNewCategory from './Controller/Admin/AddNewCategory';
import LoginForm from './Component/LoginForm/LoginForm';
import Home from './Controller/Layout/home';
import Vendord from './Controller/Vendor/VendorDashboard';
import Vendorlg from './Controller/Vendor/vendorlogin';
import Layout from './Controller/Layout/Layout'
import Customer from './Controller/Customer/customer';
import CustomerDashboard from './Controller/Customer/CustomerDashboard';


const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path='/loginadmin' element={<LoginForm/>}/>
          <Route path="/create-vendorForm" element={<CreateVendorForm />} />
          <Route path="/create-customerForm" element={<CreateCustomerForm />} />
          <Route path="/create-ProductForm" element={<ProductForm />} />
          <Route path="/create-Category" element={<AddNewCategory />} />

          <Route path="/vendord" element={<Vendord />} />
          <Route path="/vendorlogin" element={<Vendorlg />} />
          
          <Route path="/" element={<Home/>} />
          <Route path='/customer-id' element={<Customer/>} />
          <Route path='/customerDashboard' element={<CustomerDashboard/>} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
     
    </Router>
  );
};

export default App;