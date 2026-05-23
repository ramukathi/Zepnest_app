const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");


// REGISTER

const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // CHECK USER

    const [existingUsers] =
      await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

    if (existingUsers.length > 0) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // INSERT USER

    const [result] =
      await pool.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

    // TOKEN

    const token = jwt.sign(
      {
        id: result.insertId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: result.insertId,
        name,
        email,
      },
    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};


// LOGIN

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // FIND USER

    const [users] =
      await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

    if (users.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // TOKEN

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

module.exports = {
  register,
  login,
};