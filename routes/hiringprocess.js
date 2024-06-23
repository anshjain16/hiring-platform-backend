const express = require("express");
const router = express.Router();
const {
  updateHiringProcess,
  createHiringProcess,
  getHiringProcess,
} = require("../controllers/hiringprocess");

router.post("/create/:companyId", createHiringProcess);
router.put("/update/:companyId/:id", updateHiringProcess);
router.get("/get/:companyId/:id", getHiringProcess);

module.exports = router;
