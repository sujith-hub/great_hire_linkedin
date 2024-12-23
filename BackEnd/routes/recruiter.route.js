import express from "express";
import { register, googleLogin } from "../controllers/recruiter.contoller.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);
export default router;
