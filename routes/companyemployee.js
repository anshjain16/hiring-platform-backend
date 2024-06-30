const express = require("express");
const router = express.Router();
const {
  getEmployeeById,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  loginEmployee,
} = require("../controllers/companyemployee");

router.get("/get/:id", getEmployeeById);
router.get("/getall/company/:companyId", getAllEmployees);
router.post("/create/:companyId", createEmployee);
router.put("/update/:id", updateEmployee);
router.post("/login", loginEmployee);

module.exports = router;
