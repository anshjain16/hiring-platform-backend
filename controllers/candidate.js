const { Candidate } = require("../models/schema");

const registerCandidate = async (req, res) => {
  const { name, username, password, email, university, address, resumeUrl } =
    req.body;

  try {
    const existingCandidate = await Candidate.findOne({
      $or: [{ username }, { email }],
    });
    if (existingCandidate) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const candidate = new Candidate({
      name,
      username,
      password,
      email,
      university,
      address,
      resumeUrl,
    });

    const savedCandidate = await candidate.save();
    res.status(201).json({ candidate: savedCandidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginCandidate = async (req, res) => {
  const { username, password } = req.body;
  try {
    const candidate = await Candidate.findOne({ username, password });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCandidate = async (req, res) => {
  const { id: candidateId } = req.params;
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      req.body,
      { new: true }
    );
    if (!updatedCandidate) {
      return res
        .status(404)
        .json({ error: `Candidate not found with ID: ${candidateId}` });
    }
    res.status(200).json({ candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidateById = async (req, res) => {
  const { id: candidateId } = req.params;
  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res
        .status(404)
        .json({ error: `Candidate not found with ID: ${candidateId}` });
    }
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCandidate,
  loginCandidate,
  updateCandidate,
  getCandidateById,
};
