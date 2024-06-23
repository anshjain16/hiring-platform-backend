const express = require("express");
const router = express.Router();
const {
  createCodingRound,
  getCodingRound,
  deleteCodingRound,
  updateCodingRound,
} = require("../controllers/codingRound");

router.post("/create/:hiringId", createCodingRound);
router.put("/update/:hiringId/:id", updateCodingRound);
router.get("/get/:hiringId/:id", getCodingRound);
router.delete("/delete/:hiringId/:id", deleteCodingRound);

module.exports = router;
