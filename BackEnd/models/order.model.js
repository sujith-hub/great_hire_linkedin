const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
    },
    planDetails: {
      planId: { type: Number, required: true }, // Matches the plan ID from Redux
      planHead: { type: String },
      planSubHead: { type: String },
      amount: { type: Number, required: true },
    },
    razorpayOrderId: { type: String, required: true },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    paymentDetails: {
      // To capture additional Razorpay payment information
      paymentId: { type: String },
      signature: { type: String },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
