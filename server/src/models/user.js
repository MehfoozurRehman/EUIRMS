const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  address: String,
  city: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
