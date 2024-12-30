import express from "express";
import { verifyToken, sendVerificationStatus, requestOTP, verifyOTP } from "../controllers/verification.controller.js";

const router = express.Router();
router.post("/verify-token", verifyToken);
router.post("/send-verification-status", sendVerificationStatus);
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);



export default router;
