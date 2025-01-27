import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/apply").post(isAuthenticated, singleUpload, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
  