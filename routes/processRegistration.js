const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getRegistrationsForProcess,
  addInterviewSlot,
} = require("../controllers/processRegistration");

router.post("/:token/:candidateId", createRegistration);
router.get("/get/:processId", getRegistrationsForProcess);
router.put("/addslot/:candidateId/:hiringProcessId", addInterviewSlot);

module.exports = router;
