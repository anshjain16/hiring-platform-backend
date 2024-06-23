const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/programmingquestion");

router.get("/questions", getAllQuestions);
router.get("/questions/:id", getQuestionById);
router.post("/question", createQuestion);

module.exports = router;
