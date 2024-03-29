import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        dairyDeclarationRequired: false,
        isForHumanConsumption: false,
        toPuneFreight: 0,
        innerPackageMaterial: 0,
        outerPackageMaterial: 0,
        manualPackage: 0,
        machinePackage: 0,
        localTransport: 0,
        fumigation: 0,
        totalRate: 0,
        //file: null // New property for file upload
    });

    // Separate state for file data
    const [fileData, setFileData] = useState(null);

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

    useEffect(() => {
        calculateTotalRate();
    }, [formData.toPuneFreight, formData.innerPackageMaterial, formData.outerPackageMaterial, formData.manualPackage, formData.machinePackage, formData.localTransport, formData.fumigation]);

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     const inputValue = type === 'checkbox' ? checked : value;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: inputValue
    //     }));
    // };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileData(file);
        // Save the file to local storage
        localStorage.setItem('productImage', JSON.stringify(file));
    };
    

    useEffect(() => {
        // Load file data from local storage
        const storedFile = localStorage.getItem('productImage');
        if (storedFile) {
            setFileData(JSON.parse(storedFile));
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: inputValue
        }));
    };

    const calculateTotalRate = () => {
        const { toPuneFreight, innerPackageMaterial, outerPackageMaterial, manualPackage, machinePackage, localTransport, fumigation } = formData;
        const totalRate = parseFloat(toPuneFreight) + parseFloat(innerPackageMaterial) + parseFloat(outerPackageMaterial) + parseFloat(manualPackage) + parseFloat(machinePackage) + parseFloat(localTransport) + parseFloat(fumigation);
        setFormData(prevState => ({
            ...prevState,
            totalRate: totalRate.toFixed(2)
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('scientificName', formData.scientificName);
        formDataToSend.append('vendorCategoryId', formData.vendorCategoryId);
        
        // Check if a vendor is selected, if not, set the value to null
        formDataToSend.append('vendorId1', formData.vendorId1 ? formData.vendorId1 : null);
        formDataToSend.append('vendorId2', formData.vendorId2 ? formData.vendorId2 : null);
        formDataToSend.append('vendorId3', formData.vendorId3 ? formData.vendorId3 : null);
        
        formDataToSend.append('hsnCode', formData.hsnCode);
        formDataToSend.append('toPuneFreight', formData.toPuneFreight);
        formDataToSend.append('innerPackageMaterial', formData.innerPackageMaterial);
        formDataToSend.append('outerPackageMaterial', formData.outerPackageMaterial);
        formDataToSend.append('manualPackage', formData.manualPackage);
        formDataToSend.append('machinePackage', formData.machinePackage);
        formDataToSend.append('localTransport', formData.localTransport);
        formDataToSend.append('fumigation', formData.fumigation);
        formDataToSend.append('totalRate', formData.totalRate);
        formDataToSend.append('grossWeight', formData.grossWeight);
        formDataToSend.append('pouchType', formData.pouchType);
        formDataToSend.append('bumperisPouches', formData.bumperisPouches);
        formDataToSend.append('bagOrBox', formData.bagOrBox);
        formDataToSend.append('bagOrBoxBumpers', formData.bagOrBoxBumpers);
        formDataToSend.append('ingredients', formData.ingredients);
        formDataToSend.append('manufacturingProcess', formData.manufacturingProcess);
        formDataToSend.append('dairyDeclarationRequired', formData.dairyDeclarationRequired);
        formDataToSend.append('isForHumanConsumption', formData.isForHumanConsumption);
        formDataToSend.append('certificationId', formData.certificationId);
    
        formDataToSend.append('file', fileData);
    
        console.log(formData)
    
        axios.post('https://localhost:7051/api/Product', formDataToSend)
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
            return <button className="next-button ml-40 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={nextStep}>Next</button>;
        }
        return null;
    };

    const renderPreviousButton = () => {
        if (currentStep > 1) {
            return <button className="prev-button ml-5 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={prevStep}>Previous</button>;
        }
        return null;
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 ml-20 text-gray-700">Create New Product</h1>
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-sky-700 shadow-sky-700 product-form">
                        {currentStep === 1 && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name (unique)</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="scientificName" className="block text-gray-700 text-sm font-bold mb-2">Product Scientific Name</label>
                                    <input type="text" id="scientificName" name="scientificName" value={formData.scientificName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="categorySelect" className="block text-gray-700 text-sm font-bold mb-2">Select a category:</label>
                                    <select required id="categorySelect" name="vendorCategoryId" value={formData.vendorCategoryId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">Select an option</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vendorSelect1" className="block text-gray-700 text-sm font-bold mb-2">Select Vendor 1:</label>
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
                                <div className="mb-4">
                                    <label htmlFor="vendorSelect2" className="block text-gray-700 text-sm font-bold mb-2">Select Vendor 2:</label>
                                    <Select
                                        id="vendorSelect2"
                                        name="vendorId2"
                                        value={vendorOptions.find(option => option.value === formData.vendorId2)}
                                        onChange={(selectedOption) => handleChange({ target: { name: 'vendorId2', value: selectedOption.value } })}
                                        options={vendorOptions}
                                        placeholder="Select an option"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vendorSelect3" className="block text-gray-700 text-sm font-bold mb-2">Select Vendor 3:</label>
                                    <Select
                                        id="vendorSelect3"
                                        name="vendorId3"
                                        value={vendorOptions.find(option => option.value === formData.vendorId3)}
                                        onChange={(selectedOption) => handleChange({ target: { name: 'vendorId3', value: selectedOption.value } })}
                                        options={vendorOptions}
                                        placeholder="Select an option"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="hsnCode" className="block text-gray-700 text-sm font-bold mb-2">HSN Code (unique)</label>
                                    <input type="text" id="hsnCode" name="hsnCode" value={formData.hsnCode} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                {/* New file upload field */}
                                <div className="mb-4">
                                    <label htmlFor="fileUpload" className="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
                                    <input type="file" id="fileUpload" name="file" onChange={handleFileUpload} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                {renderNextButton()}
                            </>
                        )}


                        {currentStep === 2 && (
                            <>
                                {/* Previous steps */}
                                <div className="mb-4">
                                    <label htmlFor="toPuneFreight" className="block text-gray-700 text-sm font-bold mb-2">To Pune Freight (Amount)</label>
                                    <input type="number" step="0.01" id="toPuneFreight" name="toPuneFreight" value={formData.toPuneFreight} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="innerPackageMaterial" className="block text-gray-700 text-sm font-bold mb-2">Inner Package Material (Amount)</label>
                                    <input type="number" step="0.01" id="innerPackageMaterial" name="innerPackageMaterial" value={formData.innerPackageMaterial} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="outerPackageMaterial" className="block text-gray-700 text-sm font-bold mb-2">Outer Package Material (Amount)</label>
                                    <input type="number" step="0.01" id="outerPackageMaterial" name="outerPackageMaterial" value={formData.outerPackageMaterial} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="manualPackage" className="block text-gray-700 text-sm font-bold mb-2">Manual Package (Amount)</label>
                                    <input type="number" step="0.01" id="manualPackage" name="manualPackage" value={formData.manualPackage} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="machinePackage" className="block text-gray-700 text-sm font-bold mb-2">Machine Package (Amount)</label>
                                    <input type="number" step="0.01" id="machinePackage" name="machinePackage" value={formData.machinePackage} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="localTransport" className="block text-gray-700 text-sm font-bold mb-2">Local Transport (Amount)</label>
                                    <input type="number" step="0.01" id="localTransport" name="localTransport" value={formData.localTransport} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="fumigation" className="block text-gray-700 text-sm font-bold mb-2">Fumigation(Amount)</label>
                                    <input type="number" step="0.01" id="fumigation" name="fumigation" value={formData.fumigation} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="totalRate" className="block text-gray-700 text-sm font-bold mb-2">Total Rate(Amount)</label>
                                    <input type="number" step="0.01" id="totalRate" name="totalRate" value={formData.totalRate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly />
                                </div>
                                {renderPreviousButton()}
                                {renderNextButton()}
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="grossWeight" className="block text-gray-700 text-sm font-bold mb-2">Gross Weight (per pack in grams)</label>
                                    <input type="number" id="grossWeight" name="grossWeight" value={formData.grossWeight} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="pouchType" className="block text-gray-700 text-sm font-bold mb-2">Select Pouch Type</label>
                                    <select required id="pouchType" name="pouchType" value={formData.pouchType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="" disabled>Select an option</option>
                                        <option value="Type1">Type 1</option>
                                        <option value="Type2">Type 2</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="bumperisPouches" className="block text-gray-700 text-sm font-bold mb-2">1 Bumper is ____ Pouches (number)</label>
                                    <input type="number" id="bumperisPouches" name="bumperisPouches" value={formData.bumperisPouches} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Bag/Box</label><br />
                                    <input type="radio" id="bag" name="bagOrBox" value="Bag" onChange={handleChange} className="mr-2 leading-tight" />
                                    <label htmlFor="bag" className="text-sm">Bag</label>
                                    <input type="radio" id="box" name="bagOrBox" value="Box" onChange={handleChange} className="mr-2 ml-4 leading-tight" />
                                    <label htmlFor="box" className="text-sm">Box</label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="bagOrBoxBumpers" className="block text-gray-700 text-sm font-bold mb-2">1 Bag/Box = _____ Bumpers (number)</label>
                                    <input type="number" id="bagOrBoxBumpers" name="bagOrBoxBumpers" value={formData.bagOrBoxBumpers} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                {renderPreviousButton()}
                                {renderNextButton()}
                            </>
                        )}

                        {currentStep === 4 && (
                            <>

                                <div className="mb-4">
                                    <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
                                    <input type="text" id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="manufacturingProcess" className="block text-gray-700 text-sm font-bold mb-2">Manufacturing Process</label>
                                    <input type="text" id="manufacturingProcess" name="manufacturingProcess" value={formData.manufacturingProcess} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Dairy Declaration required?</label>
                                    <input
                                        type="checkbox"
                                        id="dairyDeclarationCheckbox"
                                        name="dairyDeclarationRequired"
                                        checked={formData.dairyDeclarationRequired}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor="dairyDeclarationCheckbox" className="text-sm">Yes</label>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Is this product for Human Consumption?</label>
                                    <input
                                        type="checkbox"
                                        id="humanConsumptionCheckbox"
                                        name="isForHumanConsumption"
                                        checked={formData.isForHumanConsumption}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor="humanConsumptionCheckbox" className="text-sm">Yes</label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="certificationSelect" className="block text-gray-700 text-sm font-bold mb-2">Select a certification:</label>
                                    <select required id="certificationSelect" name="certificationId" value={formData.certificationId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="" disabled selected>Select an option</option>
                                        {certifications.map(certification => (
                                            <option key={certification.id} value={certification.id}>
                                                {certification.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    {renderPreviousButton()}
                                    <button className="save-button ml-40 mt-10 bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Save</button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProductForm;
