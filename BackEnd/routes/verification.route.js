import express from "express";
import {
  verifyToken,
  sendVerificationStatus,
  requestOTPForEmail,
  requestOTPForNumber,
  verifyOTP,
  verifyPaymentForService,
  verifyPaymentForJobPlans,
  verifyPaymentForCandidatePlans,
  updateEmailVerification,
  updateNumberVerification,
  sendEmailToApplicant
} from "../controllers/verification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.post("/verify-token", verifyToken);
router.post("/send-verification-status", sendVerificationStatus);
router.post("/request-otp-email", isAuthenticated, requestOTPForEmail);
router.post("/request-otp-mob", isAuthenticated, requestOTPForNumber);
router.post("/verify-otp", verifyOTP);
router.post("/verify-payment-for-service", verifyPaymentForService);
router.post("/verify-payment-for-jobplan", verifyPaymentForJobPlans);
router.post("/verify-payment-for-candidateplan", verifyPaymentForCandidatePlans);

router.post("/update-email-verification", updateEmailVerification);
router.post("/update-number-verification", updateNumberVerification);
router.post("/send-email-applicants/:id",isAuthenticated, sendEmailToApplicant);

export default router;
