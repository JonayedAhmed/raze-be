// external imports
const express = require('express');

// internal imports
const accountController = require('../controllers/accountController');
const { verifyToken, isAdmin } = require('../middlewares/auth/authMiddleware');

const router = express.Router()

// user login
router.post("/login", accountController.userLogin);

// register user
router.post("/register", accountController.registerUser);

// update user
router.put("/:id/update", verifyToken, accountController.updateUser);

// fetch user data
router.get("/:id", verifyToken, accountController.getUser);

// fetch all user data
router.get("/users/all", verifyToken, isAdmin, accountController.getAllUser);

module.exports = router;