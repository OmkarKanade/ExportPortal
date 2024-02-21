import React, { useState } from 'react';


const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    organization: '',
    contactNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
    password: 'passwor@123',
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
      username: '',
      name: '',
      organization: '',
      contactNumber: '',
      email: '',
      state: '',
      city: '',
      address: '',
      zipCode: '',
      password: 'passwor@1234',
    });
  };

  return (
  
    <form className='form-container' onSubmit={handleSubmit}>
      <div className='inputfield'>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
      </div>
      <div className='inputfield'>
        <label>Name</label>
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
        <label>Organization</label>
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
        <label>Contact Number</label>
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
        <label>Email</label>
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
        <label>State</label>
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
        <label>City</label>
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
        <label>Address</label>
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
        <label>Zip Code</label>
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
        <label>Password</label>
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
        <button type="submit">Submit</button>
      </div>
    </form>
   
  );
};

export default CreateCustomerForm;
