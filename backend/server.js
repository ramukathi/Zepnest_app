// backend/server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

// Create Express app
const app = express();

// ── Middleware ──

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://zepnestapp-production.up.railway.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// URL encoded parser
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ──

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

// ── Home Route ──

app.get("/", (req, res) => {
  res.json({
    message: "🏠 Zepnest API is running!",
    version: "1.0.0",
    status: "OK",
  });
});

// ── 404 Route ──

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ── Global Error Handler ──

app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// ── Start Server ──

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});