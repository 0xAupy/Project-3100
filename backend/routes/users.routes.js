import express from "express";
import {
  register,
  login,
  logout,
  getAuthUser,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
} from "../controllers/users.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protectRoute, getAuthUser);
router.post("/send-verify-otp", protectRoute, sendVerifyOtp);
router.post("/verify-account", protectRoute, verifyEmail);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
