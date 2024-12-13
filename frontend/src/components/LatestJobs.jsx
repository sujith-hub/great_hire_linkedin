import React from 'react';
import LatestJobCards from './LatestJobCards';
import JobsForYou from './JobsForYou.jsx';

const LatestJobs = () => {
    // If you're using Redux for job data, you can uncomment the line below to fetch jobs.
    // const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="ml-6 text-4xl font-bold">
                <span className="text-[#384ac2]">Latest & Top</span> Job Openings
            </h1>
            <LatestJobCards />
            <JobsForYou />
        </div>
    );
}

export default LatestJobs;
