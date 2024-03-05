import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('name');
    const [filterValue, setFilterValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7051/api/Product');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products with all products
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

        applyFilters(searchTerm, filterBy, filterValue);
    };

    // Function to handle filter by change
    const handleFilterByChange = (event) => {
        const selectedFilter = event.target.value;
        setFilterBy(selectedFilter);

        applyFilters(searchTerm, selectedFilter, filterValue);
    };

    // Function to handle filter value change
    const handleFilterValueChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);

        applyFilters(searchTerm, filterBy, value);
    };

    // Function to handle sort order change
    const handleSortOrderChange = (event) => {
        const selectedOrder = event.target.value;
        setSortOrder(selectedOrder);

        sortProducts(selectedOrder);
    };

    // Function to apply filters
    const applyFilters = (searchTerm, filterBy, value) => {
        let filtered = products;

        // Filter by search term
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter by selected filter
        if (value !== '') {
            filtered = filtered.filter(product =>
                String(product[filterBy]).toLowerCase().includes(value.toLowerCase())
            );
        }

        // Apply sorting
        sortProducts(sortOrder, filtered);
    };

    // Function to sort products
    const sortProducts = (order, productsList = filteredProducts) => {
        const sortedProducts = [...productsList];

        sortedProducts.sort((a, b) => {
            const rateA = parseFloat(a.totalRate);
            const rateB = parseFloat(b.totalRate);

            if (order === 'asc') {
                return rateA - rateB;
            } else {
                return rateB - rateA;
            }
        });

        setFilteredProducts(sortedProducts);
    };


    // Function to generate custom product ID
    const generateProductId = (index) => {
        return `000${index + 1}`.slice(-4);
    };

    return (
        <Fragment>
            <Layout>
                {/* Search Input, Filter Options, and Sorting */}
                <h1 className="text-3xl text-gray-700 font-bold mb-4">Products Catalog</h1>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    {/* Search Input */}
                    

                    <div className="flex items-center">
                        {/* Filter By Dropdown */}
                        <select
                            value={filterBy}
                            onChange={handleFilterByChange}
                            className="border border-gray-300 px-3 py-2 rounded-md mr-2"
                        >
                            <option value="name">Name</option>
                            <option value="hsnCode">HSN Code</option>
                            <option value="totalRate">Total Price</option>
                            {/* Add more options for other filters */}
                        </select>

                        {/* Filter Value Input */}
                        <input
                            type="text"
                            placeholder={`Filter by ${filterBy}`}
                            value={filterValue}
                            onChange={handleFilterValueChange}
                            className="border border-gray-300 px-3 py-2 rounded-md mr-2"
                        />

                        {/* Sort Order Dropdown */}
                        <select
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        >
                            <option value="asc">Price Low to High</option>
                            <option value="desc">Price High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-sky-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sr</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">HSN Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                filteredProducts && filteredProducts.length > 0 ?
                                    filteredProducts.map((product, index) => {
                                        return (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{generateProductId(index)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.hsnCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.totalRate} Rs</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link to={`/product/${product.id}`}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 whitespace-nowrap">No products found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </Layout>
        </Fragment>
    )
}

export default ProductCatalog;
