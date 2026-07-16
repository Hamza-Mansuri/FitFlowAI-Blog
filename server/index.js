import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import blogRoutes from "./routes/blogRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

// dotenv.config();

import "dotenv/config";

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(helmet()); // Secure HTTP headers

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fit-flow-ai-blog.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Fitness Blog API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});