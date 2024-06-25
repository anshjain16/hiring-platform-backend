const { HiringProcess, Registration } = require("../models/schema");

const createRegistration = async (req, res) => {
  try {
    const { token, candidateId } = req.params;

    const hiringProcess = await HiringProcess.findOne({
      registrationLink: token,
    });

    if (!hiringProcess) {
      return res.status(404).json({ message: "Invalid registration link" });
    }

    const existingRegistration = await Registration.findOne({
      candidateId: candidateId,
      hiringProcessId: hiringProcess._id,
    });

    if (existingRegistration) {
      return res
        .status(200)
        .json({ message: "Candidate already registered for this process" });
    }

    const registration = new Registration({
      candidateId: candidateId,
      hiringProcessId: hiringProcess._id,
      status: "registered",
    });

    const savedRegistration = await registration.save();

    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error("Failed to register candidate:", error);
    res.status(500).json({ message: "Failed to register candidate" });
  }
};

module.exports = { createRegistration };
