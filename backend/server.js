require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();


// SIMPLE CORS

app.use(cors());


// BODY PARSER

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);


// TEST ROUTE

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Backend Working 🚀",
  });

});


// SERVER

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});