import Razorpay from "razorpay";
import { Order } from "../models/order.model.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { userDetails, planDetails } = req.body;

    // Check for an existing order
    const existingOrder = await Order.findOne({
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
    const newOrder = new Order({
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
