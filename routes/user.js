const express = require("express");
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserByid);
router.delete('/:id', userController.deleteUserById)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUsers)

module.exports = router