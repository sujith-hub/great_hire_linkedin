import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Recruiter } from "../models/recruiter.model.js";
import { Company } from "../models/company.model.js";
import mongoose from "mongoose";

export const verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({
      decoded,
      message: "Token Valid",
      success: true,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired.",
        success: false,
      });
    }
    return res.status(400).json({
      message: `Invalid token. ${err}`,
      success: false,
    });
  }
};

export const sendVerificationStatus = async (req, res) => {
  try {
    const { companyData, recruiterData, status } = req.body;

    // Validate input
    if (!companyData || !recruiterData || status === undefined) {
      return res.status(400).json({
        message: "Missing required data.",
        success: false,
      });
    }

    // Construct the message based on status
    let message;
    if (status === -1) {
      message = `${recruiterData.fullname} with email ${recruiterData.email} has been marked as not verified.`;
    } else if (status === 1) {
      message = `${recruiterData.fullname} with email ${recruiterData.email} has been verified successfully.`;
    } else {
      return res.status(400).json({
        message: "Invalid status provided.",
        success: false,
      });
    }

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Great Hire
    const mailOptionsForGreatHire = {
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Recruiter Verification Status by ${companyData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1e90ff;">GreatHire</h2>
            <p style="color: #555;">Recruiter Verification Status</p>
          </div>
          <p><strong style="color: #333;">Company Name:</strong> ${
            companyData.companyName
          }</p>
          <p><strong style="color: #333;">Recruiter Name:</strong> ${
            recruiterData.fullname
          }</p>
          <p><strong style="color: #333;">Recruiter Email:</strong> ${
            recruiterData.email
          }</p>
          <p><strong style="color: #333;">Status:</strong> ${
            status === 1 ? "Verified" : "Not Verified"
          }</p>
          <p style="color: #555;">${message}</p>
          <br />
          <p style="text-align: center;">Thanks, <br /> GreatHire Support</p>
        </div>
      `,
    };

    // Email to Recruiter
    const mailOptionsForRecrutier = {
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: recruiterData.email,
      subject: `Recruiter Verification Status by ${companyData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1e90ff;">GreatHire</h2>
            <p style="color: #555;">Recruiter Verification Status</p>
          </div>
          <p><strong style="color: #333;">Company Name:</strong> ${
            companyData.companyName
          }</p>
          <p><strong style="color: #333;">Recruiter Name:</strong> ${
            recruiterData.fullname
          }</p>
          <p><strong style="color: #333;">Recruiter Email:</strong> ${
            recruiterData.email
          }</p>
          <p><strong style="color: #333;">Status:</strong> ${
            status === 1 ? "Verified" : "Not Verified"
          }</p>
          <p style="color: #555;">${message}</p>
          <p style="font-weight: bold; color: #333;">Now you ${
            status === 1 ? "can" : "can't"
          } post jobs and add users to the company.</p>
          <br />
          <p style="text-align: center;">Thanks, <br /> GreatHire Team</p>
        </div>
      `,
    };

    // Email to Company
    const mailOptionsForCompany = {
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: companyData.email,
      subject: `Verification Response`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1e90ff;">GreatHire</h2>
            <p style="color: #555;">Recruiter Verification Status</p>
          </div>
          <p><strong style="color: #333;">Your verification response for recruiter:</strong> <strong>${recruiterData.fullname}</strong></p>
          <p style="color: #555;">We will update the recruiter’s status shortly.</p>
          <br />
          <p style="text-align: center;">Thanks, <br /> GreatHire Team</p>
        </div>
      `,
    };

    if (status === 1) {
      await Recruiter.updateOne({
        email: recruiterData.email,
        isVerify: status,
      });
    } else if (status === -1) {
      if (companyData.adminEmail === recruiterData.email) {
        await Company.deleteOne({ email: companyData.email });
      } else {
        // step 1: remove particular email id
        await Company.updateOne(
          { email: companyData.email },
          {
            $pull: {
              userId: { user: new mongoose.Types.ObjectId(recruiterData._id) },
            },
          }
        );
      }
      // Step 2: Set isCompanyCreated to false in Recruiter model
      await Recruiter.updateOne({
        email: recruiterData.email,
        isVerify: status,
      });
    }

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(mailOptionsForCompany),
      transporter.sendMail(mailOptionsForGreatHire),
      transporter.sendMail(mailOptionsForRecrutier),
    ]);

    // Return success response
    return res.status(200).json({
      message: "Verification emails sent successfully.",
      success: true,
    });
  } catch (err) {
    console.error("Error in sending verification status:", err);
    return res.status(500).json({
      message: "Failed to send verification emails.",
      success: false,
      error: err.message,
    });
  }
};
