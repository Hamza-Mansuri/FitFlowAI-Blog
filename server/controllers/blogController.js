import Blog from "../models/Blog.js";

import cloudinary from "../config/cloudinary.js";

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE a blog
export const createBlog = async (req, res) => {
  try {


    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      readTime: req.body.readTime,
      expertTip: req.body.expertTip,

      content: req.body.content,

      takeaways: req.body.takeaways
        .split("\n")
        .filter((item) => item.trim() !== ""),

      // Cloudinary URL
      image: req.file?.path || "",
      imagePublicId: req.file?.filename || "",
    });

    res.status(201).json(blog);

    
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET Single Blog By ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }

      blog.image = req.file.path;
      blog.imagePublicId = req.file.filename;
    }

    // Update other fields
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.category = req.body.category;
    blog.author = req.body.author;
    blog.readTime = req.body.readTime;
    blog.expertTip = req.body.expertTip;

    blog.content = req.body.content;

    blog.takeaways = req.body.takeaways
      .split("\n")
      .filter((item) => item.trim() !== "");

    await blog.save();

    res.json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Delete image from Cloudinary (only if it exists)
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // Delete blog from MongoDB
    await blog.deleteOne();

    res.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const incrementViews = async (req, res) => {
  try {

    const blog = await Blog.findByIdAndUpdate(
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

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json({
      views: blog.views,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};