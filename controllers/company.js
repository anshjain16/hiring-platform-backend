const { Company } = require("../models/schema");
const jwt = require("jsonwebtoken");

const registerCompany = async (req, res) => {
  try {
    const { name, desc, username, password, logoUrl, location } = req.body;

    const existingCompany = await Company.findOne({ username });
    if (existingCompany) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newCompany = new Company({
      name,
      desc,
      username,
      password,
      logoUrl,
      location,
    });
    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginCompany = async (req, res) => {
  try {
    const { username, password } = req.body;
    const company = await Company.findOne({ username });

    if (!company || company.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        username: company.username,
        id: company.id,
        type: "company",
      },
      "karina"
    );

    res.status(200).json({ message: "Login successful", access_token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, logoUrl, location } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { name, desc, logoUrl, location },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchCompaniesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const companies = await Company.find({
      name: { $regex: name, $options: "i" },
    });

    if (companies.length === 0) {
      return res.status(404).json({ error: "No companies found" });
    }

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCompany,
  loginCompany,
  updateCompany,
  getCompanyById,
  searchCompaniesByName,
};
