const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);