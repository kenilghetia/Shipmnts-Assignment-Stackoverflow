const express = require("express");
const userControllers = require("../controllers/userControllers.js");

const router = express.Router();

// Routes for Users
router.post("/create", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.post("/addquestion", userControllers.addMovie);
router.get("/getall", userControllers.getAllQuestions);

router.put("/update/:questionId", userControllers.updateQuestion);
router.delete("/delete/:questionId", userControllers.deleteQuestion);

// Upvote a question
app.put("/questions/:questionId/upvote", userControllers.upvote);

// Downvote a question
app.put("/questions/:questionId/downvote", userControllers.downvote);

// Upvote an answer
app.put("/answers/:answerId/upvote", userControllers.upvote);

// Downvote an answer
app.put("/answers/:answerId/downvote", userControllers.downvote);

// Add a comment to a question
app.post("/questions/:questionId/comments", userControllers.createComment);

// Add a comment to an answer
app.post("/answers/:answerId/comments", userControllers.createAnswer);

// Search questions by keyword
app.get("/questions/search", (req, res) => {
  const keyword = req.query.keyword;
});

// Sort questions by criteria (e.g., most upvoted)
app.get("/questions/sort", (req, res) => {
  const sortBy = req.query.sortBy;
});

module.exports = router;
