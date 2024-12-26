import express from "express";
import { verifyToken, sendVerificationStatus } from "../controllers/verification.controller.js";

const router = express.Router();
router.post("/verify-token", verifyToken);
router.post("/send-verification-status", sendVerificationStatus);



export default router;
