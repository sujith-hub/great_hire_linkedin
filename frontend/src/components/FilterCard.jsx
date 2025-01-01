import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const fitlerData = [
    {
        fitlerType: "Location",
        array: [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujrat", "Haryana", 
            "Himachal Pradesh", "Jharkhand", "Jammu and Kashmir", "Karnataka", "Kerala", "Ladakh", "Maharashtra",
            "Madhya Pradesh", "Manipur", "Meghalya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
            "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bangal", 
            "Arizona", "California", "Florida", "Illinois", "New York", "North Carolina", "Ohio", "Pennsylvania", "Texas", 
            "Remote"
        ]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Website Designer", "Java Developer", "Data Science", "Graphic Designer", "Data Entry Operator", "Dotnet Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-20k", "21k-40k", "41-1lakh", "1lakh-5lakh", "5lakh-10lakh", "12lakh-20lakh"]
    },
];

const FilterCard = () => {
    const [visibleFilters, setVisibleFilters] = useState({
        Location: false,
        Industry: false,
        Salary: false,
    });

    const toggleFilterVisibility = (filterType) => {
        setVisibleFilters((prev) => ({
            ...prev,
            [filterType]: !prev[filterType],
        }));
    };

    return (
        <div className="w-full sticky top-0 rounded-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {fitlerData.map((data, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center">
                            <h1 className="font-light text-lg">{data.fitlerType}</h1>
                            <button
                                className={`text-lg font-bold px-2 py-1 rounded ${
                                    visibleFilters[data.fitlerType] ? "bg-red-700 text-white" : "bg-blue-700 text-white"
                                }`}
                                onClick={() => toggleFilterVisibility(data.fitlerType)}
                            >
                                {visibleFilters[data.fitlerType] ? "−" : "+"}
                            </button>
                        </div>
                        {visibleFilters[data.fitlerType] && (
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div key={idx} className="flex items-center space-x-2 my-2">
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;

