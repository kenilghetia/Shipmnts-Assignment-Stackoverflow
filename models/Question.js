const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  ques: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer_details",
    }
  ],
});

const questionDetails = mongoose.model("question_details", questionSchema);

module.exports = UserDetails;
