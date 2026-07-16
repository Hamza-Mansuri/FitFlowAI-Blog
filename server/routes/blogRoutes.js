import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  incrementViews
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";

import adminOnly from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createBlog
);

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.patch("/:id/view", incrementViews);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateBlog
);

router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;