import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    urgentHiring: {
      type: String,
      required: "true",
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
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    saveJob: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hiddenJob: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);
