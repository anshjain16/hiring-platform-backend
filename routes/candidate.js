const express = require("express");
const router = express.Router();
const {
  registerCandidate,
  loginCandidate,
  updateCandidate,
  getCandidateById,
} = require("../controllers/candidate");

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.put("/update/:id", updateCandidate);
router.get("/get/:id", getCandidateById);

module.exports = router;
