const express = require("express");
const router = express.Router();
const {
  registerCompany,
  loginCompany,
  updateCompany,
  getCompanyById,
  searchCompaniesByName,
} = require("../controllers/company");

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.put("/company/:id", updateCompany);
router.get("/company/:id", getCompanyById);
router.get("/companies/search", searchCompaniesByName);

module.exports = router;
