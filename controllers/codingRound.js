const { CodingRound, HiringProcess } = require("../models/schema");

const createCodingRound = async (req, res) => {
  try {
    const { numQuestions, date, startTime, endTime, hiringProcessId } =
      req.body;
    const hiringProcess = HiringProcess.findById(hiringProcessId);
    const newCodingRound = new CodingRound({
      numQuestions,
      date,
      startTime,
      endTime,
      hiringProcessId,
    });
    await newCodingRound.save();

    await HiringProcess.findByIdAndUpdate(
      hiringProcessId,
      { $push: { codingRounds: newCodingRound._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json({ message: "Coding Round added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const codingRound = await CodingRound.findById(id);
    if (!codingRound) {
      return res.status(404).json({ message: "Coding Round not found" });
    }
    if (hiringId != codingRound.hiringProcessId.toString()) {
      throw { message: "Unauthorized access" };
    }
    res.status(200).json(codingRound);
  } catch (error) {
    console.error("Error in getCodingRound:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const codingRound = await CodingRound.findById(id);
    if (!codingRound) {
      return res.status(404).json({ message: "Coding Round not found" });
    }
    if (hiringId != codingRound.hiringProcessId.toString()) {
      throw { message: "Unauthorized access" };
    }
    await codingRound.deleteOne();
    res.status(200).json({ message: "Coding Round deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCodingRound:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const { numQuestions, date, startTime, endTime } = req.body;
    const codingRound = await CodingRound.findById(id);
    if (!codingRound) {
      return res.status(404).json({ message: "Coding Round not found" });
    }
    if (hiringId != codingRound.hiringProcessId.toString()) {
      throw { message: "Unauthorized access" };
    }

    codingRound.numQuestions = numQuestions;
    codingRound.date = date;
    codingRound.startTime = startTime;
    codingRound.endTime = endTime;

    await codingRound.save();
    res.status(200).json({ message: "Coding Round updated successfully" });
  } catch (error) {
    console.error("Error in updateCodingRound:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCodingRound,
  getCodingRound,
  deleteCodingRound,
  updateCodingRound,
};
