// external imports
const express = require('express');

// internal imports
const accountController = require('../controllers/accountController');

const router = express.Router()

// user login
router.post("/login", accountController.userLogin);

// register user
router.post("/register", accountController.registerUser);

// update user
router.put("/:id/update", accountController.updateUser);

// fetch user data
router.get("/:id", accountController.getUser);

module.exports = router;