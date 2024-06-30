const { CompanyEmployee } = require("../models/schema");
const jwt = require("jsonwebtoken");

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
  const { name, position, email, companyId, password } = req.body;
  const newEmployee = new CompanyEmployee({
    name,
    position,
    password,
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

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await CompanyEmployee.findOne({ email });

    if (!employee) {
      throw "not found";
    }

    if (employee.password != password) {
      throw "invalid credentials";
    }

    const token = jwt.sign(
      {
        username: employee.email,
        id: employee._id,
        type: "employee",
      },
      "karina"
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
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
  loginEmployee,
};
