import React, { useState, useEffect } from 'react';
import VendorDashboard from './VendorDashboard';
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
      ...vendorDetails
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
      <div className="container mx-auto mt-10 flex items-center justify-center">
        <div className="mx-auto">
          <div className="bg-white shadow-md border-2 border-blue-500 shadow-blue-500 rounded-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-4">Vendor Profile</h2>
              <table className="table-auto w-full leading-8">
                <tbody>
                  <tr>
                    <th className="text-gray-600 pr-4">Name:</th>
                    <td>{vendorDetails.name}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">Organization:</th>
                    <td>{vendorDetails.organizationName}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">Contact:</th>
                    <td>{vendorDetails.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">Email:</th>
                    <td>{vendorDetails.email}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">State:</th>
                    <td>{vendorDetails.state}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">City:</th>
                    <td>{vendorDetails.city}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">Address:</th>
                    <td>{vendorDetails.address}</td>
                  </tr>
                  <tr>
                    <th className="text-gray-600 pr-4">Zip Code:</th>
                    <td>{vendorDetails.zipcode}</td>
                  </tr>
                </tbody>
              </table>
              <button className="block mx-auto mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditModalOpen}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-md w-80 p-6">
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-500" onClick={handleEditModalClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="flex items-center justify-center leading-9">
                <label className="text-gray-700 mr-1">Organization:</label>
                <input
                  type="text"
                  name="organizationName"
                  value={editedVendorDetails.organizationName}
                  onChange={handleInputChange}
                  className="form-input mt-1 w-full"
                />
              </div>
              <div className="flex items-center justify-center leading-9">
                <label className="block text-gray-700 mr-9">Contact:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedVendorDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>
              <div className="flex items-center justify-center leading-9">
                <label className="block text-gray-700 mr-14">State:</label>
                <input
                  type="text"
                  name="state"
                  value={editedVendorDetails.state}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>
              <div className="flex items-center justify-center leading-9">
                <label className="block text-gray-700 mr-16">City:</label>
                <input
                  type="text"
                  name="city"
                  value={editedVendorDetails.city}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>
              <div className="flex items-center justify-center leading-9">
                <label className="block text-gray-700 mr-8">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={editedVendorDetails.address}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>
              <div className="flex items-center justify-center leading-9">
                <label className="block text-gray-700 mr-7">ZipCode:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={editedVendorDetails.zipcode}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>
              <button type="button" className="block mx-auto mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveChanges}>
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
