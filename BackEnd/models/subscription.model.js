import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["JobPosting", "CandidateData"], // Subscription types
      required: true,
    },
    planName: { type: String, required: true, default: "Free" }, // e.g., "Basic", "Standard", "Premium"
    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now, // Auto-set purchase date
    },
    expiryDate: {
      type: Date,
      required: true, // Subscription expiration date
    },
    maxUsage: {
      type: Number, // Maximum allowed usage
      required: true,
      default:10
    },
    price: {
      type: Nubmer,
      required: ture,
    },
    remainingUsage: {
      type: Number, // Remaining usage
      required: true,
      default: 10,
    },
    status: {
      type: String,
      enum: ["Active", "Expired"], // Subscription status
      required: true,
      default: "Active",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to the company
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
