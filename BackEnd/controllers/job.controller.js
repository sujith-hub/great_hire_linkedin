import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const postJob = async (req, res) => {
  try {
    // Extract job details from the request body

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
      jobValidityInDays,
      companyId,
    } = req.body;

    // Extract recruiter ID from the request (assuming it's added to the request during authentication)
    const recruiterId = req.id;

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
      !jobValidityInDays ||
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
        jobValidityInDays,
      },
      created_by: recruiterId,
      company: companyId,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

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
  try {
    // Current date for comparison
    const currentDate = new Date();

    // Retrieve all jobs from the database
    const jobs = await Job.find({})
      .populate({
        path: "company",
        select: "name address",
      })
      .populate({
        path: "created_by",
        select: "fullname emailId.email",
      });

    // Filter jobs to exclude expired ones
    const validJobs = jobs.filter((job) => {
      const createdAt = new Date(job.createdAt);
      const jobValidity = parseInt(job.jobDetails.jobValidityInDays, 10);

      // Calculate the expiration date
      const expirationDate = new Date(createdAt);
      expirationDate.setDate(expirationDate.getDate() + jobValidity);

      // Return true if the job is not expired
      return expirationDate >= currentDate;
    });

    // Respond with the list of valid jobs
    return res.status(200).json({
      jobs: validJobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
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
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

// particular recuriter job
export const getJobForRecruiter = async (req, res) => {
  try {
    const recruiterId = req.id; // Assuming recruiter ID is coming from the request object (e.g., via middleware)

    // Find jobs created by the recruiter and populate company with name and address
    const jobs = await Job.find({ created_by: recruiterId })
      .populate({
        path: "company",
        select: "name address",
      })
      .populate({
        path: "created_by",
        select: "fullname emailId.email",
      });

    // Respond with the list of jobs
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs for recruiter:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
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

export const updateJob = async (req, res) => {};

export const applyJob = async (req, res) => {
  try{
    const userId = req.id;
    const {fullname, email, number, address, jobId} = req.body;
    const {resume} = req.files;

  }catch(err){

  }
}
