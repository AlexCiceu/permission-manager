// Authentication routes

const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company-controller');

router.post('/retrieve-company-info', companyController.retrieveCompanyInfo);

module.exports = router;
