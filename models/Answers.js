const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ans: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const answerDetails = mongoose.model('answer_details', answerSchema);

module.exports = answerDetails;