const express = require("express");
const router = express.Router();
const {
  createSubmission,
  updateSubmission,
  getSubmissionById,
} = require("../controllers/submission");

router.post("/create", createSubmission);

router.put("/:id", updateSubmission);

router.get("/:id", getSubmissionById);

module.exports = router;
