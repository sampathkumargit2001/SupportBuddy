const express = require("express");
const Developer = require("../models/Developer"); // Import the developer model

const router = express.Router();

// Get all developers
router.get("/", async (req, res) => {
  try {
    const developers = await Developer.find();
    res.status(200).json(developers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new developer
router.post("/", async (req, res) => {
  const { name, knowntech, description, phoneno, telegramId } = req.body;

  try {
    const newDeveloper = new Developer({
      name,
      knowntech,
      description,
      phoneno,
      telegramId,
    });
    const savedDeveloper = await newDeveloper.save();
    res.status(201).json(savedDeveloper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a developer by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL

  try {
    // Find and delete the developer by their ID
    const deletedDeveloper = await Developer.findByIdAndDelete(id);

    // If no developer was found, return a 404 error
    if (!deletedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Developer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
