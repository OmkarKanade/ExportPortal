import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomerForm from './Controller//Admin/CreateCustomerForm';
import CreateVendorForm from './Controller/Admin/CreateVendorForm';
import ProductForm from './Controller/Admin/ProductForm';
import AddNewCategory from './Controller/Admin/AddNewCategory';
import LoginForm from './Component/LoginForm/LoginForm';
import Home from './Controller/Layout/home';
import Vendord from './Controller/Vendor/VendorDashboard';
import Layout from './Controller/Layout/Layout'
import Customer from './Controller/Customer/customer';
import CustomerDashboard from './Controller/Customer/CustomerDashboard';
import CustomerProfileView from './Controller/Customer/cutomerProfileView';
import VendorProfileView from './Controller/Vendor/vendorProfileView';
import AssignedProducts from './Controller/Vendor/AssignedProducts';
import PageNotFound from './Component/PageNotFound';
import ProductList from './Controller/Admin/ProductList';
import CProductList from './Controller/Customer/CProductList';
import UserList from './Controller/UsersList';
import AboutUsPage from './Controller/Layout/aboutus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from './Controller/Admin/SingleProduct';




const App = () => {
  return (
    
    <Router>
      <ToastContainer />
        <Routes>

          {/* //Get All Users// */}
          <Route path="/getAll-users" element={<UserList />}></Route>
          
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<LoginForm/>}/>
          <Route  path='*' element={<PageNotFound/>} />
          <Route  path='/ProductList' element={<ProductList/>} />
          <Route  path='/cProductList' element={<CProductList/>} />
          <Route  path='/aboutus' element={<AboutUsPage/>} />
          <Route path='/singleProduct' element={<SingleProduct/>} />

          {/* //Admin Routes// */}
          <Route path="/layout" element={<Layout />} />
          <Route path="/create-vendorForm" element={<CreateVendorForm />} />
          <Route path="/create-customerForm" element={<CreateCustomerForm />} />
          <Route path="/create-ProductForm" element={<ProductForm />} />
          <Route path="/create-Category" element={<AddNewCategory />} />

          {/* //Vendor Routes// */}
          <Route path="/vendorDashboard" element={<Vendord />} />
          <Route path='/vendor-Profile' element={<VendorProfileView/>} />
          <Route path='/vendor-assignedProducts' element={<AssignedProducts/>} />

          {/* //Customer Routes// */}
          <Route path='/customerDashboard' element={<CustomerDashboard/>} />
          <Route path='/customer-id' element={<Customer/>} />
          <Route path='/customer-profile' element={<CustomerProfileView/>} />
          
        </Routes>
    </Router>
  );
};

export default App;
