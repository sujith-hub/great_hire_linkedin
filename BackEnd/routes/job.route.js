import express from "express";
import { postJob, getAllJobs, getJobById, getJobForRecruiter, deleteJobById, updateJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/post-job").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobForRecruiter);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/delete/:id").delete(isAuthenticated, deleteJobById);
router.route("/update-job").put(isAuthenticated, updateJob);

export default router;
