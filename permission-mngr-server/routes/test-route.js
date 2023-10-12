// Route for testing if authentication is enforced

const express = require('express');
const router = express.Router();

const testAuthController = require('../controllers/test-controller');

router.get('/auth-test', testAuthController.testAuth);

module.exports = router;
