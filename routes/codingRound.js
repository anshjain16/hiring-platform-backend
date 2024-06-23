const express = require("express");
const router = express.Router();
const {
  createCodingRound,
  getCodingRound,
} = require("../controllers/codingRound");

router.post("/create/:hiringId", createCodingRound);
// router.put("/update/:hiringId/:id", updateCodingRound);
router.get("/:hiringId/:id", getCodingRound);
// router.delete("/:hiringId/:id", deleteCodingRound);

module.exports = router;
