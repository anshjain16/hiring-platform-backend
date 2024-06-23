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
router.put("/update/:id", updateCompany);
router.get("/get/:id", getCompanyById);
router.get("/search", searchCompaniesByName);

module.exports = router;
