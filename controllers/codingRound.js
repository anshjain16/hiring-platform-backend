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

const getCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const codingRound = await CodingRound.findById(id);
    if (hiringId != codingRound.hiringProcessId) {
      throw { message: "unauthorized" };
    }
    res.status(200).json(codingRound);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const codingRound = await CodingRound.findById(id);
    if (hiringId != codingRound.hiringProcessId) {
      throw { message: "unauthorized" };
    }
    await codingRound.deleteOne();
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCodingRound = async (req, res) => {
  try {
    const { id, hiringId } = req.params;
    const data = req.body;
    const codingRound = await CodingRound.findById(id);
    if (hiringId != codingRound.hiringProcessId) {
      throw { message: "unauthorized" };
    }

    await codingRound.updateOne(data);

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCodingRound,
  getCodingRound,
  deleteCodingRound,
  updateCodingRound,
};
