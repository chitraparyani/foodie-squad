const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  userId: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Image", imageSchema);
