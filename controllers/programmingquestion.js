const ProgrammingQuestion = require('../models/ProgrammingQuestion');


exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = new ProgrammingQuestion(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
    try {
      const questions = await ProgrammingQuestion.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getQuestionById = async (req, res) => {
    try {
      const question = await ProgrammingQuestion.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById ,
  };
  