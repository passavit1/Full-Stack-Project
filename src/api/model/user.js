const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  password: { type: String },
  phone: { type: String },
  token: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
