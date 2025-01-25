import Razorpay from "razorpay";
import { serviceOrder } from "../models/serviceOrder.model.js";
import { JobSubscription } from "../models/jobSubscription.model.js";
import { Company } from "../models/company.model.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrderForService = async (req, res) => {
  try {
    const { userDetails, planDetails } = req.body;

    // Check for an existing order
    const existingOrder = await serviceOrder.findOne({
      "userDetails.email": userDetails.email,
      "planDetails.planId": planDetails.planId,
      status: "created",
    });

    if (existingOrder) {
      // Return existing order details
      return res.status(200).json({
        success: true,
        orderId: existingOrder.razorpayOrderId,
        amount: existingOrder.planDetails.amount,
        currency: "INR", // Assuming INR is the currency used
      });
    }

    // Create a new Razorpay order
    const options = {
      amount: planDetails.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save new order to the database
    const newOrder = new serviceOrder({
      userDetails,
      planDetails,
      razorpayOrderId: razorpayOrder.id,
      status: "created",
    });
    await newOrder.save();

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount / 100, // Convert back to original amount
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

export const createOrderForJobPlan = async (req, res) => {
  try {
    const { planName, companyId, amount, jobBoost } = req.body;

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
        message: "You are not authorized",
        success: false,
      });
    }

    // Validate input
    if (!planName || !companyId || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if there's an active or "created" subscription for this company
    const existingSubscription = await JobSubscription.findOne({
      planName,
      company: companyId,
      paymentStatus: "created",
    });

    if (existingSubscription) {
      return res.status(200).json({
        success: true,
        message: "Existing order found",
        orderId: existingSubscription.razorpayOrderId,
        amount: existingSubscription.price,
        currency: "INR",
      });
    }

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Create a new subscription in the database
    const newSubscription = new JobSubscription({
      planName,
      price: amount,
      razorpayOrderId: razorpayOrder.id,
      company: companyId,
      paymentStatus: "created",
      jobBoost
    });

    await newSubscription.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount / 100, // Convert to INR
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create order", error });
  }
};
