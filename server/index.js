import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import checkInRoutes from "./routes/checkInRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiCoachRoutes from "./routes/aiCoachRoutes.js";

// dotenv.config();

import "dotenv/config";

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(helmet()); // Secure HTTP headers

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin))
        return callback(null, true);

      console.log("Blocked Origin:", origin);

      return callback(new Error("CORS blocked"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],
  })
);

app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/checkin", checkInRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai-coach", aiCoachRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Fitness Blog API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});