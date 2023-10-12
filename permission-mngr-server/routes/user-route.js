const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller")

router.get('/all-users', userController.retrieveAllUsers);
router.post('/create-user', userController.createUser);
router.patch('/update-user', userController.updateUser);
router.delete('/delete-user', userController.deleteUser);

module.exports = router;