import mongoose from "mongoose";
const jobSubscriptionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "JobPosting",
    },
    planName: {
      type: String,
      enum: ["Basic", "Standard", "Premium"],
      required: true,
    },
    jobBoost: {
      type: Number,
      validate: {
        validator: function (v) {
          return v === null || v >= 0; // Allow null for unlimited
        },
        message: "maxJobPosts must be null or a non-negative number",
        
      },
      required:true
    },
    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
      default: function () {
        // Automatically set to one month after purchase
        return new Date(new Date().setMonth(new Date().getMonth() + 1));
      },
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Hold","Active", "Expired"],
      required: true,
      default: "Hold",
    },
    razorpayOrderId: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    paymentDetails: {
      // To capture additional Razorpay payment information
      paymentId: { type: String },
      signature: { type: String },
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

// Helper method to update status
jobSubscriptionSchema.methods.checkValidity = async function () {
  const now = new Date();
  if (this.expiryDate < now || this.status === "Expired") {
    // Expire the subscription
    this.status = "Expired";
    await this.save();

    // Update the company's maxPostJobs to 0
    const company = await mongoose.model("Company").findById(this.company);
    if (company) {
      company.maxPostJobs = 0;
      await company.save();
    }
  }
};

export const JobSubscription = mongoose.model(
  "JobSubscription",
  jobSubscriptionSchema
);
