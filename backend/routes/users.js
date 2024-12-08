const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User"); // Import the User model

const router = express.Router();

// Get all users (requests)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

// Add a new user (request)
router.post("/", async (req, res) => {
  const { name, reqtech, description, paymentid, amount, telegramId } =
    req.body;

  if (!name || !reqtech || !paymentid || !amount || !telegramId) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newUser = new User({
      name,
      reqtech,
      description,
      paymentid,
      amount,
      telegramId,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save user", details: err.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete user", details: err.message });
  }
});

module.exports = router;
