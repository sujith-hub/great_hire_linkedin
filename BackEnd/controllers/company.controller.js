import { Company } from "../models/company.model.js";
import { Recruiter } from "../models/recruiter.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyWebsite,
      industry,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      email,
      phone,
      taxId,
      recruiterPosition,
      recruiterPhone,
      userEmail,
    } = req.body;

    // Check if a company already exists with this email
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        message: "A company with this email already exists.",
        success: false,
      });
    }

    

    // Check if a recruiter exists with this email
    let recruiter = await Recruiter.findOne({ email: userEmail });
    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found.",
        success: false,
      });
    }
    // Check if userEmail exists in any company's userId array
    const userAlreadyLinked = await Company.findOne({
      "userId.user": recruiter._id, 
    });

    if (userAlreadyLinked) {
      return res.status(400).json({
        message: "This email is already in use for a company.",
        success: false,
      });
    }
    // Update recruiter's position and phone number
    recruiter.phoneNumber = recruiterPhone;
    recruiter.position = recruiterPosition;
    await recruiter.save();

    let cloudResponse;
    const file = req.file;
    if (file) {
      // Convert file to a URI
      const fileUri = getDataUri(file);

      // Upload to Cloudinary
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    // Check if the company already exists
    let company = await Company.findOne({ companyName });

    if (company) {
      // Check if the recruiter is already in the userId array
      const isRecruiterLinked = company.userId.some(
        (userObj) => userObj.user.toString() === recruiter._id.toString()
      );

      if (!isRecruiterLinked) {
        // Add the recruiter to the userId array with `isVerified: false`
        company.userId.push({ user: recruiter._id, isVerified: false });
        await company.save();
      }
    } else {
      // Create a new company if it doesn't exist
      company = await Company.create({
        companyName,
        companyWebsite,
        industry,
        email,
        phone,
        taxId,
        userId: [{ user: recruiter._id, isVerified: false }], // Add recruiter with `isVerified: false`
        address: {
          streetAddress,
          city,
          state,
          country,
          postalCode,
        },
        businessFile: cloudResponse ? cloudResponse.secure_url : undefined,
        bussinessFileName: file ? file.originalname : undefined,
      });
    }

    // Generate a verification token
    const verificationToken = jwt.sign(
      { recruiterId: recruiter._id, companyId: company._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Email options
    const mailOptions = {
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recruiter/Employer Verification",
      html: `
        <h3>Verify Your Recruiter/Employer</h3>
        <p>Click the link below to verify your company and recruiter details:</p>
        <a href="${process.env.FRONTEND_URL}/verify-recruiter/${verificationToken}">
          Verify Recruiter
        </a>
        <p>This link expires after 24 hours.</p>
        <br/>
        <h3>Thanks, Great Hire. </h3>
      `,
    };

    // Send email
    let mailResponse = await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      recruiter,
      success: true,
    });
  } catch (error) {
    console.error("Error in registering company:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//company get

export const getCompanyList = async (req, res) => {
  try {
    const userId = req.id; //logged in userId
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const recruiterVerficationConfirmation = async (req, res) => {};

//get  company by id ...
export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        Success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudainary is coming here....

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
