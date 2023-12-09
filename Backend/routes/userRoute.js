// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // Use the middleware for logout
router.post('/refresh-token', authenticateToken,authController.generateAccessToken); // Use the middleware for logout

module.exports = router;
