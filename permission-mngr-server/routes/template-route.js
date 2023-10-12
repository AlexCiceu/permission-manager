const express = require("express");
const router = express.Router();

const templateController = require("../controllers/template-controller")

router.get('/all-templates', templateController.retrieveAllTemplates);
router.post('/create-template', templateController.createTemplate);
router.patch('/update-template', templateController.updateTemplate);
router.delete('/delete-template', templateController.deleteTemplate);

module.exports = router;