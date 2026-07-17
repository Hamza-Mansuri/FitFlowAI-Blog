import jwt from "jsonwebtoken";
import UserFitnessProfile from "../models/UserFitnessProfile.js";
import { getGeminiReply } from "../services/geminiService.js";
import { searchBlogsVector } from "../services/vectorSearchService.js";
import { searchBlogs } from "../services/blogSearchService.js";
import { buildContextFromBlogs } from "../services/contextBuilder.js";
import { buildProfileContext } from "../services/profileContextBuilder.js";
import { generateEmbedding } from "../services/embeddingService.js";

// Helper to decode user ID from auth header safely for personalization details
const getUserIdFromHeader = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (e) {
      console.warn("Could not verify JWT token in AI controller:", e.message);
    }
  }
  return null;
};

export const handleChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message content cannot be empty" });
    }

    // 1. Check if user has a logged-in fitness profile (personalization step)
    const userId = getUserIdFromHeader(req.headers.authorization);
    let profileContext = "";
    
    if (userId) {
      try {
        const profile = await UserFitnessProfile.findOne({ user: userId });
        if (profile) {
          profileContext = buildProfileContext(profile);
        }
      } catch (profileErr) {
        console.error("Failed to load fitness profile for AI context:", profileErr);
      }
    }

    // 2. Search MongoDB for approved, matching articles (RAG Pipeline step)
    let matchedBlogs = [];
    let context = "";
    let usedBlogsMetadata = [];
    let similarityScores = [];
    let isVectorSearchUsed = false;

    try {
      // Try to generate embedding for the user message
      const queryEmbedding = await generateEmbedding(message);

      if (queryEmbedding && queryEmbedding.length > 0) {
        // Try Atlas Vector Search
        matchedBlogs = await searchBlogsVector(queryEmbedding);
        if (matchedBlogs && matchedBlogs.length > 0) {
          isVectorSearchUsed = true;
        }
      }
    } catch (vectorError) {
      console.warn("⚠️ Vector Search pipeline failed, falling back to Keyword Search:", vectorError.message);
    }

    // Fallback to Keyword Search if Vector Search was unsuccessful
    if (!isVectorSearchUsed) {
      try {
        matchedBlogs = await searchBlogs(message);
      } catch (keywordError) {
        console.error("❌ Keyword Search fallback step failed:", keywordError);
      }
    }

    // Compile context and metadata if relevant documents exist
    if (matchedBlogs && matchedBlogs.length > 0) {
      context = buildContextFromBlogs(matchedBlogs);
      usedBlogsMetadata = matchedBlogs.map((b) => ({
        title: b.title,
        id: b._id,
        category: b.category,
      }));
      similarityScores = matchedBlogs.map((b) => b.score || 0);
    }

    // 3. Inject prompt instruction header if context is populated
    let prependedContext = "";
    if (context || profileContext) {
      prependedContext = `${profileContext}\n\n`;
      if (context) {
        prependedContext += `The following information comes from official FitFlowAI articles.
Use this information whenever possible in answering the user's question.
If the articles do not fully answer the question, you may supplement using your own general fitness knowledge.

${context}`;
      }
    }

    try {
      // 4. Generate reply using Gemini
      const geminiReply = await getGeminiReply(message, history, prependedContext);
      if (geminiReply) {
        return res.status(200).json({
          reply: geminiReply,
          usedBlogs: usedBlogsMetadata,
          similarityScores,
        });
      }
    } catch (apiError) {
      console.error("Gemini API call failed, throwing friendly error:", apiError);
      return res.status(500).json({
        reply: "⚠️ Sorry, I'm having trouble thinking right now. Please try again.",
      });
    }

    // Fallback Mock responses if API key is not configured
    const query = message.toLowerCase().trim();
    let reply = "";

    if (query.includes("workout") || query.includes("training") || query.includes("plan")) {
      reply = `**Here is a premium science-backed 3-Day Full Body Workout Split to build strength and consistency:**

### 🏋️ Day 1: Strength Focus
*   **Barbell Squats:** 3 sets x 6-8 reps (2-3 min rest)
*   **Bench Press:** 3 sets x 6-8 reps (2-3 min rest)
*   **Bent-Over Rows:** 3 sets x 8-10 reps (90s rest)
*   **Romanian Deadlifts (RDLs):** 2 sets x 10 reps (90s rest)

### 🏃 Day 2: Hypertrophy & Active Recovery
*   **Leg Press:** 3 sets x 10-12 reps
*   **Overhead Press (OHP):** 3 sets x 8-10 reps
*   **Lat Pulldowns:** 3 sets x 10-12 reps
*   **Incline Dumbbell Flyes:** 2 sets x 12 reps

### 🔥 Day 3: Conditioning & Stability
*   **Deadlifts:** 3 sets x 5 reps (Heavy)
*   **Dips or Push-ups:** 3 sets x max repetitions
*   **Pull-ups:** 3 sets x max repetitions
*   **Plank Holds:** 3 sets x 60 seconds

*Tip: Focus on **progressive overload**—aim to add 2.5 lbs or 1 rep to your lifts each week.*`;
    } else if (query.includes("nutrition") || query.includes("diet") || query.includes("eat") || query.includes("food")) {
      reply = `**Nutrition is the foundation of recovery and output. Here are key evidence-based guidelines:**

1.  **Protein Distribution:** Aim for **0.8 - 1.0 grams of protein per pound of body weight** daily. Divide this into 3-4 meals of 30-40g each to maximize muscle protein synthesis.
2.  **Caloric Adjustments:**
    *   *Muscle Gain:* Surplus of 200 - 300 calories above maintenance.
    *   *Fat Loss:* Deficit of 300 - 500 calories below maintenance.
3.  **Hydration:** Drink **3 to 4 liters of water** daily. Dehydration by even 2% reduces strength output by up to 15%.
4.  **Micronutrients:** Prioritize whole foods—greens, cruciferous vegetables, complex carbs (oats, sweet potato), and healthy fats (avocado, olive oil, almonds).`;
    } else if (query.includes("protein")) {
      reply = `**Understanding Protein Targets & Sources:**

*   **Optimal Intake:** Research shows that **0.7-1g of protein per pound of body weight** is optimal for muscle repair, fat loss satiety, and strength adaptations.
*   **Quality Sources:**
    *   *Animal:* Chicken breast, wild salmon, eggs, greek yogurt, cottage cheese, and grass-fed whey.
    *   *Plant:* Tempeh, tofu, lentils, chickpeas, quinoa, and hemp seeds.
*   **Timing Tip:** Having 20-30g of protein within 2 hours post-workout accelerates recovery, though your total daily protein count is the most critical metric.`;
    } else if (query.includes("fat loss") || query.includes("lose weight") || query.includes("cut")) {
      reply = `**Evidence-Based Protocols for Sustainable Fat Loss:**

*   **Caloric Deficit:** Fat loss requires consuming fewer calories than you expend. Aim for a moderate deficit of **300 to 500 calories** daily. This allows a healthy loss of 0.5 - 1.5 lbs of fat per week.
*   **High Protein Intake:** Protects lean muscle tissue from being burned for fuel.
*   **Resistance Training:** Signal your body to keep muscle mass while drawing energy from fat storage. Aim for 3-4 sessions weekly.
*   **NEAT (Non-Exercise Activity Thermogenesis):** Increase daily movement. Track your steps—aiming for **8,000 to 10,000 steps** daily increases caloric expenditure effortlessly.`;
    } else if (query.includes("muscle") || query.includes("gain") || query.includes("bulk")) {
      reply = `**The Science of Hypertrophy (Muscle Growth):**

To trigger muscle growth, your training and nutrition must satisfy these three rules:

1.  **Mechanical Tension (Progressive Overload):** Lift heavier or perform more volume over time. Train close to failure (1-3 repetitions in reserve).
2.  **Caloric Surplus:** Consume **200 to 300 calories above maintenance** daily. This provides the energy required for synthesizing new muscle fibers.
3.  **Optimal Recovery:** Target **7 to 9 hours of sleep** nightly. Growth hormone peaks during deep sleep cycles.`;
    } else if (query.includes("recovery") || query.includes("sore") || query.includes("sleep")) {
      reply = `**Optimizing Active Recovery & Soreness:**

*   **Active Recovery:** Perform low-intensity workouts (like a 30-minute outdoor walk, light yoga, or swimming) to increase blood flow and flush out cellular metabolic waste.
*   **Sleep Protocol:** Sleep is the ultimate performance enhancer. Aim for **7.5 to 8.5 hours** of quality rest. Keep your bedroom cool (65°F / 18°C) and avoid screens 1 hour before bed.
*   **Hydration & Electrolytes:** Replenish sodium, potassium, and magnesium lost through sweat to prevent muscle cramping and joint fatigue.`;
    } else {
      reply = `👋 **Hello! I'm your FitFlowAI Assistant.**

I can help guide your wellness journey. Ask me about:
*   🏋️ **Workouts** (Strength splits, routines, progressive overload)
*   🥗 **Nutrition** (Macros, protein guidelines, caloric targets)
*   💤 **Recovery** (Sleep protocols, active recovery, soreness)
*   💪 **Fitness Goals** (Muscle gain, fat loss, body recomposition)

*What specific fitness or lifestyle goal are you working on today?*`;
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
