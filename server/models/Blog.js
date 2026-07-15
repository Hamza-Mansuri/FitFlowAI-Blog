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

// Compile models targeting 5 separate collections (folders)
export const WorkoutBlog = mongoose.model("WorkoutBlog", blogSchema, "workouts");
export const NutritionBlog = mongoose.model("NutritionBlog", blogSchema, "nutritions");
export const RecoveryBlog = mongoose.model("RecoveryBlog", blogSchema, "recoverys");
export const HealthBlog = mongoose.model("HealthBlog", blogSchema, "healths");
export const LifestyleBlog = mongoose.model("LifestyleBlog", blogSchema, "lifestyles");

export const getModelByCategory = (category) => {
  const cat = (category || "").toLowerCase().trim();
  if (cat === "workout") return WorkoutBlog;
  if (cat === "nutrition") return NutritionBlog;
  if (cat === "recovery") return RecoveryBlog;
  if (cat === "health") return HealthBlog;
  if (cat === "lifestyle") return LifestyleBlog;
  return WorkoutBlog; // default fallback
};

export const getAllModels = () => {
  return [WorkoutBlog, NutritionBlog, RecoveryBlog, HealthBlog, LifestyleBlog];
};

export default WorkoutBlog;