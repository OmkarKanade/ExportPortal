import React, { useState, useEffect } from 'react';
import VendorDashboard from './VendorDashboard';
import './VendorProfileView.css';

const VendorProfileView = () => {
  const [vendorDetails, setVendorDetails] = useState({
     // username: '',
    // name: '',
    // organization: '',
    // contactNumber: '',
    // email: '',
    // state: '',
    // city: '',
    // address: '',
    // zipCode: '',
    // password: ''
    username: 'john_doe',
    name: 'John Doe',
    organization: 'ABC Inc.',
    contactNumber: '123-456-7890',
    email: 'johndoe@example.com',
    state: 'California',
    city: 'Los Angeles',
    address: '123 Main Street',
    zipCode: '90001',
    password: '******'
  });

  useEffect(() => {
    // Function to fetch customer details from ASP.NET API
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch('API_ENDPOINT/vendor/details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vendor details');
        }
        const data = await response.json();
        setVendorDetails(data); 
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      }
    };

    fetchVendorDetails();
  }, []);

  return (
    <VendorDashboard>
      <div className="container-mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center-mb-4">Vendor Profile</h2>
                <table className="table user-view-table">
                  <tbody>
                    <tr>
                      <th className="text-light transparent">Username: </th>
                      <td>{vendorDetails.username}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Name:</th>
                      <td>{vendorDetails.name}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Organization:</th>
                      <td>{vendorDetails.organization}</td>
                    </tr>
                    <tr>
                      <th className="text-light transparent">Contact:</th>
                      <td>{vendorDetails.contactNumber}</td>
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
                      <td>{vendorDetails.zipCode}</td>
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

