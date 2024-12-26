import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujrat", "Haryana", "Himachal Pradesh","Jharkhand", "Jammu and Kashmir", "Karnataka", "Kerala", "Ladakh", " Maharashtra",
             "Madhya Pradesh", " Manipur", "Meghalya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bangal", 
             "Arizona", "California", "Florida", "Illinois", "New York", "North Carolina", "Ohio", "Pennsylvania", "Texas", 
             "Remote"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Website Designer", "Java Developer", "Data Science", "Graphic Designer", "Data Entry Operator", "Dotnet Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-20k", " 21k-40k", "41-1lakh", "1lakh-5lakh", "5lakh-10lakh","12lakh-20lakh"]
    },
]

const FilterCard = () => {
    // const [selectedValue, setSelectedValue] = useState('');
    // const dispatch = useDispatch();
    // const changeHandler = (value) => {
    //     setSelectedValue(value);
    // }
    // useEffect(()=>{
    //     dispatch(setSearchedQuery(selectedValue));
    // },[selectedValue]);
    return (
        <div className='w-52 bg-white border-2 border-r-2 p-3 shadow-lg rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {/* <RadioGroup value={selectedValue} onValueChange={changeHandler}> */}
            <RadioGroup>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard