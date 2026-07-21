import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
  verifyAdmin,
  testEmail,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/admin/login", loginAdmin);

router.get(
  "/admin/verify",
  protect,
  verifyAdmin
);

router.get(
  "/verify",
  protect,
  (req, res) => {
    res.status(200).json(req.user);
  }
);

router.post("/test-email", testEmail);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

router.post("/resend-otp", resendOTP);

export default router;