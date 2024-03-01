import React from 'react';
import { useState } from 'react';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './createCategory.css';



const AddNewCertificate = () => {
    const [certificateData, setCertificateData] = useState({
        name: '',
        description: ''
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
          <div className="form-container">
            <div className="outer-box">
              <h1>Add New Certificate</h1><br></br>
              <form onSubmit={handleCertificateSubmit} className="form">
                <div className="form-group">
                  <label>Cerificate Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={certificateData.name}
                    onChange={handleCertificateChange}
                    className="input-field"
                  />
                </div>
                
                <button type="submit" className="submit-btn sbtbtn">Add Certification</button>
              </form>
            </div>
          </div>
        </Layout>
      );
    };

export default AddNewCertificate