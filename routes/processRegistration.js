const express = require("express");
const router = express.Router();
const { createRegistration } = require("../controllers/processRegistration");

router.post("/:token/:candidateId", createRegistration);

module.exports = router;
