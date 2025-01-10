import express from "express";
import {
  verifyToken,
  sendVerificationStatus,
  requestOTPForEmail,
  requestOTPForNumber,
  verifyOTP,
  verifyPayment,
  updateEmailVerification,
  updateNumberVerification,
} from "../controllers/verification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.post("/verify-token", verifyToken);
router.post("/send-verification-status", sendVerificationStatus);
router.post("/request-otp-email", isAuthenticated, requestOTPForEmail);
router.post("/request-otp-mob", isAuthenticated, requestOTPForNumber);
router.post("/verify-otp", verifyOTP);
router.post("/verify-payment", verifyPayment);

router.post(
  "/update-email-verification",
  updateEmailVerification
);
router.post(
  "/update-number-verification",
  updateNumberVerification
);

export default router;
