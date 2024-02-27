import React, { useState } from 'react';
import './productform.css';
import Layout from '../Layout/Layout';
import axios from 'axios';


const ProductForm = () => {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // https://localhost:7051/api/Product
  
  const handleSubmit = async (event) => {
    console.log("Form Data:", formData); // Log form data 
    event.preventDefault();

      axios.post('https://localhost:7051/api/Product', formData)
      .then(response => {
        setSuccessMessage('Customer created successfully');
        // Show pop-up message
        alert(`Product ${formData.name} is created`);
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to create product');
        console.error('Error creating product:', error);
      });
     

      
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className='product-form'>
        <div className="form-group">
          <label htmlFor="name">Product Name (unique)</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="scientificName">Product Scientific Name</label>
          <input type="text" id="scientificName" name="scientificName" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="vendorCategoryId">Select Category</label>
          <input type='text' id='vendorCategoryId' name='vendorCategoryId' onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="productVendor1">Product Vendor 1</label>
          <input type="text" id="productVendor1" name="productVendor1" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="productVendor2">Product Vendor 2</label>
          <input type="text" id="productVendor2" name="productVendor2" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="productVendor3">Product Vendor 3</label>
          <input type="text" id="productVendor3" name="productVendor3" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hsnCode">HSN Code (unique)</label>
          <input type="text" id="hsnCode" name="hsnCode" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="toPuneFreight">To Pune Freight (Amount)</label>
          <input type="text" id="toPuneFreight" name="toPuneFreight" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="innerPackageMaterial">Inner Package Material (Amount)</label>
          <input type="text" id="innerPackageMaterial" name="innerPackageMaterial"onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="outerPackageMaterial">Outer Package Material (Amount)</label>
          <input type="text" id="outerPackageMaterial" name="outerPackageMaterial" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="manualPackage">Manual Package (Amount)</label>
          <input type="text" id="manualPackage" name="manualPackage" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="machinePackage">Machine Package (Amount)</label>
          <input type="text" id="machinePackage" name="machinePackage" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="localTransport">Local Transport (Amount)</label>
          <input type="text" id="localTransport" name="localTransport" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="fumigation">Fumigation (Amount)</label>
          <input type="text" id="fumigation" name="fumigation" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="totalRate">Total Rate</label>
          <input type="text" id="totalRate" name="totalRate" onChange={handleChange}/>
          {/* This field will be calculated based on the sum of other fields */}
        </div>
        <div className="form-group">
          <label htmlFor="grossWeight">Gross Weight (per pack in grams)</label>
          <input type="text" id="grossWeight" name="grossWeight" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pouchType">Select Pouch Type</label>
          <select id="pouchType" name="pouchType" onChange={handleChange}>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bumperisPouches">1 Bumper is ____ Pouches (number)</label>
          <input type="number" id="bumperisPouches" name="bumperisPouches" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Select Bag/Box</label><br />
          <input type="radio" id="bag" name="packageType" value="bag" onChange={handleChange}/>
          <label htmlFor="bag">Bag</label>
          <input type="radio" id="box" name="packageType" value="box" onChange={handleChange}/>
          <label htmlFor="box">Box</label>
        </div>
        <div className="form-group">
          <label htmlFor="bagOrBoxBumpers">1 Bag/Box = _____ Bumpers (number)</label>
          <input type="number" id="bagOrBoxBumpers" name="bagOrBoxBumpers" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <input type="text" id="ingredients" name="ingredients" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="manufacturingProcess">Manufacturing Process</label>
          <input type="text" id="manufacturingProcess" name="manufacturingProcess" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Dairy Declaration required?</label><br />
          <input type="radio" id="dairyDeclarationYes" name="dairyDeclaration" value="yes" onChange={handleChange}/>
          <label htmlFor="dairyDeclarationYes">Yes</label>
          <input type="radio" id="dairyDeclarationNo" name="dairyDeclaration" value="no" onChange={handleChange}/>
          <label htmlFor="dairyDeclarationNo">No</label>
        </div>
        <div className="form-group">
          <label>Is this product for Human Consumption?</label><br />
          <input type="radio" id="humanConsumptionYes" name="humanConsumption" value="yes" onChange={handleChange}/>
          <label htmlFor="humanConsumptionYes">Yes</label>
          <input type="radio" id="humanConsumptionNo" name="humanConsumption" value="no" onChange={handleChange}/>
          <label htmlFor="humanConsumptionNo">No</label>
        </div>
        <div className='from-group'>
          <label htmlFor='certification'>Certifications</label>
          <input type='text' id='certificationId' name="certificationId" onChange={handleChange}/>
        </div>




        <button className="save-button" type="submit">Save</button>
      </form>
    </Layout>
  );
};

export default ProductForm;