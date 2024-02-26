import React, { useState, useEffect } from 'react';
import VendorDashboard from './VendorDashboard';
import './VendorProfileView.css';
import axios from 'axios';


const VendorProfileView = () => {
  const [vendorDetails, setVendorDetails] = useState({
    name: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipcode: '',
    password: ''
  });

  useEffect(() => {
       fetchVendorDetails();
  }, []);
  const sid = sessionStorage.getItem('sid');
  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7051/api/Vendor/${sid}`);
      console.log('Response from server:', response.data);
      const profileData = response.data;
      setVendorDetails(profileData); // Update state with fetched customer details
      console.log(profileData);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };
  return (
    <VendorDashboard>
      <div className="container-mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="cardd">
              <div className="cardd-body">
                <h2 className="text-center-mb-4">Vendor Profile</h2>
                <table className="table user-view-table">
                  <tbody>
                    {/* <tr>
                      <th className="text-light transparent">Username: </th>
                      <td>{vendorDetails.username}</td>
                    </tr> */}
                    <tr>
                      <th className="text-light transparent">Name:</th>
                      <td>{vendorDetails.name}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Organization:</th>
                      <td>{vendorDetails.organizationName}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Contact:</th>
                      <td>{vendorDetails.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Email:</th>
                      <td>{vendorDetails.email}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">State:</th>
                      <td>{vendorDetails.state}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">City:</th>
                      <td>{vendorDetails.city}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Address:</th>
                      <td>{vendorDetails.address}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Zip Code:</th>
                      <td>{vendorDetails.zipcode}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Password:</th>
                      <td>{vendorDetails.password}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboard>
  );
};

export default VendorProfileView;

