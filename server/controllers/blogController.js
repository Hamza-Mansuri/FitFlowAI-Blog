import { getModelByCategory, getAllModels } from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

// GET all blogs from all 5 collections (folders)
export const getBlogs = async (req, res) => {
  try {
    const models = getAllModels();
    const results = await Promise.all(models.map(Model => Model.find()));
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
    
    const blog = await Model.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      readTime: req.body.readTime,
      expertTip: req.body.expertTip,
      content: req.body.content,
      takeaways: req.body.takeaways
        ? req.body.takeaways.split("\n").filter((item) => item.trim() !== "")
        : [],
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

// GET Single Blog By ID (search all 5 collections)
export const getBlogById = async (req, res) => {
  try {
    const models = getAllModels();
    for (const Model of models) {
      const blog = await Model.findById(req.params.id);
      if (blog) {
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

// UPDATE Blog (support collection migration if category changes)
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

    const newCategory = req.body.category;
    
    // If the category changed, migrate to the new collection
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
        author: req.body.author,
        readTime: req.body.readTime,
        expertTip: req.body.expertTip,
        content: req.body.content,
        takeaways: req.body.takeaways
          ? req.body.takeaways.split("\n").filter((item) => item.trim() !== "")
          : [],
        image: imagePath,
        imagePublicId: imagePublicId,
        views: blog.views, // preserve view count
      });

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
    blog.author = req.body.author;
    blog.readTime = req.body.readTime;
    blog.expertTip = req.body.expertTip;
    blog.content = req.body.content;
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

// DELETE Blog (search all collections)
export const deleteBlog = async (req, res) => {
  try {
    const models = getAllModels();
    for (const Model of models) {
      const blog = await Model.findById(req.params.id);
      if (blog) {
        // Delete image from Cloudinary (only if it exists)
        if (blog.imagePublicId) {
          await cloudinary.uploader.destroy(blog.imagePublicId);
        }
        // Delete blog from MongoDB
        await blog.deleteOne();

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