import express from "express";
import {
  register,
  googleLogin,
  getAllRecruiters,
  getRecruiterById,
  addRecruiterToCompany,
  updateProfile,
  deleteAccount,
  toggleActive
} from "../controllers/recruiter.contoller.js";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/googleLogin").post(googleLogin);
router
  .route("/profile/update")
  .put(isAuthenticated, singleUpload, updateProfile);

router.route("/recruiters").post(isAuthenticated, getAllRecruiters);
router.route("/recruiter-by-id/:id").get(isAuthenticated, getRecruiterById);
router.route("/add-recruiter").post(isAuthenticated, addRecruiterToCompany);

router.route("/delete").delete(isAuthenticated, deleteAccount);
router.route("/toggle-active").put(isAuthenticated, toggleActive);

export default router;
