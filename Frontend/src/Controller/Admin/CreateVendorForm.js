import React, { useState } from 'react';


const CreateVendorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    contactNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
    vendorCategory: '',
    password: '123456', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend API
    console.log(formData);
    // Reset form fields if needed
    setFormData({
      name: '',
      organization: '',
      contactNumber: '',
      email: '',
      state: '',
      city: '',
      address: '',
      zipCode: '',
      vendorCategory: '',
      password: '123456',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='inputfield'>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Organization"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="text"
          name="vendorCategory"
          value={formData.vendorCategory}
          onChange={handleChange}
          placeholder="Vendor Category"
          required
        />
      </div>
      <div className='inputfield'>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <div>
        <button type="submit">Sumbit</button>
      </div>
    </form>
  );
};

export default CreateVendorForm;
