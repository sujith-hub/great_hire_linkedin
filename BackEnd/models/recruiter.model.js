import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "recruiter",
    },
    position:{
      type: String,
      default: "" 
    },
    maxPostJobs: {
      type: Number,
      default:10
    },
    maxResumeDownload: {
      type: Number,
      default:10
    },
    haveSubscription: {
      type: Boolean,
      default: false,
    },
    isVerify: {
      type: Number,
      default: 0,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL for the resume
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },

  { timestamps: true }
);

export const Recruiter = mongoose.model("Recruiter", recruiterSchema);
