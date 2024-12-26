import express from "express";
import {
  register,
  googleLogin,
  getRecruiterById,
  addRecruiterToCompany
} from "../controllers/recruiter.contoller.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);
router.route("/recruiter-by-id").post(getRecruiterById);
router.route("/add-recruiter").post(isAuthenticated,addRecruiterToCompany);
export default router;
