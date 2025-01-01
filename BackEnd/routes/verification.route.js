import express from "express";
import { verifyToken, sendVerificationStatus, requestOTP, verifyOTP, verifyPayment } from "../controllers/verification.controller.js";

const router = express.Router();
router.post("/verify-token", verifyToken);
router.post("/send-verification-status", sendVerificationStatus);
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.post('/verify-payment', verifyPayment);



export default router;
