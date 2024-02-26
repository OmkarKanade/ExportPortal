import React, { useState, useEffect } from 'react';
import CustomerDashboard from './CustomerDashboard';
import './CustomerProfileView.css';
import axios from 'axios';

const CustomerProfileView = () => {
  const [customerDetails, setCustomerDetails] = useState({
    username: '',
    name: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipcode: '',
    password: 'Pass@123',
  });

  useEffect(() => {
    fetchCustomerDetails();
    
    
  }
  , []);
  const sid = sessionStorage.getItem('sid');
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7051/api/Customer/${sid}`);
      console.log('Response from server:', response.data);
      const profileData = response.data;
      setCustomerDetails(profileData); // Update state with fetched customer details
      console.log(profileData);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };
  return (
    <CustomerDashboard>
     
      <div className="container-mt-4">
        <div className="row">
          <div className="col-md-8-offset-md-2">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center-mb-4">Customer Profile</h2>
                <table className="table user-view-table">
                  <tbody>
                    {/* <tr>
                      <th className="text-light transparent">Username: </th>
                      <td>{customerDetails.username}</td>
                    </tr> */}
                    <tr>
                      <th className="text-light transparent">Name:</th>
                      <td>{customerDetails.name}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Organization:</th>
                      <td>{customerDetails.organizationName}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Contact:</th>
                      <td>{customerDetails.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Email:</th>
                      <td>{customerDetails.email}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">State:</th>
                      <td>{customerDetails.state}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">City:</th>
                      <td>{customerDetails.city}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Address:</th>
                      <td>{customerDetails.address}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Zip Code:</th>
                      <td>{customerDetails.zipcode}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Password:</th>
                      <td>{customerDetails.password}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerDashboard>
  );
};

export default CustomerProfileView;
