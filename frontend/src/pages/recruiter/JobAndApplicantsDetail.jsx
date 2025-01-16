import React from 'react'
import { Badge } from "@/components/ui/badge";


const JobAndApplicantsDetail = () => {
    return (
        <div>
          <div className="max-w-5xl mx-auto my-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-bold text-xl">Fullstack Developer</h1>
                <h6 className="text-gray-sm">campany name</h6>
                <h6 className="text-sm">address</h6>
              </div>
            </div>
            <h1 className="border-b-2 border-b-grey-300 font-medium py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">Backend Dveloper</span></h1>
                <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">New Delhi</span></h1>
                <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800"></span></h1>
                <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">2 yrs</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">8 LPA</span></h1>
                <h1 className="font-bold my-1">Total Application:<span className="pl-4 font-normal text-gray-800"></span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">07-12-2024</span></h1>
            </div>
          </div>
        </div>  
      );
    };

export default JobAndApplicantsDetail;