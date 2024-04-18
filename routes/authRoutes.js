// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../utils/middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logout);

module.exports = router;