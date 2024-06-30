const { Result } = require("../models/schema");
const mongoose = require("mongoose");
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching results" });
  }
};

const getResultById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid result ID" });
  }

  try {
    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching result" });
  }
};
const createResult = async (req, res) => {
  const { candidateId, roundId, roundType, score, feedback, status } = req.body;

  try {
    if (!mongoose.isValidObjectId(candidateId)) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }
    if (!mongoose.isValidObjectId(roundId)) {
      return res.status(400).json({ message: "Invalid round ID" });
    }
    if (!["coding", "interview"].includes(roundType)) {
      return res.status(400).json({ message: "Invalid round type" });
    }

    const result = await Result.findOne({ candidateId, roundId });
    if (result) {
      res.status(201).json(result);
    } else {
      const newResult = new Result({
        candidateId,
        roundId,
        roundType,
        score,
        feedback,
        status,
      });

      const savedResult = await newResult.save();
      res.status(201).json(savedResult);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating result" });
  }
};

module.exports = {
  getResultById,
  getAllResults,
  createResult,
};
