import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import CustomerDashboard from './CustomerDashboard';

const Customer = () => {

  const [data, setData] = useState([]);

  // Uncomment this fetchData function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7051/api/Product'); // Updated API endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomerDashboard>
      <div className="customer-table-container">
        <Fragment>
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Product Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Product Scientific Name</th>
                <th>HSN Code</th>
                <th>Total Rate</th>
                <th>Weight</th>
                <th>Pouch Type</th>
                <th>Certification</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.length > 0 ?
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index +1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.productScientificName}</td> {/* Updated with actual property */}
                        <td>{item.hsnCode}</td> {/* Updated with actual property */}
                        <td>{item.Totalrate}</td>
                        <td>{item.weight}</td>
                        <td>{item.pouchType}</td> {/* Updated with actual property */}
                        <td>{item.certification}</td> {/* Updated with actual property */}
                        <td>{item.ingredients}</td> {/* Updated with actual property */}
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan="11">Loading...</td>
                  </tr>
              }
            </tbody>
          </table>
        </Fragment>
      </div>
    </CustomerDashboard>
  )
}

export default Customer;
