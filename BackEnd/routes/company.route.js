import express from "express";
import {
  getCompanyList,
  getCompanyById,
  registerCompany,
  updateCompany,
  companyByUserId,
  changeAdmin,
  getCurrentPlan,
  getCandidateData,
  decreaseCandidateCredits
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, singleUpload, registerCompany);
router.route("/company-by-id").post(getCompanyById);
router.route("/company-by-userid").post(isAuthenticated, companyByUserId);
router.route("/change-admin").put(isAuthenticated, changeAdmin);

// router.route("/get").get(isAuthenticated,getCompanyList);
// Define the route to get candidates
router.get("/candidate-list", isAuthenticated, getCandidateData);
router.route("/update/:id").put(isAuthenticated, updateCompany);
router.route("/current-plan/:id").get(isAuthenticated, getCurrentPlan);
router.route("/decrease-credit/:id").get(isAuthenticated, decreaseCandidateCredits);

export default router;
