import Razorpay from "razorpay";
import { Order } from "../models/order.model.js"; 

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { userDetails, planDetails } = req.body;
    // Create Razorpay Order
    const options = {
      amount: planDetails.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save order to the database
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
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};
