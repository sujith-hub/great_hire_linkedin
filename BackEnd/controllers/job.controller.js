import { Job } from "../models/job.model.js";
import * as qna from '@tensorflow-models/qna';

async function extractKeywords(jobTitle) {
  const model = await qna.load();
  const answers = await model.findAnswers('What are the main keywords for job title?', jobTitle);
  console.log(answers);
}





export const postJob = async (req, res) => {
  try {
    // Extract job details from the request body
    const {
      companyName, urgentHiring, title, details, skills, qualifications, benefits, responsibilities, experience, salary, jobType, location, numberOfOpening, respondTime, duration, jobValidityInDays, companyId
    } = req.body;

    
    // split skills by commas

    // split qualification by new line

    // split benefits by new line

    // split responsibilities by new line



    const recruiterId = req.id;

    // Validate required fields
    if (!jobDetails || !created_by || !company) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Create new job instance
    const newJob = new Job({
      jobDetails: {
        ...jobDetails,
        urgentHiring: jobDetails.urgentHiring || "No", // Default value if not provided
      },
      created_by,
      company,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Respond with success and the saved job details
    return res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      job: savedJob,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//employer
//get all jobs.....
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//employer
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

//admin created job count...

export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
