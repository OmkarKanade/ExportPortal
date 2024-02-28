import React, { useState, useEffect } from 'react';
import './productform.css';
import axios from 'axios';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const vendorOptions = vendors.map(vendor => ({
    value: vendor.id,
    label: vendor.name
  }));

  const fetchCategories = () => {
    axios.get('https://localhost:7051/api/VendorCategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      });
  };

  const fetchCertifications = () => {
    axios.get('https://localhost:7051/api/Certification')
      .then(response => {
        setCertifications(response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to fetch certifications');
        console.error('Error fetching certifications:', error);
      });
  };

  const fetchVendors = () => {
    axios.get('https://localhost:7051/api/Vendor')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to fetch vendor');
        console.error('Error fetching vendor:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchVendors();
    fetchCertifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    axios.post('https://localhost:7051/api/Product', formData)
      .then(response => {
        setSuccessMessage('Product created successfully');
        toast.success(`Product ${formData.name} created successfully`);
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        setErrorMessage('Failed to create product');
        toast.error('Failed to create product');
        console.error('Error creating product:', error);
      });
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className='product-f'>
      <Tabs>
        <TabList>
          <Tab>Basic Info</Tab>
          <Tab>Costs</Tab>
          <Tab>Packaging</Tab>
          <Tab>Additional Info</Tab>
        </TabList>

        <TabPanel>
          <div className="form-group">
            <label htmlFor="name">Product Name (unique)</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="scientificName">Product Scientific Name</label>
            <input type="text" id="scientificName" name="scientificName" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="categorySelect">Select a category:</label>
            <select required id="categorySelect" name="vendorCategoryId" value={formData.vendorCategoryId} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="vendorSelect1">Select Vendor 1:</label>
            <Select
              required
              id="vendorSelect1"
              name="vendorId1"
              value={vendorOptions.find(option => option.value === formData.vendorId1)}
              onChange={(selectedOption) => handleChange({ target: { name: 'vendorId1', value: selectedOption.value } })}
              options={vendorOptions}
              placeholder="Select an option"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendorSelect2">Select Vendor 2:</label>
            <Select
              id="vendorSelect2"
              name="vendorId2"
              value={vendorOptions.find(option => option.value === formData.vendorId2)}
              onChange={(selectedOption) => handleChange({ target: { name: 'vendorId2', value: selectedOption.value } })}
              options={vendorOptions}
              placeholder="Select an option"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendorSelect3">Select Vendor 3:</label>
            <Select
              id="vendorSelect3"
              name="vendorId3"
              value={vendorOptions.find(option => option.value === formData.vendorId3)}
              onChange={(selectedOption) => handleChange({ target: { name: 'vendorId3', value: selectedOption.value } })}
              options={vendorOptions}
              placeholder="Select an option"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hsnCode">HSN Code (unique)</label>
            <input type="text" id="hsnCode" name="hsnCode" onChange={handleChange} />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="form-group">
            <label htmlFor="toPuneFreight">To Pune Freight (Amount)</label>
            <input type="number" step="0.01" id="toPuneFreight" name="toPuneFreight" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="innerPackageMaterial">Inner Package Material (Amount)</label>
            <input type="number" step="0.01" id="innerPackageMaterial" name="innerPackageMaterial" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="outerPackageMaterial">Outer Package Material (Amount)</label>
            <input type="number" step="0.01" id="outerPackageMaterial" name="outerPackageMaterial" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="manualPackage">Manual Package (Amount)</label>
            <input type="number" step="0.01" id="manualPackage" name="manualPackage" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="machinePackage">Machine Package (Amount)</label>
            <input type="number" step="0.01" id="machinePackage" name="machinePackage" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="localTransport">Local Transport (Amount)</label>
            <input type="number" step="0.01" id="localTransport" name="localTransport" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="fumigation">Fumigation (Amount)</label>
            <input type="number" step="0.01" id="fumigation" name="fumigation" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="totalRate">Total Rate</label>
            <input type="number" step="0.01" id="totalRate" name="totalRate" onChange={handleChange}/>
            {/* This field will be calculated based on the sum of other fields */}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="form-group">
            <label htmlFor="grossWeight">Gross Weight (per pack in grams)</label>
            <input type="number" id="grossWeight" name="grossWeight" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pouchType">Select Pouch Type</label>
            <select required id="pouchType" name="pouchType" onChange={handleChange} value={formData.pouchType}>
              <option value="" disabled>Select an option</option>
              <option value="Type1">Type 1</option>
              <option value="Type2">Type 2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bumperisPouches">1 Bumper is ____ Pouches (number)</label>
            <input type="number" id="bumperisPouches" name="bumperisPouches" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Select Bag/Box</label><br />
            <input type="radio" id="bag" name="bagOrBox" value="Bag" onChange={handleChange}/>
            <label htmlFor="bag">Bag</label>
            <input type="radio" id="box" name="bagOrBox" value="Box" onChange={handleChange}/>
            <label htmlFor="box">Box</label>
          </div>
          <div className="form-group">
            <label htmlFor="bagOrBoxBumpers">1 Bag/Box = _____ Bumpers (number)</label>
            <input type="number" id="bagOrBoxBumpers" name="bagOrBoxBumpers" onChange={handleChange}/>
          </div>
        </TabPanel>

        <TabPanel>
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
            <input
              type="checkbox"
              id="dairyDeclarationCheckbox"
              name="dairyDeclarationRequired"
              checked={formData.dairyDeclarationRequired}
              onChange={handleChange}
            />
            <label htmlFor="dairyDeclarationCheckbox">Yes</label>
          </div>
          <div className="form-group">
            <label>Is this product for Human Consumption?</label><br />
            <input
              type="checkbox"
              id="humanConsumptionCheckbox"
              name="isForHumanConsumption"
              checked={formData.isForHumanConsumption}
              onChange={handleChange}
            />
            <label htmlFor="humanConsumptionCheckbox">Yes</label>
          </div>
          <div className="form-group">
            <label htmlFor="certificationSelect">Select a certification:</label>
            <select required id="certificationSelect" name="certificationId" value={formData.certificationId} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              {certifications.map(certification => (
                <option key={certification.id} value={certification.id}>
                  {certification.name}
                </option>
              ))}
            </select>
          </div>
        </TabPanel>

      </Tabs>
      <button className="save-button" type="submit">Save</button>
    </form>
  </Layout>
);
};

export default ProductForm;
    

