const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  knowntech: { type: String, required: true },
  description: { type: String },
  phoneno: { type: String, required: true },
  telegramId: { type: String },
});

const Developer = mongoose.model("Developer", developerSchema);
module.exports = Developer;
