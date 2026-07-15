import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
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

const categoryMapping = {
  workout: "Workout",
  nutrition: "Nutrition",
  recovery: "Recovery",
  health: "Health",
  lifestyle: "Lifestyle",
};

const blogTemplates = {
  // WORKOUT
  "bench_press.jpg": {
    title: "Mastering the Bench Press: Form, Execution, and Plateaus",
    description: "The bench press is the ultimate upper-body exercise. Learn the correct setup, common mistakes, and training techniques to break through your plateaus.",
    category: "Workout",
    author: "Hamza Mansuri",
    readTime: "6 min read",
    expertTip: "Focus on pulling your shoulder blades together and down before you lie back on the bench. This creates a solid foundation and protects your rotator cuffs.",
    takeaways: [
      "Keep your feet flat on the floor for maximum power transfer.",
      "Lower the bar to your mid-chest, not your neck.",
      "Practice progressive overload by increasing weight or reps gradually."
    ],
    content: `
      <h2>Introduction</h2>
      <p>The bench press is widely considered the gold standard for measuring upper body strength. However, it is also one of the most frequently performed exercises with improper form, leading to shoulder injuries and stalled progress. Whether you are a beginner or looking to break a plateau, mastering the mechanics is essential.</p>
      
      <h2>1. The Setup: Your Foundation</h2>
      <p>A good bench press begins long before you unrack the bar. Lie flat on the bench and position your eyes directly underneath the bar. Grip the bar slightly wider than shoulder-width. Pull your shoulder blades back and down, pressing them into the bench to create a stable chest position. Keep your feet flat on the floor, pushing down to engage your legs.</p>

      <h2>2. Unracking and Lowering the Bar</h2>
      <p>Straighten your arms to unrack the bar, moving it over your chest. Take a deep breath, brace your core, and lower the bar slowly. Control the descent until the bar touches your mid-chest. Avoid bouncing the bar off your chest, which reduces muscle engagement and increases injury risk.</p>

      <h2>3. The Press</h2>
      <p>Push the bar straight up with force, exhaling as you reach the top. Keep your elbows tucked at roughly a 45-degree angle to your body; letting them flare out puts excessive strain on your shoulders.</p>

      <h2>Conclusion</h2>
      <p>Be consistent and track your sessions. Focusing on proper execution will translate to safer lifts and consistent chest gains.</p>
    `
  },
  "deadlift.jpg": {
    title: "The Ultimate Guide to Deadlifting with Perfect Technique",
    description: "Build full-body strength and a powerful back. Learn how to deadlift safely without injuring your lower back.",
    category: "Workout",
    author: "Hamza Mansuri",
    readTime: "7 min read",
    expertTip: "Think of the deadlift as pushing the floor away with your feet, rather than pulling the bar up with your back.",
    takeaways: [
      "Always maintain a flat or neutral spine during the lift.",
      "Keep the bar as close to your shins and thighs as possible.",
      "Engage your lats by pulling your shoulders back before lifting."
    ],
    content: `
      <h2>Introduction</h2>
      <p>The deadlift is one of the few exercises that recruits almost every major muscle group in the body. While it is highly effective for building strength and posture, executing it incorrectly can lead to lower back issues. Let's break down the perfect form.</p>
      
      <h2>1. The Stance</h2>
      <p>Walk up to the bar with your feet hip-width apart. The bar should be over the middle of your feet, about an inch away from your shins. Bend at your hips and knees to grab the bar with a shoulder-width grip.</p>

      <h2>2. Bracing and Pulling</h2>
      <p>Before lifting, drop your hips, flatten your back, and pull the slack out of the bar. Squeeze your core and drive through your heels to stand up straight. Lock out your hips at the top without leaning back.</p>

      <h2>Conclusion</h2>
      <p>Practice with light weights to build the muscle memory of a straight spine before going heavy.</p>
    `
  },
  "squats.jpg": {
    title: "How to Squat Deeper: Secrets to Better Mobility and Leg Power",
    description: "The squat is the king of lower-body movements. Learn how to improve your hip mobility, squat lower, and target your quads and glutes.",
    category: "Workout",
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: "Improve ankle mobility by performing calves stretches. Tight ankles are the primary cause of shallow squats.",
    takeaways: [
      "Keep your chest upright and head in a neutral position.",
      "Squat until your thighs are at least parallel to the floor.",
      "Push your knees outward so they track in line with your toes."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Squatting is a fundamental human movement. If you want to build strong legs and a solid core, squats are mandatory. However, ankle and hip stiffness often prevent people from reaching full depth.</p>
      
      <h2>1. Perfect Positioning</h2>
      <p>Stand with feet slightly wider than shoulder-width, toes pointed slightly outward. Place the bar comfortably across your upper back. Rest your hands on the bar and pull it down to engage your upper back.</p>

      <h2>2. Going Deep</h2>
      <p>Initiate the movement by hinging at your hips and bending your knees. Lower yourself down as if sitting in a chair, keeping your weight centered over your mid-foot.</p>

      <h2>Conclusion</h2>
      <p>Prioritize depth and mobility over weight to get the full benefits of the barbell squat.</p>
    `
  },
  "running.jpg": {
    title: "Cardio vs. Lifting: Finding the Balance for Optimal Health",
    description: "Should you run or lift weights? Discover how to blend cardiovascular exercise and strength training for the ultimate fitness profile.",
    category: "Workout",
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: "To build muscle and stay fit, lift weights first, then do your cardio at the end of the session.",
    takeaways: [
      "Cardio improves heart health, endurance, and calorie burn.",
      "Lifting weights builds lean muscle, bone density, and boosts metabolism.",
      "A balanced routine includes both elements for total fitness."
    ],
    content: `
      <h2>Introduction</h2>
      <p>A common fitness debate is whether to focus on cardio or weight training. The truth is, both provide unique health benefits, and combining them correctly yields the best results.</p>
      
      <h2>1. The Power of Weights</h2>
      <p>Strength training builds muscle mass, which naturally increases your resting metabolic rate. It also strengthens joints and increases bone density as you age.</p>

      <h2>2. The Cardio Boost</h2>
      <p>Cardio improves lung capacity, reduces resting heart rate, and enhances recovery times by promoting blood flow throughout the body.</p>

      <h2>Conclusion</h2>
      <p>Combine 3 strength workouts with 2 cardio sessions weekly for a well-rounded physique.</p>
    `
  },

  // NUTRITION
  "healthy_food.jpg": {
    title: "10 Simple Habits for Cleaner, Evidence-Based Eating",
    description: "Ditch the crash diets. Discover ten easy, sustainable dietary habits to fuel your body and lose fat without hunger.",
    category: "Nutrition",
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: "Try the 80/20 rule: eat whole, nutrient-dense foods 80% of the time, and enjoy your favorite treats for the other 20%.",
    takeaways: [
      "Prioritize whole, single-ingredient foods.",
      "Increase fiber intake with colorful vegetables and fruits.",
      "Control portion sizes without obsessively counting calories."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Nutrition is the foundation of fitness. You cannot out-train a poor diet. Fortunately, eating healthy doesn't have to be complicated or boring. Adopting small, daily habits can yield life-changing benefits.</p>
      
      <h2>1. Focus on Whole Foods</h2>
      <p>Base your diet around whole, unprocessed foods like lean meats, fish, eggs, vegetables, fruits, nuts, seeds, and whole grains. These foods are packed with nutrients and keep you full longer.</p>

      <h2>2. Hydration is Key</h2>
      <p>Often, mild dehydration is mistaken for hunger. Drink water throughout the day, especially before meals, to stay hydrated and support digestion.</p>

      <h2>Conclusion</h2>
      <p>Start with one or two habits and build up. Consistency is what leads to sustainable results.</p>
    `
  },
  "protein_shake.jpg": {
    title: "Protein Timing: Myths, Facts, and Optimal Daily Intake",
    description: "Does the anabolic window really exist? Get the science-backed facts on how much protein you need and when to consume it.",
    category: "Nutrition",
    author: "Hamza Mansuri",
    readTime: "6 min read",
    expertTip: "Aim for 1.6 to 2.2 grams of protein per kilogram of body weight daily if you are active.",
    takeaways: [
      "Total daily protein intake matters much more than perfect timing.",
      "Distribute protein intake evenly across 3 to 5 meals.",
      "Post-workout protein helps repair muscles, but is not urgent within minutes."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Protein is the building block of muscles. However, timing and dosage remain topics of intense discussion. Let's separate the facts from the marketing hype.</p>
      
      <h2>1. The Anabolic Window</h2>
      <p>Research shows the 'anabolic window' is much wider than previously thought. Consuming protein within 2-3 hours post-workout is optimal, but not required in 30 minutes.</p>

      <h2>2. Sourcing Your Protein</h2>
      <p>Whey protein, lean meats, Greek yogurt, eggs, and tofu are excellent sources of high-quality protein containing essential amino acids.</p>

      <h2>Conclusion</h2>
      <p>Focus on hitting your total daily protein goal first, then worry about timing distributions.</p>
    `
  },

  // RECOVERY
  "stretching.jpg": {
    title: "Dynamic vs. Static Stretching: The Right Way to Stretch",
    description: "Stretching incorrectly before a workout can decrease strength. Learn when to stretch dynamically and when to hold static stretches.",
    category: "Recovery",
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: "Never perform static stretches on cold muscles before lifting. Use dynamic movements instead.",
    takeaways: [
      "Use dynamic stretching as part of your warm-up.",
      "Perform static stretching post-workout to relax muscles.",
      "Consistent stretching improves flexibility and relieves joint tension."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Stretching is essential for maintaining flexible joints and healthy muscles. However, the type of stretch you choose and when you perform it determines its effectiveness.</p>
      
      <h2>1. Warm Up with Dynamic Stretches</h2>
      <p>Dynamic stretches include active movements like leg swings, arm circles, and bodyweight lunges. These increase blood flow, warm up tissue, and prime the nervous system.</p>

      <h2>2. Cool Down with Static Stretches</h2>
      <p>Static stretches involve holding a stretch for 20-30 seconds. They relax the muscle fibers and are best suited for post-workout cool-downs.</p>

      <h2>Conclusion</h2>
      <p>Follow a structured routine: warm up dynamically, train hard, and stretch statically to recover.</p>
    `
  },
  "recovery.jpg": {
    title: "Active Recovery: How to Bounce Back Faster After Heavy Workouts",
    description: "Rest days don't mean sitting on the couch all day. Learn how light activity speeds up recovery and reduces muscle soreness.",
    category: "Recovery",
    author: "Hamza Mansuri",
    readTime: "4 min read",
    expertTip: "An active recovery session should keep your heart rate low, around 50-60% of your maximum heart rate.",
    takeaways: [
      "Active recovery increases blood circulation, flushing out waste products.",
      "Activities include walking, light cycling, yoga, and swimming.",
      "Keep intensity very low so you do not add stress to your body."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Recovery is where the magic happens. Your muscles grow and adapt when you rest, not during the actual training. Active recovery is a powerful technique to accelerate this process.</p>
      
      <h2>1. What is Active Recovery?</h2>
      <p>Active recovery involves performing low-intensity exercise. This stimulates blood flow, bringing oxygen and nutrients to sore muscle tissues without causing additional micro-tears.</p>

      <h2>Conclusion</h2>
      <p>Next time you have a rest day, go for a 30-minute walk or do a light yoga session to wake up feeling fresh.</p>
    `
  },

  // HEALTH
  "pexels-karola-g-4386467.jpg": {
    title: "Why Hydration is the Ultimate Performance Enhancer",
    description: "Even mild dehydration can drop your gym strength by 15%. Discover how much water you should drink for optimal health and performance.",
    category: "Health",
    author: "Hamza Mansuri",
    readTime: "4 min read",
    expertTip: "Check your urine color: it should be pale yellow. Dark urine is a clear sign of dehydration.",
    takeaways: [
      "Water regulates body temperature and lubricates joints.",
      "Dehydration reduces focus, endurance, and strength.",
      "Drink extra water with electrolytes during intense training sessions."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Hydration is the most overlooked aspect of physical performance. We can go weeks without food, but only days without water. Maintaining hydration ensures your body functions at its peak.</p>
      
      <h2>1. The Impact of Dehydration</h2>
      <p>When you sweat, you lose fluids and essential minerals (electrolytes). Losing just 2% of your body weight in fluids can lead to fatigue, muscle cramps, and reduced concentration.</p>

      <h2>Conclusion</h2>
      <p>Carry a water bottle and sip throughout the day. It's the cheapest health and strength booster available.</p>
    `
  },

  // LIFESTYLE
  "pexels-olly-863986.jpg": {
    title: "Mindset Shifts to Build Lifelong Consistency in Fitness",
    description: "Struggling to stay motivated? Discover how to replace reliance on fleeting motivation with robust, daily habits.",
    category: "Lifestyle",
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: "Focus on the identity: tell yourself 'I am someone who workouts' rather than 'I need to go to the gym'.",
    takeaways: [
      "Motivation is temporary; habits and discipline are permanent.",
      "Start small: a 10-minute workout is infinitely better than doing nothing.",
      "Track your consistency, not just your weight or body shapes."
    ],
    content: `
      <h2>Introduction</h2>
      <p>Most fitness journeys end not due to poor programs, but due to a loss of motivation. Motivation is a feeling, and feelings change. Building long-term fitness requires a shift in mindset and habit loops.</p>
      
      <h2>1. Motivation vs. Discipline</h2>
      <p>Motivation gets you started, but discipline gets you through the cold winter mornings when you don't feel like training. Focus on showing up, even if it is for a short workout.</p>

      <h2>Conclusion</h2>
      <p>Build habits that fit your schedule, track your progress, and be patient with yourself.</p>
    `
  }
};

const getFallbackData = (filename, categoryName) => {
  let name = filename.replace(/\.[^/.]+$/, ""); // strip extension
  name = name.replace(/^(pexels-|gym-|coach-|bench_press-|deadlift-|squats-|running-|healthy_food-|protein_shake-|stretching-|recovery-)/, "");
  name = name.replace(/-?\d+/g, ""); // strip digits
  name = name.replace(/[_-]/g, " ").trim(); // replace dashes with spaces
  
  let formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  if (!formattedName) formattedName = `${categoryName} Essentials`;

  const title = `Optimizing Your ${formattedName} for Maximum Results`;
  const description = `A deep dive into essential tips, expert recommendations, and habits regarding ${categoryName.toLowerCase()} and overall fitness.`;
  const content = `
    <h2>Introduction</h2>
    <p>Living a healthy life requires focusing on multiple aspects of daily performance. Inside this ${categoryName.toLowerCase()}-focused guide, we look at keys to building consistent habits.</p>
    
    <h2>1. Core Principles of Progression</h2>
    <p>Consistency, structured plans, and quality recovery are the base foundation for any athlete or beginner. Keep your workouts simple, eat whole food sources, and monitor how your body feels.</p>

    <h2>2. Staying Safe and injury-free</h2>
    <p>Form and mobility are crucial. Avoid overloading weight early on and dedicate enough time to stretching and dynamic movement warm-ups.</p>

    <h2>Conclusion</h2>
    <p>Focus on slow, progressive adaptations. True transformation is built step-by-step over several months.</p>
  `;

  return {
    title,
    description,
    category: categoryName,
    author: "Hamza Mansuri",
    readTime: "5 min read",
    expertTip: `Prioritize consistency over intensity in your ${categoryName.toLowerCase()} routine.`,
    takeaways: [
      `Master movements with light weights before trying heavy progression.`,
      `Stay hydrated and drink water consistently.`,
      `Dedicate time to recovery and rest days.`
    ],
    content,
  };
};

const seed = async () => {
  try {
    console.log("🚀 Starting database seeding...");
    await connectDB();

    // Clear old data and collections
    const collections = mongoose.connection.collections;
    if (collections['blogs']) {
      await mongoose.connection.collection('blogs').drop();
      console.log("🧹 Dropped old 'blogs' collection.");
    }
    const targetCollections = ['workouts', 'nutritions', 'recoverys', 'healths', 'lifestyles'];
    for (const collName of targetCollections) {
      if (collections[collName]) {
        await mongoose.connection.collection(collName).drop();
        console.log(`🧹 Dropped collection: ${collName}`);
      }
    }

    // Interleave the files from different categories
    const categoryLists = {};
    for (const [folder, category] of Object.entries(categoryMapping)) {
      const folderPath = path.join(IMAGES_DIR, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        categoryLists[category] = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(filename => ({
          filename,
          folder,
          category,
          filePath: path.join(folderPath, filename)
        }));
      }
    }

    const imageQueue = [];
    let hasMore = true;
    let index = 0;
    const categories = Object.values(categoryMapping);

    while (hasMore) {
      hasMore = false;
      for (const category of categories) {
        const list = categoryLists[category] || [];
        if (index < list.length) {
          imageQueue.push(list[index]);
          hasMore = true;
        }
      }
      index++;
    }

    console.log(`📋 Total images to seed in interleaved queue: ${imageQueue.length}`);

    let queueIndex = 0;
    for (const item of imageQueue) {
      const { filename, folder, category, filePath } = item;
      const data = blogTemplates[filename] || getFallbackData(filename, category);
      const Model = getModelByCategory(category);

      const exists = await Model.findOne({ title: data.title });
      if (exists) {
        console.log(`➡️ Blog already exists in ${category}: "${data.title}" (Skipped)`);
        continue;
      }

      console.log(`[${queueIndex + 1}/${imageQueue.length}] ⏳ Uploading ${filename} to Cloudinary for blog: "${data.title}"...`);
      
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "fitness_blogs",
      });

      // Stagger createdAt date so they sort in precise interleaved order
      const createdAt = new Date(Date.now() - queueIndex * 15 * 60 * 1000); // 15 min intervals

      await Model.create({
        title: data.title,
        description: data.description,
        category: data.category,
        author: data.author,
        readTime: data.readTime,
        expertTip: data.expertTip,
        content: data.content,
        takeaways: data.takeaways,
        image: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        createdAt: createdAt,
        updatedAt: createdAt,
      });

      console.log(`✅ Created blog in ${category} collection: "${data.title}"`);
      queueIndex++;
    }

    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seed();
