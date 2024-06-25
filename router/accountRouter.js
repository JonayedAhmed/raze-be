// external imports
const express = require('express');

// internal imports
const accountController = require('../controllers/accountController');

const router = express.Router()

// user login
router.post("/login", accountController.userLogin);

module.exports = router;