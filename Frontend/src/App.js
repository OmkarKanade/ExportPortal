import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomerForm from './Controller//Admin/CreateCustomerForm';
import CreateVendorForm from './Controller/Admin/CreateVendorForm';
import ProductForm from './Controller/Admin/ProductForm';
import LoginForm from './Component/LoginForm/LoginForm';
import Layout from './Controller/Layout/Layout'

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path="/create-vendorForm" element={<CreateVendorForm />} />
          <Route path="/create-customerForm" element={<CreateCustomerForm />} />
          <Route path="/create-ProductForm" element={<ProductForm />} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
     
    </Router>
  );
};

export default App;