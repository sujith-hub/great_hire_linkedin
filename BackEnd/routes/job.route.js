import express from "express";
import { postJob, getAllJobs, getJobById, getJobForRecruiter, deleteJobById, updateJob, hideJob, bookmarkJob, unBookmarkJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/post-job").post(isAuthenticated, postJob);
router.route('/bookmark-job/:id').get(isAuthenticated, bookmarkJob);
router.route('/unbookmark-job/:id').get(isAuthenticated, unBookmarkJob);
router.route('/hide-job/:id').get(isAuthenticated, hideJob);

router.route("/get").get(getAllJobs);
router.route("/get-recruiter-jobs").get(isAuthenticated, getJobForRecruiter);
router.route("/get/:id").get(isAuthenticated, getJobById);

router.route("/delete/:id").delete(isAuthenticated, deleteJobById);
router.route("/update-job").put(isAuthenticated, updateJob);

export default router;
