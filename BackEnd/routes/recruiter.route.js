import express from "express";
import {
  register,
  googleLogin,
  getRecruiterById,
} from "../controllers/recruiter.contoller.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);
router.route("/recruiter-by-id").post(getRecruiterById);
export default router;
