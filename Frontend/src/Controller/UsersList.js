import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Your CSS file for styling

function UserList() {
  const [admins, setAdmins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminsResponse = await axios.get('https://localhost:7051/api/Admin');
        const adminsData = adminsResponse.data.map(user => ({ ...user, category: 'admin' }));
        setAdmins(adminsData);

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
          <li key={user.id}>
            <span className="user-serial">{index + 1}. </span>
            <span className="user-name">{user.name}</span>
            <span className="user-email"> ({user.email})</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="user-list">
      <div className="user-category">
        <h2>Admins: </h2>
        {renderUsers(admins)}
      </div>
      <div className="user-category">
        <h2>Customers: </h2>
        {renderUsers(customers)}
      </div>
      <div className="user-category">
        <h2>Vendors: </h2>
        {renderUsers(vendors)}
      </div>
    </div>
  );
}

export default UserList;
