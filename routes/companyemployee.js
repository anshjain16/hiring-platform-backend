const express = require('express');
const router = express.Router();
const {
    getEmployeeById,
    getAllEmployees,
    createEmployee,
    updateEmployee
} = require("../controllers/companyemployee");

router.get('/:id',getEmployeeById);
router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.put('/:id',updateEmployee);

module.exports = router;