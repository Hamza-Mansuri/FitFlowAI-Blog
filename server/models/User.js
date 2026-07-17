import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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

export default mongoose.model("User", userSchema);