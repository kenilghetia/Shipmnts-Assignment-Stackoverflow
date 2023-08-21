const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    qId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'question_details'
    },
    ans: {
        type: String,
        required: true
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment_details'
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    votes: {
        type: Number,
        default: 0
    }
});

const answerDetails = mongoose.model('answer_details', answerSchema);

module.exports = answerDetails;
