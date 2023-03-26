const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema({
  user: String,
  pin: Array,
});

const Verify = mongoose.model("Verify", verifySchema);

module.exports = Verify;
