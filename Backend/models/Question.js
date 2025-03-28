const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String, // Full question text
  blanks: [Number], // Indices where blanks exist
  correctAnswers: [String], // Correct words for each blank
  options: [String], // List of words (correct + extra choices)
  createdAt: { type: Date, default: Date.now } // For sorting
});

module.exports = mongoose.model("Question", questionSchema);
