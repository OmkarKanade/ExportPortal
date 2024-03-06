import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAllCurrency = () => {
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setFilteredCurrencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCurrency, setEditCurrency] = useState({ id: null, name: '', code: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7051/api/Currency');
                setCurrencies(response.data);
                setFilteredCurrencies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        applyFilters(searchTerm);
    };

    // Function to apply filters
    const applyFilters = (searchTerm) => {
        let filtered = currencies;

        // Filter by search term
        filtered = filtered.filter(currency =>
            currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.code.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCurrencies(filtered);
    };

    // Function to handle edit icon click
    const handleEditClick = (currency) => {
        setEditCurrency(currency);
        setEditModalOpen(true);
    };

    // Function to handle save changes
    const handleSaveChanges = async () => {
        try {
            const updatedCurrency = {
                id: editCurrency.id,
                name: editCurrency.name,
                code: editCurrency.code
            };

            await axios.put(`https://localhost:7051/api/Currency/${editCurrency.id}`, updatedCurrency);

            
            const updatedCurrencies = currencies.map(curr => (curr.id === updatedCurrency.id ? updatedCurrency : curr));
            setCurrencies(updatedCurrencies);

            // Update filteredCurrencies state for displaying updated data in the table
            const updatedFilteredCurrencies = filteredCurrencies.map(curr => (curr.id === updatedCurrency.id ? updatedCurrency : curr));
            setFilteredCurrencies(updatedFilteredCurrencies);
            toast.success('Currency updated successfully');

            // Close the edit modal
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error updating currency:', error);

            toast.error('Failed to update currency');
        }
    };

    return (
        <Fragment>
            <Layout>
                {/* Search Input */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or code"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 px-3 py-2 rounded-md mr-2 w-72"
                    />
                </div>

                {/* Currency Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-sky-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                filteredCurrencies && filteredCurrencies.length > 0 ?
                                    filteredCurrencies.map(currency => (
                                        <tr key={currency.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{currency.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{currency.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{currency.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEditClick(currency)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 whitespace-nowrap">No currencies found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white p-4 shadow-lg rounded-md w-80">
                                <h2 className="text-lg font-semibold mb-4">Edit Currency</h2>
                                <div className="mb-4">
                                    <label htmlFor="editName" className="block text-sm font-medium text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        id="editName"
                                        value={editCurrency.name}
                                        onChange={(e) => setEditCurrency({ ...editCurrency, name: e.target.value })}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="editCode" className="block text-sm font-medium text-gray-700">Code:</label>
                                    <input
                                        type="text"
                                        id="editCode"
                                        value={editCurrency.code}
                                        onChange={(e) => setEditCurrency({ ...editCurrency, code: e.target.value })}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditModalOpen(false)}
                                        className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </Fragment>
    )
}

export default ViewAllCurrency;
