import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobDetails: {
      tags: {
        type: [String], // Properly define as an array of strings
      },
      urgentHiring: {
        type: String,
        required: true, // Corrected to Boolean, true/false
        default: "No",
      },
      title: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      benefits: [
        {
          type: String,
        },
      ],
      qualifications: [
        {
          type: String,
        },
      ],
      responsibilities: [
        {
          type: String,
        },
      ],
      salary: {
        type: String, // Use String if the salary includes a range
        required: true,
      },
      experience: {
        type: String, // Assuming it's a number but stored as string
        required: true,
      },
      jobType: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      rating: {
        type: String, // Assuming this is a string rating value
        required: true,
      },
      respond: {
        type: String,
        required: true,
      },
      skills: [
        {
          skill: { type: String, required: true },
          required: { type: Boolean, required: true },
        },
      ],
      duration: {
        type: String, // If it's a text field (e.g., "Monday to Friday")
        required: true,
      },
    },
    saveJob: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hiddenJob: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
