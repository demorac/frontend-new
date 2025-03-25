import React, { useState, useEffect } from "react";
import { Button, TextInput, Select, Textarea, NumberInput, FileInput, Checkbox } from "@mantine/core";
import CompanyProfilePreview from "./CompanyProfilePreview";

const CompanyProfileForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        industryName: "",
        brandName: "",
        ownerName: "",
        address: "",
        contact: "",
        businessType: "",
        branches: "",
        numEmployees: 0,
        productType: "",
        udhyamReg: "",
        partnership: false,
        businessStartDate: "",
        multipleBusinesses: false,
        companyImage: "",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(true);

    // Load saved data from local storage
    useEffect(() => {
        const savedData = localStorage.getItem("companyProfile");
        if (savedData) {
            setFormData(JSON.parse(savedData));
            setIsEditing(false); // Show profile preview initially
        }
    }, []);

    // Handle input changes
    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle image upload
    const handleImageUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prev) => ({ ...prev, companyImage: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    // Save data to local storage
    const handleSubmit = () => {
        localStorage.setItem("companyProfile", JSON.stringify(formData));
        setIsEditing(false);
    };

    return isEditing ? (
        <div className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Company Profile Form</h2>

            <FileInput label="Upload Company Picture" onChange={handleImageUpload} accept="image/*" />

            {imagePreview && <img src={imagePreview} alt="Company" className="w-32 h-32 mt-2 rounded-lg" />}

            <TextInput label="Company Name" value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} />
            <TextInput label="Industry Name" value={formData.industryName} onChange={(e) => handleChange("industryName", e.target.value)} />
            <TextInput label="Brand Name" value={formData.brandName} onChange={(e) => handleChange("brandName", e.target.value)} />
            <TextInput label="Owner Name" value={formData.ownerName} onChange={(e) => handleChange("ownerName", e.target.value)} />
            <Textarea label="Address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
            <TextInput label="Contact Details" value={formData.contact} onChange={(e) => handleChange("contact", e.target.value)} />
            <Select label="Business Type" value={formData.businessType} onChange={(value) => handleChange("businessType", value)} data={["Private", "Public", "LLP", "Sole Proprietorship"]} />
            <Textarea label="Branches Address" value={formData.branches} onChange={(e) => handleChange("branches", e.target.value)} />
            <NumberInput label="Number of Employees" value={formData.numEmployees} onChange={(value) => handleChange("numEmployees", value)} min={1} />
            <TextInput label="Product Type" value={formData.productType} onChange={(e) => handleChange("productType", e.target.value)} />
            <TextInput label="Udhyam Registration Number" value={formData.udhyamReg} onChange={(e) => handleChange("udhyamReg", e.target.value)} />
            <Checkbox label="Partnership Business" checked={formData.partnership} onChange={(e) => handleChange("partnership", e.target.checked)} />
            <TextInput label="Business Start Date" type="date" value={formData.businessStartDate} onChange={(e) => handleChange("businessStartDate", e.target.value)} />
            <Checkbox label="Multiple Businesses" checked={formData.multipleBusinesses} onChange={(e) => handleChange("multipleBusinesses", e.target.checked)} />

            <Button onClick={handleSubmit} className="mt-4">Save Profile</Button>
        </div>
    ) : (
        <CompanyProfilePreview formData={formData} onEdit={() => setIsEditing(true)} />
    );
};

export default CompanyProfileForm;
