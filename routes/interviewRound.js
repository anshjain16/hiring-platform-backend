const express = require("express");
const router = express.Router();
const {
    createInterviewRound,
    getInterviewRound,
    updateInterviewRound,
} = require("../controllers/interviewRound");

router.post("/create/:hiringId", createInterviewRound);
router.put("/update/:hiringId/:id", updateInterviewRound);
router.get("/get/:hiringId/:id", getInterviewRound);

module.exports = router;

