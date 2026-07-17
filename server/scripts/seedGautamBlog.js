import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { WorkoutBlog } from "../models/Blog.js";
import connectDB from "../config/db.js";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const GAUTAM_IMAGE_PATH = path.resolve(__dirname, "../../client/src/assets/images/gautam.png");

async function seedGautam() {
  try {
    await connectDB();
    console.log("Connected to MongoDB database.");

    // Check if the blog already exists
    const title = "Build a Stronger, Healthier You.";
    const exists = await WorkoutBlog.findOne({ title });
    if (exists) {
      console.log(`➡️ Gautam's blog already exists: "${title}"`);
      process.exit(0);
    }

    console.log("Uploading Gautam's image to Cloudinary...");
    const uploadResult = await cloudinary.uploader.upload(GAUTAM_IMAGE_PATH, {
      folder: "fitness_blogs",
    });

    console.log("Inserting Gautam's blog into WorkoutBlog collection...");
    const blog = await WorkoutBlog.create({
      title: title,
      description: "Learn practical, science-backed strategies for training, nutrition, fat loss, recovery, and sustainable lifestyle transformation. Discover the roadmap to achieving peak performance.",
      category: "Workout",
      author: "Gautam Jani",
      readTime: "8 min read",
      expertTip: "Consistency beats intensity every single time. Design dynamic protocols that align with your lifestyle.",
      takeaways: [
        "Focus on progressive overload for sustainable strength growth.",
        "Macronutrient splits should be customized based on activity levels.",
        "Active recovery stimulates blood flow and accelerates tissue healing."
      ],
      content: `
        <h2>Introduction</h2>
        <p>Fitness is not a temporary program; it is a lifetime behavior. Over the years guiding thousands of people, we have seen that the most complex sports science is useless if it does not fit into your daily routine. Here is how to construct a sustainable strategy.</p>
        
        <h2>1. Progressive Overload</h2>
        <p>Your muscles adapt to stress. To keep growing stronger, you must increase the tension on your muscle fibers over time. Focus on lifting heavier weights, doing more repetitions, or reducing rest times between sets.</p>

        <h2>2. Nutrition Architecture</h2>
        <p>You cannot out-train a poor diet. High protein intake supports recovery, while carbohydrates fuel intense workouts. Customize your macronutrient distributions based on your daily training output.</p>

        <h2>Conclusion</h2>
        <p>Start small, track your sessions, and prioritize evidence-based protocols over fleeting trends.</p>
      `,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      status: "approved",
      approvedAt: new Date(),
    });

    console.log(`✅ Success! Published blog with ID: ${blog._id}`);
  } catch (error) {
    console.error("❌ Seeding Gautam's blog failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seedGautam();
