import React, { useState, useEffect, Fragment } from 'react';
import './ProductCatalog.css'; // Import your CSS file
import Layout from '../Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7051/api/Product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Fragment>
            <Layout>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>HSN Code</th>
                            <th>Total Price</th>
                            <th>Gross Weight (g)</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.length > 0 ?
                                products.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.hsnCode}</td>
                                            <td>{product.totalRate} Rs</td>
                                            <td>{product.grossWeight} g</td>
                                            <td>
                                                <Link to={`/product/${product.id}`}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="7">Loading...</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </Layout>
        </Fragment>
    )
}

export default ProductCatalog;
