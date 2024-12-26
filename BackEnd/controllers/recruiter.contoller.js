import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Recruiter } from "../models/recruiter.model.js";
import { User } from "../models/user.model.js";
import { oauth2Client } from "../utils/googleConfig.js";
import { Company } from "../models/company.model.js";
import axios from "axios";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(200).json({
        message: "Something is missing",
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
    let userExists = await Recruiter.findOne({ email });
    if(!userExists)
      userExists = await User.findOne({ email });

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
    let user = await Recruiter.findOne({ email: googleUser.email });

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
    const {recruiterId} = req.body;
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
  const { fullName, email, phoneNumber, password, position, companyId } = req.body;

  try {
    // Validate required fields
    if (!fullName || !email || !companyId || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(200).json({
        message: "Password must be at least 8 characters long.",
        success: false,
      });
    }


    // Check if recruiter email already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res
        .status(400)
        .json({ success: false, message: "Recruiter with this email already exists." });
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

    return res
      .status(201)
      .json({ success: true, message: "Recruiter added successfully.", recruiterId: recruiter._id });
  } catch (err) {
    console.error("Error adding recruiter:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

