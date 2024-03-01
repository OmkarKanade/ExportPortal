import React, { useState, useEffect } from 'react';
import './productform.css';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    dairyDeclarationRequired: false,
    isForHumanConsumption: false
  });
  const [categories, setCategories] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

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
        console.error('Error fetching categories:', error);
      });
  };

  const fetchCertifications = () => {
    axios.get('https://localhost:7051/api/Certification')
      .then(response => {
        setCertifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching certifications:', error);
      });
  };

  const fetchVendors = () => {
    axios.get('https://localhost:7051/api/Vendor')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
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
    setFormData(prevState => ({
      ...prevState,
      [name]: inputValue
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    
    axios.post('https://localhost:7051/api/Product', formData)
      .then(response => {
        toast.success(`Product ${formData.name} created successfully`);
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        toast.error('Failed to create product');
        console.error('Error creating product:', error);
      });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderNextButton = () => {
    if (currentStep < 4) {
      return <button className="next-button" onClick={nextStep}>Next</button>;
    }
    return null;
  };

  
  return (
    <Layout>
      <div className='outer-boxx'>
        <h1>Create New Product</h1>
      {/* /////////////////Tab 1 Starts: Basic Info//////////////////////// */}
      <form onSubmit={handleSubmit} className='product-form'>
        {currentStep === 1 && (
          <>
            {/* Tab 1: Basic Info */}
            <div className="form-group">
              <label htmlFor="name">Product Name (unique)</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="scientificName">Product Scientific Name</label>
              <input type="text" id="scientificName" name="scientificName" value={formData.scientificName} onChange={handleChange} />
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
              <input type="text" id="hsnCode" name="hsnCode" value={formData.hsnCode} onChange={handleChange} />
            </div>
            {renderNextButton()}
          </>
        )}


        {/* /////////////////Tab 1 Ends//////////////////////// */}


        {/* ////////////////////Tab 2 Starts: Costs/////////////////// */}
      {currentStep === 2 && (
          <>
            {/* Tab 2: Costs */}
            <div className="form-group">
              <label htmlFor="toPuneFreight">To Pune Freight (Amount)</label>
              <input type="number" step="0.01" id="toPuneFreight" name="toPuneFreight" value={formData.toPuneFreight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="innerPackageMaterial">Inner Package Material (Amount)</label>
              <input type="number" step="0.01" id="innerPackageMaterial" name="innerPackageMaterial" value={formData.innerPackageMaterial} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="outerPackageMaterial">Outer Package Material (Amount)</label>
              <input type="number" step="0.01" id="outerPackageMaterial" name="outerPackageMaterial" value={formData.outerPackageMaterial} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="manualPackage">Manual Package (Amount)</label>
              <input type="number" step="0.01" id="manualPackage" name="manualPackage" value={formData.manualPackage} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="machinePackage">Machine Package (Amount)</label>
              <input type="number" step="0.01" id="machinePackage" name="machinePackage" value={formData.machinePackage} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="localTransport">Local Transport (Amount)</label>
              <input type="number" step="0.01" id="localTransport" name="localTransport" value={formData.localTransport} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fumigation">Fumigation (Amount)</label>
              <input type="number" step="0.01" id="fumigation" name="fumigation" value={formData.fumigation} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="totalRate">Total Rate</label>
              <input type="number" step="0.01" id="totalRate" name="totalRate" value={formData.totalRate} onChange={handleChange} />
              {/* This field will be calculated based on the sum of other fields */}
            </div>
            {renderNextButton()}
          </>
        )}
        {/* //////////////////////////Tab 2 starts///////////////////// */}



        {/* //////////////////Tab 3 Starts: Packaging /////////////////// */}
        {currentStep === 3 && (
          <>
            {/* Tab 3: Packaging */}
            <div className="form-group">
              <label htmlFor="grossWeight">Gross Weight (per pack in grams)</label>
              <input type="number" id="grossWeight" name="grossWeight" value={formData.grossWeight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pouchType">Select Pouch Type</label>
              <select required id="pouchType" name="pouchType" value={formData.pouchType} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bumperisPouches">1 Bumper is ____ Pouches (number)</label>
              <input type="number" id="bumperisPouches" name="bumperisPouches" value={formData.bumperisPouches} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Select Bag/Box</label><br />
              <input type="radio" id="bag" name="bagOrBox" value="Bag" onChange={handleChange} />
              <label htmlFor="bag">Bag</label>
              <input type="radio" id="box" name="bagOrBox" value="Box" onChange={handleChange} />
              <label htmlFor="box">Box</label>
            </div>
            <div className="form-group">
              <label htmlFor="bagOrBoxBumpers">1 Bag/Box = _____ Bumpers (number)</label>
              <input type="number" id="bagOrBoxBumpers" name="bagOrBoxBumpers" value={formData.bagOrBoxBumpers} onChange={handleChange} />
            </div>
            {renderNextButton()}
          </>
        )}
        {/* ////////////////////////////Tab 3 Ends//////////////////////////// */}



            {/* ///////////////////////Tab 4 Starts: Additional Info/////////////////////// */}
            {currentStep === 4 && (
          <>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <input type="text" id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="manufacturingProcess">Manufacturing Process</label>
              <input type="text" id="manufacturingProcess" name="manufacturingProcess" value={formData.manufacturingProcess} onChange={handleChange} />
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
            <option value="" disabled selected>Select an option</option>
              {certifications.map(certification => (
                <option key={certification.id} value={certification.id}>
                  {certification.name}
                </option>
              ))}
            </select>
               </div>

            <button className="save-button" type="submit">Save</button>
          </>
        )}

        {currentStep > 1 && (
          <button className="prev-button" onClick={prevStep}>Previous</button>
        )}
      </form>
      </div>
      </Layout>
  );
};

export default ProductForm;