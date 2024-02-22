import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import CustomerDashboard from './CustomerDashboard';

const Customer = () => {

  const productData =[
    {
      id:1,
      name : 'ParleG',
      category: 'biscuits',
      Totalrate: '10 Rs',
      weight: '20gms',
    },
    {
      id:2,
      name : 'Good Day',
      category: 'biscuits',
      Totalrate: '20 Rs',
      weight: '20gms',
    },
    {
      id:3,
      name : 'Crack Jack',
      category: 'biscuits',
      Totalrate: '15 Rs',
      weight: '20gms',
    },
    {
      id:4,
      name : 'Sunfest',
      category: 'biscuits',
      Totalrate: '25 Rs',
      weight: '20gms',
    }
  ]
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('YOUR_API_ENDPOINT');
  //       const result = await response.json();
  //       setData(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); 



  useEffect(() => {
    setData(productData);
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
              <th>Total Rate</th>
              <th>Weight</th>
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
                      <td>{item.Totalrate}</td>
                      <td>{item.weight}</td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td colSpan="6">Loading...</td>
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
