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
const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCustomerDetails, setEditedCustomerDetails] = useState({
 
    organizationName: '',
    phoneNumber: '',
    state: '',
    city: '',
    address: '',
    zipcode: '',
    password: '',
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




  const handleEditModalOpen = () => {
    setEditedCustomerDetails({
      // name: customerDetails.name,
      organizationName: customerDetails.organizationName,
      phoneNumber: customerDetails.phoneNumber,
      state: customerDetails.state,
      city: customerDetails.city,
      address: customerDetails.address,
      zipcode: customerDetails.zipcode,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Make API call to update customer 
      console.log('Saving changes:', editedCustomerDetails);

      // Close the modal after saving changes
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error saving changes:', error);
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
                <button className="btn btn-primary" onClick={handleEditModalOpen}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="close" onClick={handleEditModalClose}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <form>
              {/* <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedCustomerDetails.name}
                  onChange={handleInputChange}
                  readOnly
                />
              </div> */}
              <div className="form-group">
                <label>Organization:</label>
                <input
                  type="text"
                  name="organizationName"
                  value={editedCustomerDetails.organizationName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Contact:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedCustomerDetails.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={editedCustomerDetails.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={editedCustomerDetails.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={editedCustomerDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={editedCustomerDetails.zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </CustomerDashboard>
  );
};

export default CustomerProfileView;
