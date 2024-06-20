const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController')
router.post('/register', companyController.registerCompany);
router.post('/login', companyController.loginCompany);
router.put('/company/:id', companyController.updateCompany);
router.get('/company/:id', companyController.getCompanyById);
router.get('/companies/search', companyController.searchCompaniesByName);

module.exports = router;