require("dotenv").config();
require("./db/database").connect();

const express = require("express");
const User = require("./model/user");
const Product = require("./model/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// user
const app = express();
// product
const prod = express.Router();

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
  const { email } = req.query;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "An error occurred while checking email" });
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
            expiresIn: "1h",
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

// Fetch data for admin account
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// Api edit user for admin
app.put("/updateUser/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating user" });
  }
});

// create Product
prod.post("/create", async (req, res) => {
  const { name, price, image } = req.body;

  try {
    const newProduct = new Product({ name, price, image }); // Use the Product model
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
});

// Fetch All product
prod.get("/list", async (req, res) => {
  try {
    const productList = await Product.find(); // Use the Product model to find all products
    res.status(200).json(productList);
  } catch (error) {
    console.error("Error fetching product list:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product list" });
  }
});

// Edit Product
prod.put("/edit/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: { name, price, image } },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "An error occurred while updating product" });
  }
});

app.use("/product", prod);

module.exports = app;
