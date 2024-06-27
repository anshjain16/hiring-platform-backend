const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/programmingquestion");

router.get("/getall/:codingRoundId", getAllQuestions);
router.get("/get/:id", getQuestionById);
router.post("/create/:codingRoundId", createQuestion);

module.exports = router;
