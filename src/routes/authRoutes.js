const express = require('express');
const { signup, login, logoff } = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");
const { validateSignup } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.get('/logoff', authMiddleware, logoff);

module.exports = router;