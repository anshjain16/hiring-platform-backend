const jwt = require("jsonwebtoken");
const { Company } = require("../models/schema");

const authenticateCompany = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!company) {
      throw new Error();
    }
    req.company = company;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authenticateCompany;
