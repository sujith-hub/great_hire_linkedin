import express from "express";
import {
  getCompanyList,
  getCompanyById,
  registerCompany,
  updateCompany,
  companyByUserId,
  changeAdmin,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, singleUpload, registerCompany);
router.route("/company-by-id").post(getCompanyById);
router.route("/company-by-userid").post(isAuthenticated, companyByUserId);
router.route("/change-admin").put(isAuthenticated, changeAdmin);

// router.route("/get").get(isAuthenticated,getCompanyList);

// router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
