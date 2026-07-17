import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
import { getModelByCategory } from "../models/Blog.js";
import connectDB from "../config/db.js";
import "dotenv/config";

// Setup ES __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = path.resolve(__dirname, "../../client/src/assets/images");

const seedUsers = [
  { email: "user1@gmail.com", password: "user1123", name: "Sarah Connor" },
  { email: "user2@gmail.com", password: "user2123", name: "David Miller" },
  { email: "user3@gmail.com", password: "user3123", name: "Emma Watson" }
];

const blogTemplates = [
  // Sarah Connor (User 1) - 10 Blogs (2 per category)
  {
    authorEmail: "user1@gmail.com",
    category: "Workout",
    title: "10-Minute High-Intensity Core Shredder Workout",
    description: "Get a deep core burn in just ten minutes with this bodyweight HIIT routine designed to build definition and functional core strength.",
    readTime: "4 min read",
    expertTip: "Focus on exhaling completely at the peak of each contraction to fully engage the transverse abdominis.",
    takeaways: ["No equipment needed, do it anywhere.", "Keep your lower back flat on the floor.", "Complete 3 rounds of the sequence."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Workout",
    title: "The Ultimate Kettlebell Circuit for Functional Power",
    description: "Build full-body explosion and coordination with this simple five-exercise kettlebell flow circuit.",
    readTime: "6 min read",
    expertTip: "Hinge at your hips rather than squatting when performing kettlebell swings.",
    takeaways: ["Increases cardiovascular and muscle endurance.", "Engages the entire posterior chain.", "Focus on core tightness throughout."],
    status: "pending"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Nutrition",
    title: "Meal Prepping for Beginners: Batch Cooking Made Simple",
    description: "Struggling to eat healthy during busy workweeks? Learn the basics of grocery planning and batch prepping.",
    readTime: "5 min read",
    expertTip: "Prep your proteins and grains on Sunday, and chop vegetables mid-week to keep them crisp.",
    takeaways: ["Saves time and reduces takeout spending.", "Keeps your portions and macronutrients tracked.", "Invest in high-quality airtight glass containers."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Nutrition",
    title: "Hydration and Electrolytes: The Forgotten Pillar of Performance",
    description: "Water alone isn't enough for optimal performance. Learn the science of sodium, potassium, and magnesium ratios.",
    readTime: "5 min read",
    expertTip: "Drink 500ml of water with a pinch of sea salt immediately upon waking to kickstart hydration.",
    takeaways: ["Electrolyte balance prevents muscle cramping.", "Improves cognitive function and focus during workouts.", "Monitor urine color to assess hydration level."],
    status: "rejected",
    rejectionReason: "Add more scientific sources supporting electrolyte ratios."
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Recovery",
    title: "Foam Rolling 101: Relieve Tight IT Bands and Sore Calves",
    description: "Reduce muscle soreness and accelerate recovery using simple self-myofascial release protocols.",
    readTime: "5 min read",
    expertTip: "Never roll directly over joints or bones. Focus purely on the soft tissue of the muscle belly.",
    takeaways: ["Spend 1-2 minutes per tight muscle group.", "Breathe deeply to relax the nervous system.", "Excellent as a post-workout recovery routine."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Recovery",
    title: "Contrast Bath Therapy for Athletes: Hot and Cold Protocols",
    description: "Accelerate blood flow and clear metabolic waste with hot and cold water immersion sequences.",
    readTime: "6 min read",
    expertTip: "Always finish contrast cycles on cold to trigger vasoconstriction and decrease inflammation.",
    takeaways: ["Alternating temperatures creates a pump effect.", "Reduces DOMS (Delayed Onset Muscle Soreness).", "Maintain a 3:1 hot-to-cold time ratio."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Health",
    title: "The Silent Killer: How Chronic Stress Affects Gut Health",
    description: "Explore the gut-brain connection and understand how mental strain translates to inflammation and digestive issues.",
    readTime: "7 min read",
    expertTip: "Incorporate 5 minutes of box breathing before your main meals to transition to a parasympathetic state.",
    takeaways: ["Stress alters gut microbiome diversity.", "Impairs digestive enzyme production.", "Mindfulness techniques directly improve bloating."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Health",
    title: "Longevity Science: Key Biometrics to Track After 30",
    description: "Focus on blood markers, resting heart rate, and VO2 max to optimize your healthspan.",
    readTime: "8 min read",
    expertTip: "Track your Heart Rate Variability (HRV) as a primary metric of autonomic nervous system health.",
    takeaways: ["Assess fasting insulin and HbA1c levels annually.", "VO2 max is the strongest predictor of longevity.", "Strengthen grip strength as a health indicator."],
    status: "pending"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Lifestyle",
    title: "Building Habit Loops: How to Stick to Your Routine",
    description: "Unlock consistency by leveraging the Cue, Craving, Response, and Reward habit loop structure.",
    readTime: "5 min read",
    expertTip: "Use 'habit stacking' by anchoring your new habit immediately after an existing daily routine.",
    takeaways: ["Keep cues visual and highly visible.", "Make the response as frictionless as possible.", "Celebrate small wins to solidify neural pathways."],
    status: "approved"
  },
  {
    authorEmail: "user1@gmail.com",
    category: "Lifestyle",
    title: "Designing the Perfect Screen-Free Morning Routine",
    description: "Stop checking emails in bed. Build a morning habit structure that sets up a focused and productive day.",
    readTime: "5 min read",
    expertTip: "Delay looking at screens for the first 30 minutes. Focus on light hydration, stretching, and writing instead.",
    takeaways: ["Reduces early morning cortisol spikes.", "Boosts focus and long-term attention span.", "Improves overall morning positivity."],
    status: "approved"
  },

  // David Miller (User 2) - 10 Blogs
  {
    authorEmail: "user2@gmail.com",
    category: "Workout",
    title: "The Ultimate Guide to Bodyweight Pull-Ups",
    description: "Can't perform a single pull-up? Here is a step-by-step progression guide utilizing negatives and bands.",
    readTime: "6 min read",
    expertTip: "Think about driving your elbows down to your pockets, not pulling your chest up to the bar.",
    takeaways: ["Develops massive upper-back strength.", "Use band resistance to build volume.", "Ensure a dead-hang position at the bottom."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Workout",
    title: "The Science of Hypertrophy: Rep Ranges and Intensity",
    description: "Understanding mechanical tension, metabolic stress, and muscle damage variables in training.",
    readTime: "7 min read",
    expertTip: "Take your working sets within 1-2 repetitions of muscular failure for optimal growth stimulus.",
    takeaways: ["Hypertrophy occurs across various rep ranges.", "Ensure weekly training volume increases over time.", "Prioritize compounds over isolation lifts."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Nutrition",
    title: "Protein Powders: Whey Isolate vs. Plant-Based Blends",
    description: "An evidence-based comparison of absorption rates, amino acid profiles, and digestibility.",
    readTime: "6 min read",
    expertTip: "Verify that your plant protein contains a blend (e.g., Pea & Rice) to guarantee a complete amino profile.",
    takeaways: ["Whey isolate contains higher leucine content.", "Plant proteins are easier on lactose-sensitive stomachs.", "Timing matters less than total daily protein intake."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Nutrition",
    title: "Intermittent Fasting: Weight Loss Miracle or Fad?",
    description: "A look at the science behind calorie restriction, insulin sensitivity, and autophagy benefits.",
    readTime: "6 min read",
    expertTip: "Fast for simple calorie control, but do not sacrifice nutrient density during your eating window.",
    takeaways: ["A 16:8 window is the most sustainable protocol.", "Fasting does not beat calorie-matched eating.", "Keeps breakfast schedules highly simplified."],
    status: "pending"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Recovery",
    title: "The Sleep Guide: How to Achieve 90% Deep Sleep Quality",
    description: "Understand circadian rhythms, temperature regulation, and evening supplement protocols.",
    readTime: "6 min read",
    expertTip: "Block all blue light from electronic displays 2 hours before sleeping to stimulate melatonin production.",
    takeaways: ["Maintain a bedroom temperature of 18-20°C.", "Stick to a consistent wake-up time daily.", "Avoid heavy meals and caffeine late in the day."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Recovery",
    title: "Active Recovery Days: Walking, Swimming, and Stretching",
    description: "Why laying on the couch all day is actually slowing down your physical recovery rate.",
    readTime: "5 min read",
    expertTip: "Keep active recovery workouts strictly below Zone 2 intensity (conversational pace).",
    takeaways: ["Light movement promotes blood circulation.", "Flushes out lactic acid and metabolic waste.", "Provides a mental break from intense lifting."],
    status: "rejected",
    rejectionReason: "Please write a more detailed section on stretching routines."
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Health",
    title: "Sunlight and Health: Optimizing Vitamin D Synthesis",
    description: "Learn how solar angle, skin tone, and duration impact your body's immune and hormonal balance.",
    readTime: "6 min read",
    expertTip: "Get 10-15 minutes of direct sunlight in your eyes immediately after waking to regulate cortisol.",
    takeaways: ["Improves circadian rhythm sleep cycles.", "Crucial for bone density and calcium absorption.", "Supplement during winter months with D3 + K2."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Health",
    title: "The Link Between Cardiovascular Health and Grip Strength",
    description: "Why your forearm power might be an indicator of underlying heart wellness and lifespan metrics.",
    readTime: "5 min read",
    expertTip: "Incorporate dead hangs and farmer carries into your weekly training to target grip.",
    takeaways: ["Strong grip correlates with lower stroke risks.", "Improves workout capabilities in major movements.", "A simple, cheap metric to monitor yearly health."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Lifestyle",
    title: "Digital Minimalism: Regaining Focus in a Hyperconnected World",
    description: "Implement simple screen boundaries, notifications cleanup, and dopamine detox intervals.",
    readTime: "7 min read",
    expertTip: "Turn your smartphone screen to grayscale to reduce visual attraction and screen time.",
    takeaways: ["Reduces daily anxiety and attention fatigue.", "Increases productive reading and thinking hours.", "Allows deeper presence during family time."],
    status: "approved"
  },
  {
    authorEmail: "user2@gmail.com",
    category: "Lifestyle",
    title: "The Power of journaling: Clarify Your Goals and Mindset",
    description: "How sitting with a notebook for five minutes every night can optimize your decision making.",
    readTime: "5 min read",
    expertTip: "Use simple prompts like: What went well today? What did I learn? to prevent writer's block.",
    takeaways: ["Reduces brain fog and mental load.", "Tracks progress in physical and emotional aspects.", "Encourages daily gratitude and focus."],
    status: "approved"
  },

  // Emma Watson (User 3) - 10 Blogs
  {
    authorEmail: "user3@gmail.com",
    category: "Workout",
    title: "5 Exercises to Fix Anterior Pelvic Tilt Posture",
    description: "Fix back pain and weak glutes by correcting common seated posture imbalances.",
    readTime: "5 min read",
    expertTip: "Focus on stretching tight hip flexors while strengthening underactive glutes and hamstrings.",
    takeaways: ["Fixes the 'fake gut' posture appearance.", "Incorporate glute bridges and planks.", "Stand and stretch every 60 minutes of sitting."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Workout",
    title: "A Female Lifter's Guide to Building Strength",
    description: "Debunking the myth that lifting heavy weights will make women look bulky or masculine.",
    readTime: "6 min read",
    expertTip: "Focus on compound movements like squats and deadlifts to build dense, functional muscle.",
    takeaways: ["Lifting weights burns more fat over time.", "Increases bone density and prevents osteoporosis.", "Builds strong athletic curves naturally."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Nutrition",
    title: "Vegetarian Diet Plans: Meeting Your Daily Macro Goals",
    description: "A complete guide to sourcing complete plant proteins, iron, and B12 on a meat-free plan.",
    readTime: "6 min read",
    expertTip: "Incorporate lentils, Greek yogurt, and eggs to secure high protein ratios without soy over-reliance.",
    takeaways: ["Focus on amino-acid pairing in meals.", "Monitor iron levels with blood tests yearly.", "Vegetarians can build muscle just as effectively."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Nutrition",
    title: "The Ultimate Post-Workout Shake Recipe",
    description: "Fuel muscle protein synthesis and replenish glycogen stores immediately following training.",
    readTime: "4 min read",
    expertTip: "Blend whey protein, a banana, oats, and a pinch of salt for the perfect post-workout fuel.",
    takeaways: ["Banana provides fast-digesting carbohydrates.", "Protein fuels repair of micro-tears.", "Hydrates and replaces lost trace minerals."],
    status: "rejected",
    rejectionReason: "Add options for dairy-free and gluten-free variations."
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Recovery",
    title: "Yoga for Athletes: Enhance Mobility and Prevent Injuries",
    description: "Integrate dynamic Vinyasa yoga sequences to loosen up tight hamstrings and hips.",
    readTime: "6 min read",
    expertTip: "Synchronize your breathing with every pose transition to activate the parasympathetic system.",
    takeaways: ["Improves body awareness and balance.", "Stretches underutilized stabilizer muscles.", "Provides great mental relaxation."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Recovery",
    title: "The Power of Deep Breathing: 3 Calming Techniques",
    description: "Master Box Breathing, 4-7-8, and Alternate Nostril breathing to settle your nervous system.",
    readTime: "5 min read",
    expertTip: "Incorporate 4-7-8 breathing right before bed to calm racing thoughts and prepare for sleep.",
    takeaways: ["Decreases heart rate and blood pressure.", "Lowers cortisol levels immediately.", "Increases blood oxygen saturation."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Health",
    title: "Blue Light Filters: Protecting Your Vision and Melatonin",
    description: "How screens are ruining your eye health and disrupting sleep, and how to protect yourself.",
    readTime: "5 min read",
    expertTip: "Enable amber-tinted night shift mode on all your devices permanently to reduce eye fatigue.",
    takeaways: ["Reduces strain and dry eye symptoms.", "Keeps natural sleep cycles balanced.", "Invest in computer reading glasses if needed."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Health",
    title: "Why HIIT Workouts Might Be Harming Your Thyroid",
    description: "How excessive high-intensity workouts without proper recovery can lead to hormonal fatigue.",
    readTime: "6 min read",
    expertTip: "Limit true HIIT training to no more than 2-3 sessions per week to prevent adrenal strain.",
    takeaways: ["Excessive cortisol suppresses thyroid hormones.", "Listen to energy indicators and take breaks.", "Balance intensity with low-impact cardio."],
    status: "pending"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Lifestyle",
    title: "Setting Work-Life Boundaries for Remote Workers",
    description: "Stop working from your couch. Learn to build physical and digital boundaries for productivity.",
    readTime: "6 min read",
    expertTip: "Establish a dedicated workspace that you physically leave when your shift ends.",
    takeaways: ["Separates work stress from relaxation space.", "Helps prevent burnout and work creep.", "Maintains focus during scheduled work hours."],
    status: "approved"
  },
  {
    authorEmail: "user3@gmail.com",
    category: "Lifestyle",
    title: "The Art of Saying No: Protecting Your Time and Focus",
    description: "Stop agreeing to every request. Learn to politely decline tasks that drain your creative energy.",
    readTime: "5 min read",
    expertTip: "Use the phrase 'I cannot commit to this right now' to say no without sounding defensive.",
    takeaways: ["Saying no to others is saying yes to your goals.", "Prevents over-commitment and panic.", "Maintains high quality in your primary focus areas."],
    status: "approved"
  }
];

const seed = async () => {
  try {
    await connectDB();

    console.log("👥 Checking users...");
    const usersMap = {};

    for (const u of seedUsers) {
      let user = await User.findOne({ email: u.email });
      if (!user) {
        console.log(`➕ Creating user: ${u.email}...`);
        const hashedPassword = await bcrypt.hash(u.password, 10);
        user = await User.create({
          email: u.email,
          password: hashedPassword,
          name: u.name,
          role: "user"
        });
      } else {
        console.log(`➡️ User already exists: ${u.email}`);
      }
      usersMap[u.email] = user;
    }

    // Read images from assets directories
    console.log("📸 Reading local asset images...");
    const categoriesList = ["Workout", "Nutrition", "Recovery", "Health", "Lifestyle"];
    const imageFiles = {};

    for (const cat of categoriesList) {
      const folderName = cat.toLowerCase();
      const folderPath = path.join(IMAGES_DIR, folderName);
      try {
        const files = fs.readdirSync(folderPath);
        // Filter by image extensions
        imageFiles[cat] = files
          .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
          .map(f => path.join(folderPath, f));
      } catch (err) {
        console.error(`Warning: could not read folder ${folderPath}`, err);
        imageFiles[cat] = [];
      }
    }

    console.log("✍️ Seeding community blogs...");
    let seededCount = 0;

    for (let i = 0; i < blogTemplates.length; i++) {
      const template = blogTemplates[i];
      const Model = getModelByCategory(template.category);

      const exists = await Model.findOne({ title: template.title });
      if (exists) {
        console.log(`➡️ Blog already exists: "${template.title}" (Skipped)`);
        continue;
      }

      const user = usersMap[template.authorEmail];
      if (!user) continue;

      // Select an image from the list of images for this category
      const list = imageFiles[template.category] || [];
      const imageIndex = i % (list.length || 1);
      const imagePath = list[imageIndex];

      let secureUrl = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"; // default fallback
      let publicId = "default_placeholder";

      if (imagePath) {
        try {
          console.log(`[${i + 1}/${blogTemplates.length}] ⏳ Uploading image for "${template.title}"...`);
          const result = await cloudinary.uploader.upload(imagePath, {
            folder: "fitness_blogs"
          });
          secureUrl = result.secure_url;
          publicId = result.public_id;
        } catch (err) {
          console.error(`Failed to upload ${imagePath} to Cloudinary`, err);
        }
      }

      const createdAt = new Date(Date.now() - i * 30 * 60 * 1000); // spread dates
      
      const blog = await Model.create({
        title: template.title,
        description: template.description,
        content: `
          <h2>Overview</h2>
          <p>${template.description}</p>
          <h2>Key Concepts</h2>
          <p>Writing detailed paragraphs about ${template.category.toLowerCase()} guidelines. Sourcing expert guidelines helps improve health routines.</p>
          <h3>Recommendations</h3>
          <ul>
            <li>Maintain consistency.</li>
            <li>Drink plenty of water.</li>
            <li>Rest appropriately.</li>
          </ul>
        `,
        category: template.category,
        author: user.name,
        authorId: user._id,
        authorName: user.name,
        authorRole: "user",
        status: template.status,
        rejectionReason: template.rejectionReason || "",
        readTime: template.readTime,
        expertTip: template.expertTip,
        takeaways: template.takeaways,
        image: secureUrl,
        imagePublicId: publicId,
        views: Math.floor(Math.random() * 120) + 10,
        likesCount: Math.floor(Math.random() * 25) + 2,
        createdAt: createdAt,
        updatedAt: createdAt
      });

      // Update User publishedBlogs reference
      await User.findByIdAndUpdate(user._id, {
        $push: { publishedBlogs: { blogId: blog._id, category: blog.category } }
      });

      console.log(`✅ Seeded blog: "${blog.title}" for ${user.email}`);
      seededCount++;
    }

    console.log(`🎉 Successfully seeded ${seededCount} community blogs!`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

import fs from "fs";
seed();
