require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

// Create app
const app = express();


// ─────────────────────────────────────
// CORS CONFIGURATION
// ─────────────────────────────────────

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://zepnest-app.vercel.app",
  "https://www.zepnest-app.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// ─────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ─────────────────────────────────────
// ROUTES
// ─────────────────────────────────────

app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);


// ─────────────────────────────────────
// HOME ROUTE
// ─────────────────────────────────────

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏠 Zepnest API is running!",
    version: "1.0.0",
  });
});


// ─────────────────────────────────────
// 404 HANDLER
// ─────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// ─────────────────────────────────────
// GLOBAL ERROR HANDLER
// ─────────────────────────────────────

app.use((err, req, res, next) => {

  console.error("❌ Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


// ─────────────────────────────────────
// START SERVER
// ─────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});