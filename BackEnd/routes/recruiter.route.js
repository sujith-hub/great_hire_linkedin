import express from "express";
import {
  register,
  googleLogin,
  getRecruiterById,
  addRecruiterToCompany,
  deleteAccount
} from "../controllers/recruiter.contoller.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);

router.route("/recruiter-by-id").post(getRecruiterById);
router.route("/add-recruiter").post(isAuthenticated,addRecruiterToCompany);

router.route("/delete").get(isAuthenticated, deleteAccount);

export default router;
