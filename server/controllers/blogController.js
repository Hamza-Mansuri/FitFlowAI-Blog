import { getModelByCategory, getAllModels } from "../models/Blog.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

// GET all blogs (Only return approved ones by default)
export const getBlogs = async (req, res) => {
  try {
    const models = getAllModels();
    const results = await Promise.all(models.map(Model => Model.find({ status: "approved" })));
    // Combine and sort by createdAt descending
    const blogs = results.flat().sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE a blog in the correct category collection
export const createBlog = async (req, res) => {
  try {
    const Model = getModelByCategory(req.body.category);
    
    // Automatically set author and status based on roles
    const isAdmin = req.user && req.user.role === "admin";
    const authorRole = isAdmin ? "admin" : "user";
    const status = isAdmin ? "approved" : "pending";
    const authorId = req.user ? req.user._id : null;
    const authorName = req.user ? req.user.name : "Hamza Mansuri";

    const blog = await Model.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: authorName,
      authorId,
      authorName,
      authorRole,
      status,
      readTime: req.body.readTime,
      expertTip: req.body.expertTip,
      content: req.body.content,
      takeaways: req.body.takeaways
        ? req.body.takeaways.split("\n").filter((item) => item.trim() !== "")
        : [],
      image: req.file?.path || "",
      imagePublicId: req.file?.filename || "",
      videoUrl: req.body.videoUrl || "",
    });

    // If logged in, push to creator's published blogs
    if (req.user) {
      let authorModel = User;
      if (req.user.role === "admin") {
        authorModel = Admin;
      }
      await authorModel.findByIdAndUpdate(req.user._id, {
        $push: { publishedBlogs: { blogId: blog._id, category: blog.category } }
      });
    }

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET Single Blog By ID (search all collections, enforce status authorization)
export const getBlogById = async (req, res) => {
  try {
    const models = getAllModels();
    for (const Model of models) {
      const blog = await Model.findById(req.params.id);
      if (blog) {
        // Enforce permissions for non-approved blogs
        if (blog.status !== "approved") {
          let reqUser = null;
          if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ) {
            try {
              const token = req.headers.authorization.split(" ")[1];
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              reqUser = decoded;
            } catch (err) {
              // Token invalid or expired, treat as guest
            }
          }

          const isAuthor = reqUser && blog.authorId && blog.authorId.toString() === reqUser.id.toString();
          const isAdmin = reqUser && reqUser.role === "admin";
          if (!isAuthor && !isAdmin) {
            return res.status(403).json({
              message: "Access denied. This blog is not published yet.",
            });
          }
        }
        return res.json(blog);
      }
    }

    res.status(404).json({
      message: "Blog not found",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Blog (enforce restrictions on approved or unauthorized edits)
export const updateBlog = async (req, res) => {
  try {
    const models = getAllModels();
    let blog = null;
    let oldModel = null;

    for (const Model of models) {
      blog = await Model.findById(req.params.id);
      if (blog) {
        oldModel = Model;
        break;
      }
    }

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Enforce authorization
    const isAuthor = req.user && blog.authorId && blog.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user && req.user.role === "admin";
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        message: "Not authorized to update this blog.",
      });
    }

    // Approved blogs are read-only for normal users
    if (!isAdmin && blog.status === "approved") {
      return res.status(403).json({
        message: "Approved blogs are read-only.",
      });
    }

    const newCategory = req.body.category;
    
    // Determine new status: user resubmissions return to pending
    let targetStatus = blog.status;
    if (!isAdmin && (blog.status === "rejected" || blog.status === "pending")) {
      targetStatus = "pending";
    }

    // If category changed, migrate to the new collection
    if (newCategory && newCategory !== blog.category) {
      // 1. Delete from old collection
      await blog.deleteOne();

      // 2. Determine image details (keep existing or use new uploaded one)
      let imagePath = blog.image;
      let imagePublicId = blog.imagePublicId;

      if (req.file) {
        // Delete old image from Cloudinary
        if (blog.imagePublicId) {
          await cloudinary.uploader.destroy(blog.imagePublicId);
        }
        imagePath = req.file.path;
        imagePublicId = req.file.filename;
      }

      // 3. Create in the new collection
      const NewModel = getModelByCategory(newCategory);
      const migratedBlog = await NewModel.create({
        _id: blog._id, // preserve ID
        title: req.body.title,
        description: req.body.description,
        category: newCategory,
        author: blog.author,
        authorId: blog.authorId,
        authorName: blog.authorName,
        authorRole: blog.authorRole,
        status: targetStatus,
        rejectionReason: !isAdmin && targetStatus === "pending" ? "" : blog.rejectionReason,
        readTime: req.body.readTime,
        expertTip: req.body.expertTip,
        content: req.body.content,
        takeaways: req.body.takeaways
          ? req.body.takeaways.split("\n").filter((item) => item.trim() !== "")
          : [],
        image: imagePath,
        imagePublicId: imagePublicId,
        videoUrl: req.body.videoUrl || blog.videoUrl || "",
        views: blog.views, // preserve views
        likesCount: blog.likesCount, // preserve likes
        likes: blog.likes,
        saves: blog.saves,
      });

      // Update User published list category reference
      if (blog.authorId) {
        let authorModel = User;
        if (blog.authorRole === "admin") {
          authorModel = Admin;
        }
        await authorModel.updateOne(
          { _id: blog.authorId, "publishedBlogs.blogId": blog._id },
          { $set: { "publishedBlogs.$.category": newCategory } }
        );
      }

      return res.json(migratedBlog);
    }

    // Otherwise, update in place
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }
      blog.image = req.file.path;
      blog.imagePublicId = req.file.filename;
    }

    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.readTime = req.body.readTime;
    blog.expertTip = req.body.expertTip;
    blog.content = req.body.content;
    blog.videoUrl = req.body.videoUrl || "";
    blog.status = targetStatus;
    if (!isAdmin && targetStatus === "pending") {
      blog.rejectionReason = "";
    }
    blog.takeaways = req.body.takeaways
      ? req.body.takeaways.split("\n").filter((item) => item.trim() !== "")
      : [];

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Blog (enforce restrictions on approved or unauthorized deletion)
export const deleteBlog = async (req, res) => {
  try {
    const models = getAllModels();
    for (const Model of models) {
      const blog = await Model.findById(req.params.id);
      if (blog) {
        // Enforce authorization
        const isAuthor = req.user && blog.authorId && blog.authorId.toString() === req.user._id.toString();
        const isAdmin = req.user && req.user.role === "admin";
        if (!isAuthor && !isAdmin) {
          return res.status(403).json({
            message: "Not authorized to delete this blog.",
          });
        }

        // Approved blogs cannot be deleted by users
        if (!isAdmin && blog.status === "approved") {
          return res.status(403).json({
            message: "Approved blogs cannot be deleted.",
          });
        }

        // Delete image from Cloudinary
        if (blog.imagePublicId) {
          await cloudinary.uploader.destroy(blog.imagePublicId);
        }
        
        // Delete blog from MongoDB
        await blog.deleteOne();

        // Pull from user's publishedBlogs
        if (blog.authorId) {
          let authorModel = User;
          if (blog.authorRole === "admin") {
            authorModel = Admin;
          }
          await authorModel.findByIdAndUpdate(blog.authorId, {
            $pull: { publishedBlogs: { blogId: blog._id } }
          });
        }

        return res.json({
          message: "Blog deleted successfully",
        });
      }
    }

    res.status(404).json({
      message: "Blog not found",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// INCREMENT views (search all collections)
export const incrementViews = async (req, res) => {
  try {
    const models = getAllModels();
    for (const Model of models) {
      const blog = await Model.findByIdAndUpdate(
        req.params.id,
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        }
      );

      if (blog) {
        return res.json({
          views: blog.views,
        });
      }
    }

    res.status(404).json({
      message: "Blog not found",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOGGLE LIKE
export const toggleLikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const models = getAllModels();
    let blog = null;
    for (const Model of models) {
      blog = await Model.findById(blogId);
      if (blog) break;
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLikedIndex = blog.likes.indexOf(userId);
    let user = await User.findById(userId);
    let userModel = User;

    if (!user) {
      user = await Admin.findById(userId);
      userModel = Admin;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let liked = false;
    if (alreadyLikedIndex > -1) {
      // Unlike
      blog.likes.splice(alreadyLikedIndex, 1);
      blog.likesCount = Math.max(0, blog.likesCount - 1);
      
      user.likedBlogs = (user.likedBlogs || []).filter(
        (item) => item.blogId.toString() !== blogId.toString()
      );
    } else {
      // Like
      blog.likes.push(userId);
      blog.likesCount = (blog.likesCount || 0) + 1;
      liked = true;

      if (!user.likedBlogs) user.likedBlogs = [];
      user.likedBlogs.push({ blogId: blog._id, category: blog.category });
    }

    await blog.save();
    await user.save();

    res.status(200).json({
      liked,
      likesCount: blog.likesCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE SAVE (Bookmark)
export const toggleSaveBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const models = getAllModels();
    let blog = null;
    for (const Model of models) {
      blog = await Model.findById(blogId);
      if (blog) break;
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let user = await User.findById(userId);
    let userModel = User;

    if (!user) {
      user = await Admin.findById(userId);
      userModel = Admin;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySavedIndex = (user.savedBlogs || []).findIndex(
      (item) => item.blogId.toString() === blogId.toString()
    );

    let saved = false;
    if (alreadySavedIndex > -1) {
      // Unsave
      user.savedBlogs.splice(alreadySavedIndex, 1);
      
      const userIndex = blog.saves.indexOf(userId);
      if (userIndex > -1) {
        blog.saves.splice(userIndex, 1);
      }
    } else {
      // Save
      if (!user.savedBlogs) user.savedBlogs = [];
      user.savedBlogs.push({ blogId: blog._id, category: blog.category });
      blog.saves.push(userId);
      saved = true;
    }

    await user.save();
    await blog.save();

    res.status(200).json({
      saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER PROFILE DATA (statistics, My Blogs, Liked, Saved)
export const getUserProfileData = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);
    let isAdmin = false;

    if (!user) {
      user = await Admin.findById(userId);
      if (user) {
        isAdmin = true;
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user's own published blogs
    const models = getAllModels();
    const results = await Promise.all(
      models.map((Model) => Model.find({ authorId: userId }))
    );
    const myBlogs = results.flat().sort((a, b) => b.createdAt - a.createdAt);

    // Stats
    const totalBlogs = myBlogs.length;
    const approvedBlogs = myBlogs.filter((b) => b.status === "approved").length;
    const pendingBlogs = myBlogs.filter((b) => b.status === "pending").length;
    const rejectedBlogs = myBlogs.filter((b) => b.status === "rejected").length;
    const totalViews = myBlogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const totalLikesReceived = myBlogs.reduce((sum, b) => sum + (b.likesCount || 0), 0);

    // Fetch details of Liked Blogs (only approved)
    const likedList = [];
    const likedBlogsArray = user.likedBlogs || [];
    for (const item of likedBlogsArray) {
      const Model = getModelByCategory(item.category);
      const b = await Model.findById(item.blogId);
      if (b && b.status === "approved") {
        likedList.push(b);
      }
    }

    // Fetch details of Saved Blogs (only approved)
    const savedList = [];
    const savedBlogsArray = user.savedBlogs || [];
    for (const item of savedBlogsArray) {
      const Model = getModelByCategory(item.category);
      const b = await Model.findById(item.blogId);
      if (b && b.status === "approved") {
        savedList.push(b);
      }
    }

    res.status(200).json({
      profile: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        role: isAdmin ? "admin" : "user",
      },
      stats: {
        totalBlogs,
        approvedBlogs,
        pendingBlogs,
        rejectedBlogs,
        totalViews,
        totalLikesReceived,
      },
      myBlogs,
      likedBlogs: likedList,
      savedBlogs: savedList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PUBLIC AUTHOR PROFILE
export const getAuthorProfileData = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    let user = await User.findById(authorId);

    if (!user) {
      user = await Admin.findById(authorId);
    }

    if (!user) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Public only sees approved articles
    const models = getAllModels();
    const results = await Promise.all(
      models.map((Model) => Model.find({ authorId, status: "approved" }))
    );
    const blogs = results.flat().sort((a, b) => b.createdAt - a.createdAt);

    // Public stats
    const totalArticles = blogs.length;
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const totalLikesReceived = blogs.reduce((sum, b) => sum + (b.likesCount || 0), 0);

    res.status(200).json({
      author: {
        name: user.name,
        createdAt: user.createdAt,
      },
      stats: {
        totalArticles,
        totalViews,
        totalLikesReceived,
      },
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMUNITY BLOGS FOR ADMIN
export const getAdminCommunityBlogs = async (req, res) => {
  try {
    const models = getAllModels();
    const results = await Promise.all(models.map((Model) => Model.find({ authorRole: "user" })));
    const allBlogs = results.flat().sort((a, b) => b.createdAt - a.createdAt);

    const pending = allBlogs.filter((b) => b.status === "pending");
    const approved = allBlogs.filter((b) => b.status === "approved");
    const rejected = allBlogs.filter((b) => b.status === "rejected");

    res.status(200).json({
      pending,
      approved,
      rejected,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE COMMUNITY BLOG
export const approveCommunityBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const models = getAllModels();
    let blog = null;

    for (const Model of models) {
      blog = await Model.findById(blogId);
      if (blog) break;
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = "approved";
    blog.approvedAt = new Date();
    blog.approvedBy = req.user._id;
    blog.rejectionReason = "";

    await blog.save();
    res.status(200).json({ message: "Blog approved successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT COMMUNITY BLOG
export const rejectCommunityBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { rejectionReason } = req.body;

    const models = getAllModels();
    let blog = null;

    for (const Model of models) {
      blog = await Model.findById(blogId);
      if (blog) break;
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = "rejected";
    blog.rejectionReason = rejectionReason || "Please improve the content quality.";

    await blog.save();
    res.status(200).json({ message: "Blog rejected successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};