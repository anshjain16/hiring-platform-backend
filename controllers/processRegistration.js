const {
  HiringProcess,
  Registration,
  InterviewSlot,
} = require("../models/schema");

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
        .json({
          hiringId: hiringProcess._id,
          companyId: hiringProcess.companyId,
        });
    }

    const registration = new Registration({
      candidateId: candidateId,
      hiringProcessId: hiringProcess._id,
      status: "registered",
    });

    const savedRegistration = await registration.save();

    res
      .status(201)
      .json({
        hiringId: hiringProcess._id,
        companyId: hiringProcess.companyId,
      });
  } catch (error) {
    console.error("Failed to register candidate:", error);
    res.status(500).json({ message: "Failed to register candidate" });
  }
};

const getRegistrationsForProcess = async (req, res) => {
  try {
    const { processId } = req.params;
    const registrations = await Registration.find({
      hiringProcessId: processId,
    })
      .populate("candidateId")
      .exec();

    const candidates = registrations.map(
      (registration) => registration.candidateId
    );

    const listRegistrations = await Registration.find({
      hiringProcessId: processId,
    });

    res.status(200).json({ candidates, listRegistrations });
  } catch (error) {
    console.error("Failed to fetch registrations for process:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch registrations for process" });
  }
};

const addInterviewSlot = async (req, res) => {
  const { candidateId, hiringProcessId } = req.params;
  const { interviewerId, date, interviewId } = req.body;
  // const interviewId = id;
  try {
    const registration = await Registration.findOne({
      candidateId,
      hiringProcessId,
    });

    registration.interviewSlots.push({
      interviewerId,
      date,
      interviewId,
    });

    await registration.save();

    res.json({ message: "Interview slot added successfully", registration });
  } catch (error) {
    // console.error("Failed to add interview slot:", error);
    res.status(500).json({ error: "Failed to add interview slot" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { candidateId, hiringId, status } = req.body;
    const registration = await Registration.findOneAndUpdate(
      { candidateId, hiringProcessId: hiringId },
      { status: status == "Failed" ? "failed" : "passed" }
    );

    res.status(200).json("updated successfuly");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createRegistration,
  getRegistrationsForProcess,
  addInterviewSlot,
  updateStatus,
};
