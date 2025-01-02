import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Recruiter } from "../models/recruiter.model.js";
import { User } from "../models/user.model.js";
import { oauth2Client } from "../utils/googleConfig.js";
import { Company } from "../models/company.model.js";
import axios from "axios";
import nodemailer from "nodemailer";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(200).json({
        message: "Something is missing",
      });
    }

    // Validate fullname length
    if (fullname.length < 3) {
      return res.status(200).json({
        message: "Fullname must be at least 3 characters long.",
        success: false,
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(200).json({
        message: "Password must be at least 8 characters long.",
        success: false,
      });
    }

    // Check if user already exists
    let userExists =
      (await Recruiter.findOne({ email })) || (await User.findOne({ email }));

    if (userExists) {
      return res.status(200).json({
        message: "Account already exists.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Recruiter.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Send success response
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login by google
export const googleLogin = async (req, res) => {
  try {
    const { code, role } = req.body;

    if (!code) {
      return res
        .status(200)
        .json({ message: "Authorization code is required" });
    }

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user information from Google
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const googleUser = userRes.data;

    // Check if user already exists
    let user =
      (await Recruiter.findOne({ email: googleUser.email })) ||
      (await User.findOne({ email: googleUser.email }));

    if (user) {
      if (role && role !== user.role) {
        res.status(200).json({
          message: "Account already exist use another!",
          success: false,
        });
      }

      const tokenData = {
        userId: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      // cookies strict used...
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: `Welcome back ${user.fullname}`,
          user,
          success: true,
        });
    }

    // If user doesn't exist, create a new one
    user = new Recruiter({
      fullname: googleUser.name || googleUser.given_name || "No Name",
      email: googleUser.email,
      phoneNumber: "",
      password: "", // No password for Google-authenticated users
      profile: {
        profilePhoto: googleUser.picture || "",
      },
    });

    await user.save();

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    // cookies strict used...
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    console.error("Error during Google Login:", err.message);
    return res.status(500).json({
      message: "Google Login failed",
      error: err.message,
    });
  }
};

// recruiter details by id
export const getRecruiterById = async (req, res) => {
  try {
    const { recruiterId } = req.body;
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found.",
        Success: false,
      });
    }
    return res.status(200).json({
      recruiter,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRecruiterToCompany = async (req, res) => {
  const { fullName, email, phoneNumber, password, position, companyId } =
    req.body;

  try {
    // Validate required fields
    if (!fullName || !email || !companyId || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(200).json({
        message: "Password must be at least 8 characters long.",
        success: false,
      });
    }

    // Check if recruiter email already exists
    const existingRecruiter =
      (await Recruiter.findOne({ email })) || (await User.findOne({ email }));
    if (existingRecruiter) {
      return res.status(400).json({
        success: false,
        message: "Account already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new recruiter
    const recruiter = await Recruiter.create({
      fullname: fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      position,
      isVerify: 1,
      isCompanyCreated: true,
    });

    // Update company with recruiter's ID
    const company = await Company.findById(companyId);
    company.userId.push({ user: recruiter._id });
    await company.save();

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: `"GreatHire Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Recruiter Account Has Been Created",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h2>Great<span style="color: #1D4ED8;">Hire</span></h2>
                <p style="color: #555;">Building Smart and Powerful Recruiter Teams</p>
              </div>
        
              <h3 style="color: #333;">Welcome to Great<span style="color: #1D4ED8;">Hire</span>, ${fullName}!</h3>
              <p style="color: #555;">
                We are excited to inform you that you have been added as a recruiter by your company admin. Below are your account details:
              </p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Position:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${position}</td>
                </tr>
              </table>
        
              <h4 style="color: #1e90ff;">Your Login Credentials:</h4>
              <p style="font-weight: bold; color: #333;">Email: ${email}</p>
              <p style="font-weight: bold; color: #333;">Password: ${password}</p>
              
              <p style="color: #555;">
                Please log in to your account using the credentials above at the following link:
                <a href="${
                  process.env.FRONTEND_URL
                }/login" style="color: #1e90ff; text-decoration: none;">GreatHire Login</a>
              </p>
        
              <p style="color: #555;">
                Make sure to update your password after logging in for the first time for security purposes.
              </p>
        
              <div style="margin-top: 20px; text-align: center;">
                <p style="font-size: 14px; color: #aaa;">This is an automated email, please do not reply.</p>
                <p style="font-size: 14px; color: #aaa;">© ${new Date().getFullYear()} GreatHire. All rights reserved.</p>
              </div>
            </div>
          `,
    };

    // Send email
    let mailResponse = await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Recruiter added. credentials send to recruiter mail. ",
      recruiterId: recruiter._id,
    });
  } catch (err) {
    console.error("Error adding recruiter:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, position } = req.body;
    const { profilePhoto } = req.files; // Access files from req.files
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing in the request.",
        success: false,
      });
    }

    if (fullname && fullname.length < 3) {
      return res.status(200).json({
        message: "Fullname must be at least 3 characters long.",
        success: false,
      });
    }

    let user = await Recruiter.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Upload profile photo if provided
    if (profilePhoto && profilePhoto.length > 0) {
      const fileUri = getDataUri(profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }


    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if(position) user.position = position;
    await user.save();

    const updatedUser = await Recruiter.findById(userId).select("-password");
    
    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      error: error.message,
      success: false,
    });
  }
};

export const deleteAccount = async (req, res) => {
  const { userId, userEmail, companyId } = req.body;
  try {
    if (userEmail === company.adminEmail) {
    } else {
    }
  } catch (err) {}
};
