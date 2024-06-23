const { CodingRound } = require("../models/schema");

const createCodingRound = async (req, res) => {
  try {
    const { numQuestions, startDate, endDate, hiringProcessId } = req.body;
    const newCodingRound = new CodingRound({
      numQuestions,
      startDate,
      endDate,
      hiringProcessId,
    });
    await newCodingRound.save();
    res.status(201).json({ message: "Coding Round added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCodingRound = async (req, res) => {};

module.exports = { createCodingRound, getCodingRound };
