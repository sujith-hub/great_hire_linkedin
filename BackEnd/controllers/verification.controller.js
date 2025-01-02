import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Recruiter } from "../models/recruiter.model.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import randomstring from "randomstring";
import { Order } from "../models/order.model.js"; 
import { hmac } from "fast-sha256";
import { TextEncoder, TextDecoder } from "util";

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// OTP Secret
const OTP_SECRET = process.env.SECRET_KEY;

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

export const requestOTP = async (req, res) => {
  const formData = req.body;
  try {
    // Check if user already exists
    let user =
      (await User.findOne({ email: formData.email })) ||
      (await Recruiter.findOne({ email: formData.email }));
    if (user) {
      return res.status(401).json({
        message: "User already exists!",
        success: false,
      });
    }

    // Generate OTP
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const token = jwt.sign({ otp, formData }, OTP_SECRET, {
      expiresIn: "30s",
    });

    // Send OTP via email
    await transporter.sendMail({
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Your GreatHire OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #1d4ed8; text-align: center;">GreatHire OTP Verification</h2>
          <p style="font-size: 16px; color: #555;">Hello,</p>
          <p style="font-size: 16px; color: #555;">
            Thank you for using <strong>GreatHire</strong>! Please use the OTP below to complete your verification:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; color: #1d4ed8; font-weight: bold; border: 2px dashed #1d4ed8; padding: 10px 20px; border-radius: 8px;">${otp}</span>
          </div>
          <p style="font-size: 16px; color: #555;">
            This OTP is valid for <strong>30 seconds</strong>. Please do not share it with anyone for security reasons.
          </p>
          <p style="font-size: 16px; color: #555;">
            If you did not request this OTP, please ignore this email or contact our support team.
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="font-size: 14px; color: #999; text-align: center;">
            © ${new Date().getFullYear()} GreatHire. All rights reserved.
          </p>
        </div>
      `,
    });

    res.status(200).json({
      message: "OTP sent successfully!",
      success: true,
      token,
    });
  } catch (err) {
    console.error(`Error in sending OTP: ${err}`);
    res.status(500).json({
      message: "Failed to send OTP. Please try again.",
      success: false,
    });
  }
};

// Verify OTP Controller
export const verifyOTP = async (req, res) => {
  const { decodedOTP, otp } = req.body;

  // Check if token and OTP are provided
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "OTP required.",
    });
  }

  try {
    // Check if the OTP matches and is still valid
    if (decodedOTP !== otp) {
      return res.status(200).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again.",
    });
  }
};

// Verify Payment Controller
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Secret key and data for HMAC
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const data = razorpay_order_id + "|" + razorpay_payment_id;

    // Generate HMAC signature
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);
    const message = encoder.encode(data);
    const generatedSignature = Buffer.from(hmac(secretKey, message)).toString("hex");

    // Compare the generated signature with Razorpay's signature
    if (generatedSignature === razorpay_signature) {
      // Update the order status in the database
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "paid",
          paymentDetails: {
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
          },
        }
      );

      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
