const { HiringProcess } = require("../models/schema.js");
const crypto = require("crypto");

const createHiringProcess = async (req, res) => {
  try {
    const { title, desc, numRounds, startDate, endDate } = req.body;
    const { companyId } = req.params;
    const token = crypto.randomBytes(20).toString("hex");

    // console.log(companyId);
    const newHiringProcess = new HiringProcess({
      title,
      desc,
      numRounds,
      startDate,
      endDate,
      companyId,
      registrationLink: token,
    });

    await newHiringProcess.save();
    res.status(201).json({
      message: "Hiring process created successfully",
      hiringProcess: newHiringProcess,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHiringProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, numRounds, startDate, endDate } = req.body;
    const companyId = req.user.companyId;

    const hiringProcess = await HiringProcess.findById(id);
    if (!hiringProcess) {
      return res.status(404).json({ error: "Hiring process not found" });
    }
    if (hiringProcess.companyId.toString() !== companyId) {
      return res.status(403).json({
        error: "You are not authorized to update this hiring process",
      });
    }
    hiringProcess.title = title;
    hiringProcess.desc = desc;
    hiringProcess.numRounds = numRounds;
    hiringProcess.startDate = startDate;
    hiringProcess.endDate = endDate;

    await hiringProcess.save();
    res.status(200).json(hiringProcess);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHiringProcess = async (req, res) => {
  try {
    const { id, companyId } = req.params;
    const hiringProcess = await HiringProcess.findById(id);
    if (!hiringProcess) {
      throw { message: "Process doesn't exist" };
    }
    if (companyId != hiringProcess.companyId) {
      throw { message: "Unauthorized" };
    }
    res.status(200).json(hiringProcess);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getHiringProcess,
  updateHiringProcess,
  createHiringProcess,
};
