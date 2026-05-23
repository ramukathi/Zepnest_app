require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();


// ✅ SIMPLE CORS FIX

app.use(cors());


// ✅ MIDDLEWARE

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ✅ ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);


// ✅ HOME ROUTE

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Zepnest Backend Running 🚀",
  });

});


// ✅ 404

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});


// ✅ ERROR HANDLER

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });

});


// ✅ SERVER

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});