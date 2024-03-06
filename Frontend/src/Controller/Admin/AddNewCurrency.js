import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';

const AddNewCurrency = () => {
  const [currencyData, setCurrencyData] = useState({
    name: '',
    code: ''
  });

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData({
      ...currencyData,
      [name]: value,
    });
  };

  const handleCurrencySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7051/api/Currency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyData), // Changed from categoryData to currencyData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('New currency added:', data);

      // Show toast notification for success
      toast.success('New currency added!');

      // Clear the form data after successful submission
      setCurrencyData({
        name: '',
        code: ''
      });

    } catch (error) {
      console.error('Error adding currency:', error);

      // Show toast notification for error
      toast.error('Failed to add currency');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 ml-20 text-gray-700">Add new Currency</h1>
          <form onSubmit={handleCurrencySubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-sky-700 shadow-sky-700">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Currency Name:</label>
              <input
                type="text"
                name="name"
                value={currencyData.name}
                onChange={handleCurrencyChange} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Currency Code:</label>
              <input
                type="text"
                name="code"
                value={currencyData.code}
                onChange={handleCurrencyChange} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Currency</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewCurrency;
