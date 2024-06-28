const { CompanyEmployee } = require("../models/schema");
const getEmployeeById = async (req, res) => {
  try {
    const employee = await CompanyEmployee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const { companyId } = req.params;
    const employees = await CompanyEmployee.find({ companyId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const { name, position, email, companyId } = req.body;
  const newEmployee = new CompanyEmployee({
    name,
    position,
    email,
    companyId,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await CompanyEmployee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateEmployee,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
};
