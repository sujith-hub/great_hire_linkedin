import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Gurugram", "Kolkata", "Noida", "Lucknow", "Jaipur", "Bhopal", "Chennai", "Ahemdabad"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Website Designer", "Java Developer", "Data Science", "Graphic Designer"]
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
        <div className='w-full bg-white p-3 rounded-md'>
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