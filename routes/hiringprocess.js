const express = require("express");
const router = express.Router();
const {
  updateHiringProcessByCompany,
  createHiringProcess,
  addCodingRound,
  updateInterviewRound,
  updateCodingRound,
} = require("../controllers/hiringprocess");
const authenticateCompany = require("../middleware/companyauthentication");

router.put(
  "/hiring-processes/:id",
  authenticateCompany,
  updateHiringProcessByCompany
);
router.put("/hiring-process/:id", updateHiringProcessByCompany);
router.post("/hiring-process", createHiringProcess);
router.post("/coding-rounds", addCodingRound);
router.put("/coding-rounds/:id", updateCodingRound);
router.put("/interview-rounds/:id", updateInterviewRound);

module.exports = router;
