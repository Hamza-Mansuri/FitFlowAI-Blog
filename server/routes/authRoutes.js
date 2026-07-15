import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
  verifyAdmin,
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

export default router;