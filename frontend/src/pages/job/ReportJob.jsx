// import React, { useState } from "react";
// import { BsFillInfoCircleFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";


// const ReportJob = () => {
//   const navigate = useNavigate();
//   const [selectedProblem, setSelectedProblem] = useState("");
//   const [description, setDescription] = useState("");

//   const problems = [
//     "It's offensive or harassing",
//     "Asking for money or seems like a fake job",
//     "Incorrect company, location or job details",
//     "I think it's NOT a Job, but selling something",
//     "Other",
//   ];

//   const handleSubmit = () => {
//     if (!selectedProblem || !description) {
//       alert("Please fill in all fields before submitting.");
//       return;
//     }
//     // Handle report submission logic here
//     console.log({ selectedProblem, description });
//     alert("Your report has been submitted successfully!");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg z-20 flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-2">
//           <h2 className="text-lg font-semibold">Choose a Problem</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             X
//           </button>
//         </div>

//         {/* Problem Options */}
//         <div className="mt-4 space-y-2 flex flex-col gap-2">
//           <div>
//             <p className="font-semibold">Job Title</p>
//             <p className="text-gray-500 text-sm">Company Title</p>
//           </div>
//           {problems.map((problem, index) => (
//             <div key={index} className="flex items-center space-x-2 gap-2 ">
//               <input
//                 type="radio"
//                 id={`problem-${index}`}
//                 name="problem"
//                 value={problem}
//                 checked={selectedProblem === problem}
//                 onChange={(e) => setSelectedProblem(e.target.value)}
//                 className="text-indigo-600"
//                 style={{ transform: "scale(2.5)" }}
//               />
//               <label
//                 htmlFor={`problem-${index}`}
//                 className="text-gray-500 font-semibold text-md"
//               >
//                 {problem}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* Description Textarea */}
//         <div className="mt-6">
//           <label
//             htmlFor="description"
//             className="block text-gray-700 font-medium"
//           >
//             Describe your problem below:
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="0 / 300"
//             maxLength={300}
//             rows={4}
//             className="w-full mt-2 border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>

//         {/* Privacy Note */}
//         <div className="mt-4 bg-blue-100 p-3 rounded-lg text-gray-600 text-sm flex gap-2 ">
//           <BsFillInfoCircleFill size={35} className="text-blue-600"/>
//           <div>
//             <p className="font-semibold text-xl">Protect your privacy</p>
//             <p className="text-gray-500 text-sm">Avoid disclosing personal information like your name, phone number, or any details that may personally identify you.</p>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             Report to Great Hire
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportJob;

import React, { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ReportJob = () => {
  const jobId = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle, companyName } = location.state || {};

  console.log(location.state)

  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");

  const problems = [
    "It's offensive or harassing",
    "Asking for money or seems like a fake job",
    "Incorrect company, location or job details",
    "I think it's NOT a Job, but selling something",
    "Other",
  ];

  const handleSubmit = () => {
    if (!selectedProblem || !description) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    console.log({ selectedProblem, description });

    // Show success toast
    toast.success("Your report has been submitted successfully!", {
      duration: 2000, // Toast duration (2 seconds)
    });

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">      
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Report a Job</h2>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800">✖</button>
        </div>

        {/* Job Details */}
        <div className="mt-4">
          <p className="font-semibold text-gray-800">{jobTitle || "Job Title"}</p>
          <p className="text-gray-500 text-sm">{companyName || "Company Name"}</p>
        </div>

        {/* Problem Options */}
        <div className="mt-4 flex flex-col gap-2">
          {problems.map((problem, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="problem"
                value={problem}
                checked={selectedProblem === problem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                  selectedProblem === problem ? "bg-blue-600 border-blue-600" : "border-gray-400"
                }`}
              >
                {selectedProblem === problem && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </span>
              <span className="text-gray-600">{problem}</span>
            </label>
          ))}
        </div>

        {/* Description Textarea */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Describe your problem:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
            rows={4}
            className="w-full mt-2 border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Privacy Note */}
        <div className="mt-4 bg-blue-100 p-3 rounded-lg text-gray-600 text-sm flex gap-2">
          <BsFillInfoCircleFill size={20} className="text-blue-600"/>
          <span>Do not disclose personal details like your name or phone number.</span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Report to Great Hire
        </button>
      </div>
    </div>
  );
};

export default ReportJob;
