const { ProgrammingQuestion, CodingRound } = require("../models/schema");

const createQuestion = async (req, res) => {
  try {
    const codingRoundId = req.params.codingRoundId;
    const newQuestion = new ProgrammingQuestion({
      ...req.body,
      codingRoundId,
    });
    const savedQuestion = await newQuestion.save();

    await CodingRound.findByIdAndUpdate(codingRoundId, {
      $push: { questions: savedQuestion._id },
    });

    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const codingRoundId = req.params.codingRoundId;
    const questions = await ProgrammingQuestion.find({ codingRoundId });

    if (!questions) {
      return res
        .status(404)
        .json({ message: "Questions not found for this coding round" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await ProgrammingQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updating a question
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await ProgrammingQuestion.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deleting a question
const deleteQuestion = async (req, res) => {
  try {
    const { id, codingRoundId } = req.params;
    const deletedQuestion = await ProgrammingQuestion.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Remove the question from the coding round
    await CodingRound.findByIdAndUpdate(codingRoundId, {
      $pull: { questions: id },
    });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
