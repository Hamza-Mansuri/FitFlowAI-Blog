import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    default: "Hamza Mansuri",
  },

  image: {
    type: String,
    required: true,
  },

  imagePublicId: {
    type: String,
    required: true,
  },

  readTime: {
    type: String,
    required: true,
  },

  views: {
    type: Number,
    default: 0,
  },

  expertTip: {
    type: String,
  },

  takeaways: {
    type: [String],
  },
},
{
  timestamps: true,
});

export default mongoose.model("Blog", blogSchema);