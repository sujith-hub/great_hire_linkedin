import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { JobSubscription } from "../models/jobSubscription.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      companyName,
      urgentHiring,
      title,
      details,

      skills,
      qualifications,
      benefits,
      responsibilities,

      experience,
      salary,
      jobType,
      location,

      numberOfOpening,
      respondTime,
      duration,

      companyId,
    } = req.body;

    // Extract recruiter ID from the request (assuming it's added to the request during authentication)
    const userId = req.id;

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Check if the user is associated with the company
    const isUserAssociated = company.userId.some(
      (userObj) => userObj.user.toString() === userId
    );

    if (!isUserAssociated) {
      return res.status(403).json({
        message: "You are not authorized",
        success: false,
      });
    }

    // Expire plan if maxPostJobs is 0
    if (company.maxPostJobs === 0) {
      return res.status(400).json({
        success: false,
        message: "Company need job plans",
      });
    }

    // Validate required fields
    if (
      !title ||
      !details ||
      !experience ||
      !salary ||
      !jobType ||
      !location ||
      !numberOfOpening ||
      !respondTime ||
      !duration ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Split skills, qualifications, benefits, responsibilities by new line or comma
    const splitSkills = skills.split(",").map((skill) => skill.trim());
    const splitQualifications = qualifications
      .split("\n")
      .map((qualification) => qualification.trim());
    const splitBenefits = benefits.split("\n").map((benefit) => benefit.trim());
    const splitResponsibilities = responsibilities
      .split("\n")
      .map((responsibility) => responsibility.trim());

    // Create new job instance
    const newJob = new Job({
      jobDetails: {
        companyName,
        urgentHiring,
        title,
        details,

        skills: splitSkills,
        benefits: splitBenefits,
        qualifications: splitQualifications,
        responsibilities: splitResponsibilities,

        salary,
        experience,
        jobType,
        location,

        numberOfOpening,
        respondTime,
        duration,
      },
      created_by: userId,
      company: companyId,
    });

    // Save the job to the database
    const savedJob = await newJob.save();
    if (company.maxPostJobs !== null) {
      company.maxPostJobs = company.maxPostJobs - 1;
      await company.save();
    }

    if (company.maxPostJobs === 0) {
      const activeSubscription = await JobSubscription.findOne({
        company: companyId,
        status: "Active",
      });

      if (activeSubscription) {
        // Check if the current plan is not the Free plan
        if (activeSubscription.planName !== "Free") {
          activeSubscription.status = "Expired";
          await activeSubscription.save();
        }
      }
    }

    // Respond with success and the saved job details
    return res.status(201).json({
      success: true,
      message: "Job posted successfully.",
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//get all jobs.....
export const getAllJobs = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");

  try {
    const userId = req.id; // Assuming user ID is passed in the request for checking applications

    // Using cursor to stream the data in LIFO order (newest to oldest)
    const cursor = Job.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "application",
        match: { applicant: userId }, // Match applications for the specific user
        select: "status", // Only select the 'status' field or other fields you need
      })
      .cursor();

    res.write("["); // Start the JSON array

    let isFirst = true;
    cursor.on("data", (doc) => {
      if (!isFirst) {
        res.write(",");
      } else {
        isFirst = false;
      }

      // Check if the user has applied to this job
      const isApplied = doc.application.length > 0; // If the array has items, the user has applied

      // Add the application status to the job details
      const jobWithApplicationStatus = {
        ...doc.toObject(),
        isApplied, // Add 'isApplied' field to indicate if the user applied for the job
      };

      res.write(JSON.stringify(jobWithApplicationStatus)); // Write the job with application status
    });

    cursor.on("end", () => {
      res.write("]"); // End the JSON array
      res.end();
    });

    cursor.on("error", (error) => {
      console.error("Error streaming jobs:", error);
      res.status(500).json({ message: "Internal server error" });
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get job by recruiter id...
export const getJobByRecruiterId = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated jobs
    const jobs = await Job.find({ created_by: recruiterId })
      .select(
        "jobDetails.companyName jobDetails.title jobDetails.location jobDetails.jobType jobDetails.isActive"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total job count for the recruiter
    const totalJobs = await Job.countDocuments({ created_by: recruiterId });

    // Total pages
    const totalPages = Math.ceil(totalJobs / limit);

    // Return paginated response
    return res.status(200).json({
      jobs,
      totalJobs,
      totalPages,
      currentPage: page,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs by recruiter ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//get job by id...
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// help to fecth all job of a particular company
export const getJobByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const userId = req.id;

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Check if the user is associated with the company
    const isUserAssociated = company.userId.some(
      (userObj) => userObj.user.toString() === userId
    );
    if (!isUserAssociated) {
      return res.status(403).json({
        message: "You are not authorized.",
        success: false,
      });
    }

    // Fetch jobs by company ID
    const jobs = await Job.find({ company: companyId })
      .select("jobDetails.title jobDetails.isActive createdAt")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this company" });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Delete the job
    await Job.findByIdAndDelete(jobId);

    // Delete all applications related to this job
    await Application.deleteMany({ job: jobId });

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Job and related applications deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// bookmark the job
export const bookmarkJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; // Assuming req.id is the user ID

    // Find the job by ID and update the saveJob field
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { saveJob: userId } }, // Using $addToSet to avoid duplicates
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job bookmarked successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// remove bookmark the job
export const unBookmarkJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; // Assuming req.id is the user ID

    // Find the job by ID and update the saveJob field
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { saveJob: userId } }, // Using $addToSet to avoid duplicates
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job unbookmarked successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// hide the job
export const hideJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; // Assuming req.id is the user ID

    // Find the job by ID and update the hiddenJob field
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { hiddenJob: userId } }, // Using $addToSet to avoid duplicates
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job hidden successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const toggleActive = async (req, res) => {
  try {
    const { jobId, isActive, companyId } = req.body;
    const userId = req.id;

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Check if the user is associated with the company
    const isUserAssociated = company.userId.some(
      (userObj) => userObj.user.toString() === userId
    );
    if (!isUserAssociated) {
      return res.status(403).json({
        message: "You are not authorized",
        success: false,
      });
    }

    // Find the job by its ID and update the isActive field
    const job = await Job.findByIdAndUpdate(
      jobId,
      { "jobDetails.isActive": isActive },
      { new: true } // Return the updated document
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Error toggling job status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateJob = async (req, res) => {};

export const getJobsStatistics = async (req, res) => {
  try {
    const companyId = req.params.id; // Accessing companyId from the URL params
    const userId = req.id; // Assuming the user ID is stored in req.id after authentication

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Check if the user is associated with the company
    const isUserAssociated = company.userId.some(
      (userObj) => userObj.user.toString() === userId
    );
    if (!isUserAssociated) {
      return res.status(403).json({
        message: "You are not authorized",
        success: false,
      });
    }

    // Get the total number of jobs posted by the company
    const totalJobs = await Job.countDocuments({ company: companyId });

    // Get the number of active jobs posted by the company
    const activeJobs = await Job.countDocuments({
      company: companyId,
      "jobDetails.isActive": true, // Accessing isActive inside jobDetails
    });

    // Get the number of inactive jobs posted by the company
    const inactiveJobs = await Job.countDocuments({
      company: companyId,
      "jobDetails.isActive": false, // Accessing isActive inside jobDetails
    });

    // Get the total number of applicants for the company
    const totalApplicants = await Application.countDocuments({
      company: companyId,
    });

    // Get the number of selected candidates for the company
    const selectedCandidates = await Application.countDocuments({
      company: companyId,
      status: "selected",
    });

    // Format the response
    const statistics = {
      totalJobs,
      activeJobs,
      inactiveJobs,
      totalApplicants,
      selectedCandidates,
    };

    return res.status(200).json({
      message: "Statistics fetched successfully",
      success: true,
      statistics,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: err.message,
    });
  }
};
