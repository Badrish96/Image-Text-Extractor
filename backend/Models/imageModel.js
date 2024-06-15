const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  text: { type: String, required: true },
  boldWords: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Image", ImageSchema);
