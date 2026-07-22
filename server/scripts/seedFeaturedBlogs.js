import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { WorkoutBlog, NutritionBlog, RecoveryBlog, LifestyleBlog } from "../models/Blog.js";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv path relative to parent server folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = path.resolve(__dirname, "../../client/src/assets/images/featuredStoryImages");

const blogDetails = [
  {
    category: "Workout",
    Model: WorkoutBlog,
    imageFile: "pexels-scottwebb-28080.jpg",
    title: "The Science of Hypertrophy & Muscle Growth",
    description: "Deep dive into mechanical tension, muscle damage, and metabolic stress. Learn how to optimize your training protocols based on modern sports trials.",
    expertTip: "Focus on slow, controlled eccentric (lowering) phases. Time under tension is key to triggering deep muscular adaptations.",
    takeaways: [
      "Mechanical tension is the primary driver of muscle hypertrophy.",
      "Vary rep ranges between 6-12 reps for optimal metabolic stimulus.",
      "Ensure structural progressive overload in key compound movements."
    ],
    videoUrl: "https://res.cloudinary.com/wycpodzl/video/upload/v1784696252/6980389-uhd_2160_4096_30fps_bisj0z.mp4",
    content: `
      <h2>Introduction</h2>
      <p>Hypertrophy is the increase in muscle size, primarily driven by resistance training. While many focus on chasing sweat and fatigue, building muscle is an adaptation to specific mechanical forces. Understanding how to trigger these pathways is the key to faster progress.</p>
      <h2>1. Three Pillars of Growth</h2>
      <p>Muscle growth is triggered by three main pathways: Mechanical Tension (lifting heavy loads through full ROM), Muscle Damage (micro-tears caused by loading, especially eccentrics), and Metabolic Stress (the 'pump' feeling from high-rep contractions).</p>
      <h2>2. Optimizing Your Sets</h2>
      <p>Plan 10-20 working sets per muscle group per week. Ensure you train within 1-3 reps of muscular failure to recruit high-threshold motor units.</p>
    `
  },
  {
    category: "Nutrition",
    Model: NutritionBlog,
    imageFile: "pexels-cesar-o-neill-26650613-29259712.jpg",
    title: "Macronutrient Architecture: Fueling Peak Output",
    description: "Learn how to structure your daily protein, carbs, and fats to maximize recovery, cognitive performance, and lean muscle accumulation.",
    expertTip: "Distribute your protein intake evenly across 4-5 meals. 30-40g of high-quality protein per meal maximizes muscle protein synthesis.",
    takeaways: [
      "Protein forms the structural building blocks for recovery.",
      "Carbohydrates are essential to replenish glycogen and support intense output.",
      "Healthy fats regulate critical hormone balances and cellular health."
    ],
    videoUrl: "https://res.cloudinary.com/wycpodzl/video/upload/v1784696247/116342-707531391_medium_wt7gjt.mp4",
    content: `
      <h2>Introduction</h2>
      <p>You cannot out-train a poor diet. No matter how hard you lift, recovery and growth are dictated by the nutritional building blocks you supply. Structuring your macronutrient divisions correctly will unlock new levels of energy and performance.</p>
      <h2>1. Protein: The Recovery Foundation</h2>
      <p>Aim for 1.6 to 2.2 grams of protein per kilogram of bodyweight. Consuming protein post-workout initiates muscle repair and halts muscle breakdown.</p>
      <h2>2. Carbs and Fats</h2>
      <p>Carbohydrates are your primary fuel source for anaerobic exercise. Don't fear fats—they are critical for hormone synthesis and nutrient absorption.</p>
    `
  },
  {
    category: "Recovery",
    Model: RecoveryBlog,
    imageFile: "pexels-skylight-views-2151863365-35703189.jpg",
    title: "Active Recovery Protocols & Sleep Optimization",
    description: "How to optimize sleep hygiene and active rest periods to flush metabolites, restore nervous system balance, and return to training stronger.",
    expertTip: "Keep your bedroom cool (around 65°F / 18°C) and completely dark. Sleep quality directly impacts growth hormone release.",
    takeaways: [
      "Deep sleep is when the body releases the majority of its growth hormones.",
      "Active recovery (light walking/cycling) stimulates blood circulation to clear waste.",
      "Hydration and electrolyte replenishment are vital to prevent muscle soreness."
    ],
    videoUrl: "https://res.cloudinary.com/wycpodzl/video/upload/v1784696246/19523592-hd_1080_1920_30fps_egpzup.mp4",
    content: `
      <h2>Introduction</h2>
      <p>Many believe growth happens inside the gym. In reality, lifting weights breaks down muscle fibers; actual adaptation and rebuilding occur during rest. Optimizing your sleep and rest protocols is half the battle.</p>
      <h2>1. The Power of Deep Sleep</h2>
      <p>During stages 3 and 4 of NREM sleep, blood flow to muscles increases, tissue growth occurs, and cellular repair accelerates. Aim for 7-9 hours of consistent rest.</p>
      <h2>2. Active Recovery Benefits</h2>
      <p>Sitting on the couch isn't always the best recovery. Low-intensity movement gets blood flowing into damaged tissues, bringing oxygen and nutrients to speed healing.</p>
    `
  },
  {
    category: "Lifestyle",
    Model: LifestyleBlog,
    imageFile: "Spiritual Awakening Meditation.webp",
    title: "Mindset & Spiritual Awakening Meditation Guide",
    description: "Integrating mindfulness, meditation, and psychological resilience techniques into your fitness journey to build permanent life habits.",
    expertTip: "Start with just 5 minutes of focused breathing meditation every morning. Consistency builds neural pathways for stress tolerance.",
    takeaways: [
      "Meditation lowers cortisol levels, which helps prevent muscle breakdown.",
      "Mindfulness improves focus during challenging compound lifts.",
      "Resilience habits ensure you stick to your routines during high-stress periods."
    ],
    videoUrl: "https://res.cloudinary.com/wycpodzl/video/upload/v1784696244/5389088-uhd_2160_4096_30fps_ijuy0k.mp4",
    content: `
      <h2>Introduction</h2>
      <p>A transformation starts in the mind. Without mental clarity, stress management, and physical resilience, any fitness program will eventually fall flat. Combining physical training with mindfulness is the ultimate formula for longevity.</p>
      <h2>1. The Stress-Cortisol Connection</h2>
      <p>High stress releases cortisol, a catabolic hormone that breaks down muscle and increases abdominal fat storage. Meditation reverses this state, restoring autonomic balance.</p>
      <h2>2. Cultivating Daily Mindfulness</h2>
      <p>Use box breathing or focused meditation to anchor your mind, improve sleep entry, and prepare mentally for daily challenges.</p>
    `
  }
];

async function seedFeatured() {
  try {
    await connectDB();
    console.log("Connected to MongoDB.");

    // Find the Admin user (admin@gmail.com)
    const adminUser = await Admin.findOne({ email: "admin@gmail.com" });
    const authorId = adminUser ? adminUser._id : null;
    const authorName = adminUser ? adminUser.name : "Admin Coach";
    console.log(`Using admin author: ${authorName} (${authorId})`);

    // Remove existing blogs with the same titles to avoid duplicates
    for (const blog of blogDetails) {
      await blog.Model.deleteMany({ title: blog.title });
      console.log(`Cleared existing blogs titled: "${blog.title}"`);
    }

    for (let i = 0; i < blogDetails.length; i++) {
      const details = blogDetails[i];
      const localImagePath = path.join(IMAGES_DIR, details.imageFile);

      console.log(`Uploading cover image to Cloudinary: ${details.imageFile}...`);
      const uploadResult = await cloudinary.uploader.upload(localImagePath, {
        folder: "featured_stories",
      });

      console.log(`Creating blog post: "${details.title}"`);
      const newBlog = await details.Model.create({
        title: details.title,
        description: details.description,
        category: details.category,
        author: authorName,
        authorId: authorId,
        authorName: authorName,
        authorRole: "admin",
        status: "approved",
        readTime: `${5 + i} min read`,
        expertTip: details.expertTip,
        takeaways: details.takeaways,
        content: details.content,
        image: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        videoUrl: details.videoUrl,
        approvedAt: new Date(),
        approvedBy: authorId,
      });

      console.log(`➡️ Seeded "${details.title}" with ID: ${newBlog._id}`);
      
      // Link blog to admin profile
      if (adminUser) {
        await Admin.findByIdAndUpdate(authorId, {
          $push: { publishedBlogs: { blogId: newBlog._id, category: newBlog.category } }
        });
      }
    }

    console.log("🎉 Successfully seeded all 4 featured stories!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seedFeatured();
