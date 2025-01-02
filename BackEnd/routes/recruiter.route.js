import express from "express";
import {
  register,
  googleLogin,
  getRecruiterById,
  addRecruiterToCompany,
  updateProfile,
  deleteAccount,
} from "../controllers/recruiter.contoller.js";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);
router
  .route("/profile/update")
  .put(isAuthenticated, singleUpload, updateProfile);
router.route("/recruiter-by-id").post(getRecruiterById);
router.route("/add-recruiter").post(isAuthenticated, addRecruiterToCompany);

router.route("/delete").get(isAuthenticated, deleteAccount);

export default router;
