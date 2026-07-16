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

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development, server-to-server, or custom domains configured via environment
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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