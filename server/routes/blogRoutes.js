import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  incrementViews,
  toggleLikeBlog,
  toggleSaveBlog,
  getUserProfileData,
  getAuthorProfileData,
  getAdminCommunityBlogs,
  approveCommunityBlog,
  rejectCommunityBlog
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/author/:authorId", getAuthorProfileData);
router.get("/:id", getBlogById);
router.patch("/:id/view", incrementViews);

// User Protected routes
router.get("/user/profile", protect, getUserProfileData);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/like", protect, toggleLikeBlog);
router.post("/:id/save", protect, toggleSaveBlog);

// Admin Only routes
router.get("/admin/community", protect, adminOnly, getAdminCommunityBlogs);
router.patch("/admin/community/:id/approve", protect, adminOnly, approveCommunityBlog);
router.patch("/admin/community/:id/reject", protect, adminOnly, rejectCommunityBlog);

export default router;