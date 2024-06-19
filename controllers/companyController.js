const { Company } = require("../models/schema");
exports.registerCompany = async (req, res) => {
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

exports.loginCompany = async (req, res) => {
  try {
    const { username, password } = req.body;
    const company = await Company.findOne({ username });

    if (!company || company.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
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
