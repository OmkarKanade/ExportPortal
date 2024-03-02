import React, { useState, useEffect, Fragment } from 'react';
import './ProductCatalog.css'; // Import your CSS file
import Layout from '../Layout/Layout';

const ProductCatalog = () => {
    const productDetails = [
        {
            id: 1,
            Name: 'Bay Of Plenty',
            HSN: 'BOP',
            weight: '/image2.png' // Assuming image2.png is in the public directory
        },
        {
            id: 2,
            Name: 'Northland',
            HSN: 'NTL',
            weight: '/image1.png' // Assuming image1.png is in the public directory
        },
    ];
    
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(productDetails);
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
                            <th>Category</th>
                            <th>HSN code</th>
                            <th>Net Weight (In Grams)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Category}</td> {/* Add Category here */}
                                            <td>{item.HSN}</td>
                                            <td><img src={item.weight} alt={`Region ${item.Name}`} /></td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="6">Loading...</td> {/* Updated colspan to 6 */}
                                </tr>
                        }
                    </tbody>
                </table>
            </Layout>
        </Fragment>
    )
}

export default ProductCatalog;
