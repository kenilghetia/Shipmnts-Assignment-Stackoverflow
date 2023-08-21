const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  qId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "question_details"
  },
  comment: {
    type: String,
    required: true
  },
});

const commentDetails = mongoose.model("comment_details", commentSchema);

module.exports = commentDetails;
