import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';

const AddNewCertificate = () => {
    const [certificateData, setCertificateData] = useState({
        name: '',
    });

    const handleCertificateChange = (e) => {
        const { name, value } = e.target;
        setCertificateData({
            ...certificateData,
            [name]: value,
        });
    };

    const handleCertificateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7051/api/Certification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificateData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('New certificate created:', data);

            // Show toast notification for success
            toast.success('New certificate created!');

            // Clear the form data after successful submission
            setCertificateData({
                name: '',
            });

        } catch (error) {
            console.error('Error adding certificate:', error);

            // Show toast notification for error
            toast.error('Failed to add new certificate');
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 ml-20 text-gray-700">Add New Certificate</h1>
                    <form onSubmit={handleCertificateSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-sky-700 shadow-sky-700">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Certificate Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={certificateData.name}
                                onChange={handleCertificateChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Certification</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AddNewCertificate;
