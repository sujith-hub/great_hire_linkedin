import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
   // const jobId = req.params.id;
   // console.log(req.params);
    const {
      fullname,
      email,
      number,
      city,
      state,
      country,
      coverLetter,
      experience,
      jobTitle,
      company,
      jobId
    } = req.body;
    const { resume } = req.files;

    console.log(req.body);
    

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const job = await Job.findById({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check and update user details if necessary
    if (fullname && fullname !== user.fullname) {
      user.fullname = fullname;
    }
    if (email && email !== user.emailId.email) {
      user.emailId.email = email;
      user.emailId.isVerified = false;
    }
    if (number && number !== user.phoneNumber.number) {
      user.phoneNumber.number = number;
      user.phoneNumber.isVerified = false;
    }
    if (city && city !== user.address.city) {
      user.address.city = city;
    }
    if (state && state !== user.address.state) {
      user.address.state = state;
    }
    if (country && country !== user.address.country) {
      user.address.country = country;
    }

    if (coverLetter) {
      user.profile.coverLetter = coverLetter;
    }
    if (experience) {
      user.profile.experience.experienceDetails = experience;
    }
    if (jobTitle) {
      user.profile.experience.jobProfile = jobTitle;
    }
    if (company) {
      user.profile.experience.companyName = company;
    }

    // Update resume if provided
    if (resume && resume.length > 0) {
      const fileUri = getDataUri(resume[0]);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = resume[0].originalname;
    }

    // Save the updated user
    const updateUser = await user.save();

    // Create a new application
    const newApplication = new Application({
      job: jobId,
      applicant: userId,
      status: "pending",
    });

    // Save the application to the database
    await newApplication.save();

    // Push the new application ID to the job's applications array
    job.application.push(newApplication._id);

    // Save the updated job
    await job.save();

    res.status(201).json({
      message: "Applied successfully",
      user: updateUser,
    });
  } catch (err) {
    console.error("Error applying for job:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

//applied job....
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications.",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//admin section to see user applied...
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
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

//update status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicaionId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "Status is required.",
        success: false,
      });
    }
    //find the applicationn by applicant id....
    const application = await Application.findOne({ _id: applicaionId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    //update status...
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
