const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer_details",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment_details",
    },
  ],
  votes: {
    type: Number,
    default: 0,
  },
});

const questionDetails = mongoose.model("question_details", questionSchema);

module.exports = questionDetails;
