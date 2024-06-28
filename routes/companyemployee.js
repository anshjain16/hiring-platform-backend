const express = require("express");
const router = express.Router();
const {
  getEmployeeById,
  getAllEmployees,
  createEmployee,
  updateEmployee,
} = require("../controllers/companyemployee");

router.get("/get/:id", getEmployeeById);
router.get("/getall/company/:companyId", getAllEmployees);
router.post("/create/:companyId", createEmployee);
router.put("/update/:id", updateEmployee);

module.exports = router;
