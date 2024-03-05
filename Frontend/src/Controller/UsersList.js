import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Layout/Header';

function UserList() {
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const customersResponse = await axios.get('https://localhost:7051/api/Customer');
        const customersData = customersResponse.data.map(user => ({ ...user, category: 'customer' }));
        setCustomers(customersData);

        const vendorsResponse = await axios.get('https://localhost:7051/api/Vendor');
        const vendorsData = vendorsResponse.data.map(user => ({ ...user, category: 'vendor' }));
        setVendors(vendorsData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderUsers = (users) => {
    return (
      <ul>
        {users.map((user, index) => (
          <li key={user.id} className="flex items-center py-2">
            <span className="user-serial">{index + 1}. </span>
            <span className="user-name">{user.name}</span>
            <span className="user-email"> ({user.email})</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="user-list mx-auto max-w-screen-lg px-4">
        <div className="backbutton my-4">
          <Link to="/layout" className="ml-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Layout
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-sky-700 shadow-sky-700 user-category bg-white shadow-md rounded px-4 py-2">
            <h2 className="text-lg font-semibold mb-2">Customers: </h2>
            {renderUsers(customers)}
          </div>
          <div className="border-2 border-sky-700 shadow-sky-700 user-category bg-white shadow-md rounded px-4 py-2">
            <h2 className="text-lg font-semibold mb-2">Vendors: </h2>
            {renderUsers(vendors)}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
