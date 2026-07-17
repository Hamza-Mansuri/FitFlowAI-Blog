import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    likedBlogs: {
      type: [{
        blogId: { type: mongoose.Schema.Types.ObjectId },
        category: { type: String }
      }],
      default: []
    },

    savedBlogs: {
      type: [{
        blogId: { type: mongoose.Schema.Types.ObjectId },
        category: { type: String }
      }],
      default: []
    },

    publishedBlogs: {
      type: [{
        blogId: { type: mongoose.Schema.Types.ObjectId },
        category: { type: String }
      }],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);