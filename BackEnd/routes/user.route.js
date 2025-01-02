import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  googleLogin,
  sendMessage,
  forgotPassword,
  resetPassword,
  deleteAccount,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/googleLogin").post(googleLogin);

router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);

router.route("/sendMessage").post(sendMessage);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

router.route("/logout").get(isAuthenticated, logout);
router.route("/delete").delete(isAuthenticated, deleteAccount);

export default router;
