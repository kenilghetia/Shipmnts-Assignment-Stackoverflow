const express = require("express");
const userControllers = require("../controllers/userControllers.js");
const JWTVerification = require('../middlewares/jwtAuth.js');
const router = express.Router();

// Routes for Users
router.post("/create", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.post("/addquestion", JWTVerification, userControllers.addMovie);
router.get("/getall", JWTVerification,userControllers.getAllQuestions);

router.put("/update/:questionId", JWTVerification, userControllers.updateQuestion);
router.delete("/delete/:questionId", JWTVerification, userControllers.deleteQuestion);

// Upvote a question
app.put("/questions/:questionId/upvote", JWTVerification, userControllers.upvote);

// Downvote a question
app.put("/questions/:questionId/downvote", JWTVerification, userControllers.downvote);

// Upvote an answer
app.put("/answers/:answerId/upvote", JWTVerification, userControllers.upvote);

// Downvote an answer
app.put("/answers/:answerId/downvote", JWTVerification, userControllers.downvote);

// Add a comment to a question
app.post("/questions/:questionId/comments", JWTVerification, userControllers.createComment);

// Add a comment to an answer
app.post("/answers/:answerId/comments", JWTVerification, userControllers.createAnswer);

// Search questions by keyword
app.get("/questions/search", JWTVerification, (req, res) => {
  const keyword = req.query.keyword;
});

// Sort questions by criteria (e.g., most upvoted)
app.get("/questions/sort", JWTVerification, (req, res) => {
  const sortBy = req.query.sortBy;
});

module.exports = router;
