const { Submission } = require("../models/schema");

const createSubmission = async (req, res) => {
  const {
    userId,
    questionId,
    code,
    language,
    result,
    testCasesPassed,
    totalTestCases,
    score,
  } = req.body;
  try {
    const submission = await Submission.find({ userId, questionId });
    // console.log(submission);
    if (submission[0]) {
      const updatedSubmission = await Submission.findByIdAndUpdate(
        submission[0].id,
        {
          code,
          language,
          result,
          testCasesPassed,
          totalTestCases,
          score,
        },
        { new: true }
      );

      res.status(200).json(updatedSubmission);
    } else {
      const newSubmission = new Submission({
        userId,
        questionId,
        code,
        language,
        result,
        testCasesPassed,
        totalTestCases,
        score,
      });

      const savedSubmission = await newSubmission.save();
      // console.log(savedSubmission);
      res.status(201).json(savedSubmission);
    }
  } catch (error) {
    console.error("Failed to create submission:", error);
    res.status(500).json({ message: "Failed to create submission" });
  }
};

const updateSubmission = async (req, res) => {
  const { id } = req.params;
  const { code, language, result, testCasesPassed, totalTestCases, score } =
    req.body;

  try {
    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      {
        code,
        language,
        result,
        testCasesPassed,
        totalTestCases,
        score,
      },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(updatedSubmission);
  } catch (error) {
    console.error("Failed to update submission:", error);
    res.status(500).json({ message: "Failed to update submission" });
  }
};

const getSubmissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error("Failed to get submission:", error);
    res.status(500).json({ message: "Failed to get submission" });
  }
};

const getAllSubmissionsToQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const submissions = await Submission.find({ questionId });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createSubmission,
  updateSubmission,
  getSubmissionById,
  getAllSubmissionsToQuestion,
};
