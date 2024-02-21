import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Layout from './Controller/Layout/Layout';
import CreateCustomerForm from './Controller/Admin/CreateCustomerForm';
import CreateVendorForm from './Controller/Admin/CreateVendorForm';
import ProductForm from './Controller/Admin/ProductForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/create-vendorForm" element={<CreateVendorForm />} />
          <Route path="/create-customerForm" element={<CreateCustomerForm />} />
          <Route path="/create-ProductForm" element={<ProductForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;