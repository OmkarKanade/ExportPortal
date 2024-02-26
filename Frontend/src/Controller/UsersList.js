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
        setAdmins(adminsResponse.data);

        const customersResponse = await axios.get('https://localhost:7051/api/Customer');
        setCustomers(customersResponse.data);

        const vendorsResponse = await axios.get('https://localhost:7051/api/Vendor');
        setVendors(vendorsResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <div className="user-category">
        <h2>Admins: </h2>
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>{admin.name}</li>
          ))}
        </ul>
      </div>
      <div className="user-category">
        <h2>Customers: </h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      </div>
      <div className="user-category">
        <h2>Vendors: </h2>
        <ul>
          {vendors.map((vendor) => (
            <li key={vendor.id}>{vendor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
