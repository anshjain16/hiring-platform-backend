const express = require("express");
const router = express.Router();
const {
  createSubmission,
  updateSubmission,
  getSubmissionById,
  getAllSubmissionsToQuestion,
} = require("../controllers/submission");

router.post("/create", createSubmission);
router.put("/:id", updateSubmission);
router.get("/:id", getSubmissionById);
router.get("/getall/:questionId", getAllSubmissionsToQuestion);

module.exports = router;
