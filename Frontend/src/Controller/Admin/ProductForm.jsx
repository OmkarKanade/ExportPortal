import React, { useState } from 'react';
import './productform.css';
import Layout from '../Layout/Layout';

const ProductForm = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Layout>
    <div className='tab-box'>
      <div className="tabs">
        <button onClick={() => handleTabChange('basicInfo')} className={activeTab === 'basicInfo' ? 'active' : ''}>Basic Info</button>
        <button onClick={() => handleTabChange('costs')} className={activeTab === 'costs' ? 'active' : ''}>Costs</button>
        <button onClick={() => handleTabChange('packaging')} className={activeTab === 'packaging' ? 'active' : ''}>Packaging</button>
        <button onClick={() => handleTabChange('additionalInfo')} className={activeTab === 'additionalInfo' ? 'active' : ''}>Additional Info</button>
      </div>
      <div className="tab-content">
        {activeTab === 'basicInfo' && <BasicInfoTab />}
        {activeTab === 'costs' && <CostsTab />}
        {activeTab === 'packaging' && <PackagingTab />}
        {activeTab === 'additionalInfo' && <AdditionalInfoTab />}
      </div>
    </div>
    </Layout>
  );
};

const BasicInfoTab = () => {
  return (
    <div className='productf'>
    <div className="form-group">
      <label htmlFor="productId">Product ID (unique)</label>
      <input type="text" id="productId" name="productId" />
    </div>
    <div className="form-group">
      <label htmlFor="productName">Product Name (unique)</label>
      <input type="text" id="productName" name="productName" />
    </div>
    <div className="form-group">
      <label htmlFor="scientificName">Product Scientific Name</label>
      <input type="text" id="scientificName" name="scientificName" />
    </div>
    <div className="form-group">
      <label htmlFor="category">Select Category</label>
      {/* Implement category dropdown */}
      <select id="category" name="category">
        <option value="">Select Category</option>
        {/* Populate categories dynamically */}
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="productVendor">Product Vendor</label>
      {/* Implement vendor autocomplete */}
      <input type="text" id="productVendor" name="productVendor" />
    </div>
    <div className="form-group">
      <label htmlFor="hsnCode">HSN Code (unique)</label>
      <input type="text" id="hsnCode" name="hsnCode" />
    </div>
    <button class="savepinfo">Save</button>
  </div>
  );
};

const CostsTab = () => {
  return (
<div className='productf'>
      <div className="form-group">
        <label htmlFor="toPuneFreight">To Pune Freight (Amount)</label>
        <input type="text" id="toPuneFreight" name="toPuneFreight" />
      </div>
      <div className="form-group">
        <label htmlFor="innerPackageMaterial">Inner Package Material (Amount)</label>
        <input type="text" id="innerPackageMaterial" name="innerPackageMaterial" />
      </div>
      <div className="form-group">
        <label htmlFor="outerPackageMaterial">Outer Package Material (Amount)</label>
        <input type="text" id="outerPackageMaterial" name="outerPackageMaterial" />
      </div>
      <div className="form-group">
        <label htmlFor="manualPackage">Manual Package (Amount)</label>
        <input type="text" id="manualPackage" name="manualPackage" />
      </div>
      <div className="form-group">
        <label htmlFor="machinePackage">Machine Package (Amount)</label>
        <input type="text" id="machinePackage" name="machinePackage" />
      </div>
      <div className="form-group">
        <label htmlFor="localTransport">Local Transport (Amount)</label>
        <input type="text" id="localTransport" name="localTransport" />
      </div>
      <div className="form-group">
        <label htmlFor="fumigation">Fumigation (Amount)</label>
        <input type="text" id="fumigation" name="fumigation" />
      </div>
      <div className="form-group">
        <label htmlFor="totalRate">Total Rate</label>
        <input type="text" id="totalRate" name="totalRate" readOnly />
        {/* This field will be calculated based on the sum of other fields */}
      </div>
      <button class="savepinfo">Save</button>
    </div>
  );
};

const PackagingTab = () => {
  return (
    <div className='productf'>
      <div className="form-group">
        <label htmlFor="grossWeight">Gross Weight (per pack in grams)</label>
        <input type="text" id="grossWeight" name="grossWeight" />
      </div>
      <div className="form-group">
        <label htmlFor="pouchType">Select Pouch Type</label>
        <select id="pouchType" name="pouchType">
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bumperPerPouch">1 Bumper is ____ Pouches (number)</label>
        <input type="number" id="bumperPerPouch" name="bumperPerPouch" />
      </div>
      <div className="form-group">
        <label>Select Bag/Box</label><br />
        <input type="radio" id="bag" name="packageType" value="bag" />
        <label htmlFor="bag">Bag</label>
        <input type="radio" id="box" name="packageType" value="box" />
        <label htmlFor="box">Box</label>
      </div>
      <div className="form-group">
        <label htmlFor="bagBoxBumpers">1 Bag/Box = _____ Bumpers (number)</label>
        <input type="number" id="bagBoxBumpers" name="bagBoxBumpers" />
      </div>
      <button class="savepinfo">Save</button>
    </div>
  );
};

const AdditionalInfoTab = () => {
  return (
    <div className='productf'>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" id="ingredients" name="ingredients"></input>
      </div>
      <div className="form-group">
        <label htmlFor="manufacturingProcess">Manufacturing Process</label>
        <input type="text" id="manufacturingProcess" name="manufacturingProcess"></input>
      </div>
      <div className="form-group">
        <label>Dairy Declaration required?</label><br />
        <input type="radio" id="dairyDeclarationYes" name="dairyDeclaration" value="yes" />
        <label htmlFor="dairyDeclarationYes">Yes</label>
        <input type="radio" id="dairyDeclarationNo" name="dairyDeclaration" value="no" />
        <label htmlFor="dairyDeclarationNo">No</label>
      </div>
      <div className="form-group">
        <label>Is this product for Human Consumption?</label><br />
        <input type="radio" id="humanConsumptionYes" name="humanConsumption" value="yes" />
        <label htmlFor="humanConsumptionYes">Yes</label>
        <input type="radio" id="humanConsumptionNo" name="humanConsumption" value="no" />
        <label htmlFor="humanConsumptionNo">No</label>
      </div>
      <button class="savepinfo">Save</button>
    </div>
  );
};

export default ProductForm;
