import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomerForm from './Controller//Admin/CreateCustomerForm';
import CreateVendorForm from './Controller/Admin/CreateVendorForm';
import ProductForm from './Controller/Admin/ProductForm';
import AddNewCategory from './Controller/Admin/AddNewCategory';
import LoginForm from './Component/LoginForm/LoginForm';
import Home from './Controller/Layout/home';


// import Vendor from './Controller/Vendor/vendorlogin';
import Layout from './Controller/Layout/Layout'

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path='/loginadmin' element={<LoginForm/>}/>
          <Route path="/create-vendorForm" element={<CreateVendorForm />} />
          <Route path="/create-customerForm" element={<CreateCustomerForm />} />
          <Route path="/create-ProductForm" element={<ProductForm />} />
          <Route path="/create-Category" element={<AddNewCategory />} />
          {/* <Route path="/vendor" element={<Vendor />} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
     
    </Router>
  );
};

export default App;