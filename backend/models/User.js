const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reqtech: { type: String, required: true },
  description: { type: String },
  paymentid: { type: Number, required: true },
  amount: { type: Number, required: true },
  telegramId: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
