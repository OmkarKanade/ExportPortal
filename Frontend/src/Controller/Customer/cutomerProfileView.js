import React, { useState, useEffect } from 'react';
import CustomerDashboard from './CustomerDashboard';
import './CustomerProfileView.css';


const CustomerProfileView = () => {
  const [customerDetails, setCustomerDetails] = useState({
    // username: '',
    // name: '',
    // organization: '',
    // contactNumber: '',
    // email: '',
    // state: '',
    // city: '',
    // address: '',
    // zipCode: '',
    // password: '',
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
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch('API_ENDPOINT/customer/details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any necessary authentication headers if required
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        setCustomerDetails(data); // Update state with fetched customer details
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, []);

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
                <tr>
                  <th className="text-light transparent">Username: </th>
                  <td>{customerDetails.username}</td>
                </tr>
                <tr>
                  <th className="text-light transparent">Name:</th>
                  <td>{customerDetails.name}</td>
                </tr>
                <tr>
                  <th className="text-light transparent">Organization:</th>
                  <td>{customerDetails.organization}</td>
                </tr>
                <tr>
                  <th className="text-light transparent">Contact:</th>
                  <td>{customerDetails.contactNumber}</td>
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
                  <td>{customerDetails.zipCode}</td>
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
