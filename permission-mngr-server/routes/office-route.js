const express = require('express');
const router = express.Router();

const officeController = require('../controllers/office-controller');

router.get('/all-offices', officeController.retrieveAllOffices);
router.get('/current-office', officeController.retrieveCurrentOffice);
router.post('/create-office', officeController.createOffice);
router.patch('/update-office', officeController.updateOffice);
router.delete('/delete-office', officeController.deleteOffice);

module.exports = router;
