require("dotenv").config();
require("./db/database").connect();

const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// register
app.post("/register", async (req, res) => {
  const userData = req.body;
  console.log("Received user data:", userData);

  try {
    const encryptedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
      username: userData.username,
      password: encryptedPassword,
      name: userData.name,
      email: userData.email,
    });
    const result = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      insertedId: result._id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

// check user duplicate
app.get("/check-username", async (req, res) => {
  const { username } = req.query;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking username" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user._id, username: user.username, role: user.role },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1m",
          }
        );
        res
          .status(200)
          .json({ message: "Login successful", token: token, role: user.role });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "An error occurred during login in backend" });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

module.exports = app;
