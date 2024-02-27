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

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedVendorDetails, setEditedVendorDetails] = useState({
    name: '',
    organizationName: '',
    phoneNumber: '',
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
      const profileData = response.data;
      setVendorDetails(profileData);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  const handleEditModalOpen = () => {
    setEditedVendorDetails({
      ...vendorDetails // Initialize edited details with current vendor details
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const confirmUpdate = window.confirm(`Do you really want to update details for ${sid}?`);
      if (confirmUpdate) {
        const response = await axios.put(`https://localhost:7051/api/Vendor/${sid}`, editedVendorDetails);
        if (response.status === 200) {
          setEditModalOpen(false);
          fetchVendorDetails();
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
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
            <span className="close" onClick={handleEditModalClose}>&times;
            </span>
            <h2>Edit Profile</h2>
            <form>
              {/* <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedVendorDetails.name}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="form-group">
                <label>Organization:</label>
                <input
                  type="text"
                  name="organizationName"
                  value={editedVendorDetails.organizationName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Contact:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedVendorDetails.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={editedVendorDetails.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={editedVendorDetails.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={editedVendorDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={editedVendorDetails.zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={editedVendorDetails.password}
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
    </VendorDashboard>
  );
};

export default VendorProfileView;