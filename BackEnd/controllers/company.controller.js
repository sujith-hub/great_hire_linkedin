import { Company } from "../models/company.model.js";
import { Recruiter } from "../models/recruiter.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { BlacklistedCompany } from "../models/blacklistedCompany.model.js";
import { JobSubscription } from '../models/jobSubscription.model.js';

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
      CIN,
      recruiterPosition,
      userEmail,
    } = req.body;

    // CIN validation function
    const isValidCIN = (cin) => {
      const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
      return cinRegex.test(cin);
    };

    if (!isValidCIN(CIN)) {
      return res.status(400).json({
        message: "Invalid CIN format.",
        success: false,
      });
    }

    // Check if any unique field exists in the BlacklistedCompany collection
    const isBlacklisted = await BlacklistedCompany.findOne({
      $or: [{ companyName }, { email }, { adminEmail }, { CIN }],
    });

    if (isBlacklisted) {
      return res.status(200).json({
        message: "Company Already has been Used",
        success: false,
      });
    }

    // Check if a company already exists with this email and CIN
    let company = await Company.findOne({ email, CIN });
    if (company) {
      return res.status(200).json({
        message: "Company already exists.",
        success: false,
      });
    }

    // Check if a recruiter exists with this email
    let recruiter = await Recruiter.findOne({ "emailId.email": userEmail });
    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found.",
        success: false,
      });
    }

    recruiter.position = recruiterPosition;
    recruiter.isCompanyCreated = true;
    await recruiter.save();

    let cloudResponse;
    const { businessFile } = req.files;
    if (businessFile && businessFile.length > 0) {
      // Convert file to a URI
      const fileUri = getDataUri(businessFile[0]);

      // Upload to Cloudinary
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    // Create a new company if it doesn't exist
    company = await Company.create({
      companyName,
      companyWebsite,
      industry,
      email,
      adminEmail: userEmail,
      phone,
      CIN,
      userId: [{ user: recruiter._id, isVerified: 0 }], // Add recruiter with `isVerified: false`
      address: {
        streetAddress,
        city,
        state,
        country,
        postalCode,
      },
      businessFile: cloudResponse ? cloudResponse.secure_url : undefined,
      bussinessFileName: businessFile ? businessFile.originalname : undefined,
    });

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
      subject: "Verify Your Recruiter/Employer Account",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f7fc; padding: 30px; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1e90ff;">GreatHire</h2>
            <p style="color: #555;">Connecting Skills with Opportunity - Your Next Great Hire Awaits!</p>
          </div>
          <h3 style="color: #333;">Hi there,</h3>
          <p style="color: #555;">Thank you for signing up with GreatHire! We’re excited to have you onboard.</p>
          <p style="color: #555;">To complete your Company registration, verify your recruiter/employer details, click the link below:</p>
    
          <div style="text-align: center; margin: 20px 0;">
            <a href="${
              process.env.FRONTEND_URL
            }/verify-recruiter/${verificationToken}" style="background-color: #1e90ff; color: #fff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px;">
              Verify Recruiter
            </a>
          </div>
    
          <p style="color: #555;">
            Please note: This link will expire in 24 hours.
          </p>
    
          <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="font-size: 14px; color: #888;">If you didn’t request this verification, please disregard this email.</p>
            <p style="font-size: 14px; color: #888;">For any questions or support, feel free to reach out to us.</p>
          </div>
    
          <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 14px; color: #aaa;">© ${new Date().getFullYear()} GreatHire. All rights reserved.</p>
          </div>
        </div>
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

export const companyByUserId = async (req, res) => {
  const { userId } = req.body;

  try {
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Query the company where userId matches
    const company = await Company.findOne({
      userId: { $elemMatch: { user: new mongoose.Types.ObjectId(userId) } },
    });

    if (company) {
      return res.status(200).json({ success: true, company });
    } else {
      return res.status(404).json({
        success: false,
        message: "Company not found for the given user ID.",
      });
    }
  } catch (err) {
    console.error(`Error in fetching company by user ID: ${err}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { companyWebsite, address, industry, email, phone } = req.body;
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
        message: "You are not authorized to update this company.",
        success: false,
      });
    }

    // Update only provided fields
    if (companyWebsite !== undefined) company.companyWebsite = companyWebsite;
    if (address !== undefined) company.address = address;
    if (industry !== undefined) company.industry = industry;
    if (email !== undefined) company.email = email;
    if (phone !== undefined) company.phone = phone;

    // Save the updated company document
    const updatedCompany = await company.save();

    return res.status(200).json({
      company: updatedCompany,
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      message: "An error occurred while updating the company.",
      success: false,
    });
  }
};

export const changeAdmin = async (req, res) => {
  const { email, companyId, adminEmail } = req.body;
  const userId = req.id;

  try {
    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Check if the userEmail is equal to the company's admin email
    if (email !== company.adminEmail) {
      return res.status(403).json({
        message: "You are not authorized to change the admin.",
        success: false,
      });
    }

    // Check if the userId exists in the company's userId array
    const userExists = company.userId.some(
      (user) => user.user.toString() === userId
    );

    if (!userExists) {
      return res.status(404).json({
        message: "You are not found in the company.",
        success: false,
      });
    }

    // Change the company's admin email
    company.adminEmail = adminEmail;
    await company.save();

    return res.status(200).json({
      message: "Admin email changed successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error changing admin:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
 
export const getCurrentPlan = async (req, res) => {
  try {
    const companyId = req.params.id; // Get company ID from request parameters
    
    // Find the active subscription for the company
    const currentPlan = await JobSubscription.findOne({
      company: companyId,
    }).select('jobBoost expiryDate planName price status purchaseDate'); // Select only required fields


    res.status(200).json({
      success: true,
      message: "Current active plan retrieved successfully",
      plan: currentPlan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

