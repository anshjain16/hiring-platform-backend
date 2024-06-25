const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/programmingquestion");

router.get("/getall/:codingRoundId", getAllQuestions);
router.get("/questions/:id", getQuestionById);
router.post("/create/:codingRoundId", createQuestion);

module.exports = router;
